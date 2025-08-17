<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Registration;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }

    /**
     * Display a listing of invoices with filtering and pagination
     */
    public function index(Request $request): JsonResponse
    {
        Log::info('InvoiceController@index', $request->all());
        
        try {
            $query = Invoice::with(['registration', 'emailLogs']);

            // Apply filters
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            if ($request->has('search') && $request->search !== '') {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('customer_name', 'like', "%{$search}%")
                      ->orWhere('customer_email', 'like', "%{$search}%")
                      ->orWhere('invoice_number', 'like', "%{$search}%");
                });
            }

            if ($request->has('date_from') && $request->date_from !== '') {
                $query->whereDate('billing_date', '>=', $request->date_from);
            }

            if ($request->has('date_to') && $request->date_to !== '') {
                $query->whereDate('billing_date', '<=', $request->date_to);
            }

            if ($request->has('service_type') && $request->service_type !== '') {
                $query->where('service_type', $request->service_type);
            }

            if ($request->has('overdue') && $request->overdue === 'true') {
                $query->overdue();
            }

            // Sorting
            $sortField = $request->get('sort_field', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');
            $query->orderBy($sortField, $sortDirection);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $invoices = $query->paginate($perPage);

            Log::info($invoices);
            return response()->json([
                'success' => true,
                'data' => $invoices
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created invoice
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'amount' => 'required|numeric|min:0',
            'billing_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:billing_date',
            'notes' => 'nullable|string|max:1000',
            'is_recurring' => 'boolean'
        ]);

        try {
            $registration = Registration::findOrFail($request->registration_id);

            $invoice = Invoice::create([
                'registration_id' => $registration->id,
                'customer_name' => $registration->full_name,
                'customer_email' => $registration->email,
                'customer_phone' => $registration->phone,
                'customer_address' => $registration->address,
                'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                'service_type' => $registration->service_type,
                'package' => $registration->package,
                'amount' => $request->amount,
                'payment_period' => $registration->payment_period,
                'billing_date' => $request->billing_date,
                'due_date' => $request->due_date,
                'status' => 'pending',
                'notes' => $request->notes,
                'is_recurring' => $request->get('is_recurring', true),
                'next_billing_date' => $request->get('is_recurring', true) 
                    ? $this->calculateNextBillingDate($request->billing_date, $registration->payment_period)
                    : null
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'data' => $invoice->load('registration')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create invoice: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified invoice
     */
    public function show(Invoice $invoice): JsonResponse
    {
        try {
            $invoice->load(['registration', 'emailLogs']);

            return response()->json([
                'success' => true,
                'data' => $invoice
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found'
            ], 404);
        }
    }

    /**
     * Update the specified invoice
     */
    public function update(Request $request, Invoice $invoice): JsonResponse
    {
        $request->validate([
            'amount' => 'sometimes|numeric|min:0',
            'billing_date' => 'sometimes|date',
            'due_date' => 'sometimes|date',
            'status' => ['sometimes', Rule::in(['pending', 'sent', 'paid', 'overdue', 'cancelled'])],
            'notes' => 'nullable|string|max:1000',
            'is_recurring' => 'sometimes|boolean'
        ]);

        try {
            $invoice->update($request->only([
                'amount', 'billing_date', 'due_date', 'status', 'notes', 'is_recurring'
            ]));

            // Update next billing date if recurring status changed
            if ($request->has('is_recurring')) {
                $invoice->next_billing_date = $request->is_recurring 
                    ? $this->calculateNextBillingDate($invoice->billing_date, $invoice->payment_period)
                    : null;
                $invoice->save();
            }

            // Update timestamps based on status
            if ($request->has('status')) {
                if ($request->status === 'sent' && !$invoice->sent_at) {
                    $invoice->sent_at = now();
                } elseif ($request->status === 'paid' && !$invoice->paid_at) {
                    $invoice->paid_at = now();
                }
                $invoice->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Invoice updated successfully',
                'data' => $invoice->load('registration')
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update invoice: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send invoice manually
     */
    public function sendInvoice(Request $request, Invoice $invoice): JsonResponse
    {
        try {
            $sent = $this->invoiceService->sendInvoice($invoice, true);

            if ($sent) {
                return response()->json([
                    'success' => true,
                    'message' => 'Invoice sent successfully'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to send invoice'
                ], 500);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invoice: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send multiple invoices
     */
    public function sendBulkInvoices(Request $request): JsonResponse
    {
        $request->validate([
            'invoice_ids' => 'required|array',
            'invoice_ids.*' => 'exists:invoices,id'
        ]);

        try {
            $sent = 0;
            $failed = 0;

            foreach ($request->invoice_ids as $invoiceId) {
                $invoice = Invoice::find($invoiceId);
                if ($invoice && $this->invoiceService->sendInvoice($invoice, true)) {
                    $sent++;
                } else {
                    $failed++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Invoices processed: {$sent} sent, {$failed} failed",
                'sent' => $sent,
                'failed' => $failed
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send bulk invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate recurring invoices manually
     */
    public function generateRecurring(): JsonResponse
    {
        try {
            $generated = $this->invoiceService->generateRecurringInvoices();

            return response()->json([
                'success' => true,
                'message' => "Generated {$generated} recurring invoices",
                'generated' => $generated
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate recurring invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send automatic invoices (for scheduled task)
     */
    public function sendAutomatic(): JsonResponse
    {
        try {
            $sent = $this->invoiceService->sendAutomaticInvoices();

            return response()->json([
                'success' => true,
                'message' => "Sent {$sent} automatic invoices",
                'sent' => $sent
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send automatic invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark overdue invoices
     */
    public function markOverdue(): JsonResponse
    {
        try {
            $marked = $this->invoiceService->markOverdueInvoices();

            return response()->json([
                'success' => true,
                'message' => "Marked {$marked} invoices as overdue",
                'marked' => $marked
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark overdue invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get invoice statistics
     */
    public function stats(): JsonResponse
    {
        try {
            $stats = $this->invoiceService->getInvoiceStats();

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get invoice statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete invoice
     */
    public function destroy(Invoice $invoice): JsonResponse
    {
        try {
            $invoice->delete();

            return response()->json([
                'success' => true,
                'message' => 'Invoice deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete invoice: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get registrations for invoice creation
     */
    public function getRegistrations(): JsonResponse
    {
        try {
            $registrations = Registration::where('status', 'processed')
                ->select('id', 'name', 'surname', 'email', 'service_type', 'package')
                ->get()
                ->map(function ($registration) {
                    return [
                        'id' => $registration->id,
                        'name' => $registration->full_name,
                        'email' => $registration->email,
                        'service_type' => $registration->service_type,
                        'package' => $registration->package
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $registrations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get registrations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Calculate next billing date helper
     */
    private function calculateNextBillingDate($currentBillingDate, $paymentPeriod)
    {
        $date = \Carbon\Carbon::parse($currentBillingDate);

        if ($paymentPeriod === '1st of every month') {
            return $date->addMonth()->startOfMonth();
        } elseif ($paymentPeriod === '15th of every month') {
            return $date->addMonth()->day(15);
        }

        return null;
    }
}