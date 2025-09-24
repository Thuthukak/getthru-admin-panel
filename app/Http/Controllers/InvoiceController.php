<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Registration;
use App\Models\PackagePrice;
use App\Models\Customer;
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
     * Display a listing of active invoices
     * Only shows invoices where is_active = 1
     */
    public function index(Request $request): JsonResponse
{
    try {
        // Remove the debug code since relationships work, and add specific query debugging
        $query = Invoice::with(['registration', 'packagePrice', 'customer'])
            ->where('is_active', true)
            ->orderBy('created_at', 'desc');

        Log::info('Base query created successfully');

        // Apply filters one by one with debugging
        if ($request->filled('status')) {
            $query->where('status', $request->status);
            Log::info('Status filter applied: ' . $request->status);
        }

        if ($request->filled('invoice_type')) {
            $query->where('invoice_type', $request->invoice_type);
            Log::info('Invoice type filter applied: ' . $request->invoice_type);
        }

        // Search by customer email using relationship
        if ($request->filled('customer_email')) {
            Log::info('Applying customer email filter: ' . $request->customer_email);
            $query->whereHas('customer', function($q) use ($request) {
                $q->where('email', 'like', '%' . $request->customer_email . '%');
            });
            Log::info('Customer email filter applied successfully');
        }

        // Search by customer name using relationship
        if ($request->filled('customer_name')) {
            Log::info('Applying customer name filter: ' . $request->customer_name);
            $query->whereHas('customer', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->customer_name . '%')
                  ->orWhere('surname', 'like', '%' . $request->customer_name . '%')
                  ->orWhereRaw("CONCAT(name, ' ', surname) LIKE ?", ['%' . $request->customer_name . '%']);
            });
            Log::info('Customer name filter applied successfully');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('billing_date', '>=', $request->date_from);
            Log::info('Date from filter applied: ' . $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('billing_date', '<=', $request->date_to);
            Log::info('Date to filter applied: ' . $request->date_to);
        }

        // Search across multiple fields - this is likely where the error occurs
        if ($request->filled('search')) {
            Log::info('Applying general search filter: ' . $request->search);
            $search = $request->search;
            $query->where(function($q) use ($search) {
                // Search in invoice fields
                $q->where('invoice_number', 'like', "%{$search}%")
                  // Search in customer relationship
                  ->orWhereHas('customer', function($customerQuery) use ($search) {
                      $customerQuery->where('name', 'like', "%{$search}%")
                                  ->orWhere('surname', 'like', "%{$search}%")
                                  ->orWhere('email', 'like', "%{$search}%")
                                  ->orWhere('phone', 'like', "%{$search}%")
                                  ->orWhereRaw("CONCAT(name, ' ', surname) LIKE ?", ["%{$search}%"]);
                  })
                  // Fallback to invoice columns for backward compatibility
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_email', 'like', "%{$search}%")
                  ->orWhere('customer_phone', 'like', "%{$search}%");
            });
            Log::info('General search filter applied successfully');
        }

        Log::info('About to execute paginate query');
        $invoices = $query->paginate($request->get('per_page', 15));
        Log::info('Paginate query executed successfully');

        return response()->json([
            'success' => true,
            'data' => $invoices,
            'message' => 'Active invoices retrieved successfully'
        ]);

    } catch (\Exception $e) {
        Log::error('Failed to retrieve active invoices', [
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
            'trace' => $e->getTraceAsString(),
            'filters' => $request->all()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve invoices'
        ], 500);
    }
}

    /**
     * Get all invoices (including inactive) - for admin purposes
     */
    public function all(Request $request): JsonResponse
    {
        try {
            $query = Invoice::with(['registration', 'packagePrice', 'customer'])
                ->orderBy('created_at', 'desc');

            // Apply same filters as index method
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('invoice_type')) {
                $query->where('invoice_type', $request->invoice_type);
            }

            if ($request->filled('is_active')) {
                $query->where('is_active', $request->is_active === 'true' ? true : false);
            }

            // Search by customer email using relationship
            if ($request->filled('customer_email')) {
                $query->whereHas('customer', function($q) use ($request) {
                    $q->where('email', 'like', '%' . $request->customer_email . '%');
                });
            }

            // Search by customer name using relationship
            if ($request->filled('customer_name')) {
                $query->whereHas('customer', function($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->customer_name . '%')
                      ->orWhere('surname', 'like', '%' . $request->customer_name . '%')
                      ->orWhereRaw("CONCAT(name, ' ', surname) LIKE ?", ['%' . $request->customer_name . '%']);
                });
            }

            if ($request->filled('date_from')) {
                $query->whereDate('billing_date', '>=', $request->date_from);
            }

            if ($request->filled('date_to')) {
                $query->whereDate('billing_date', '<=', $request->date_to);
            }

            // Search across multiple fields including customer relationship
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    // Search in invoice fields
                    $q->where('invoice_number', 'like', "%{$search}%")
                      // Search in customer relationship
                      ->orWhereHas('customer', function($customerQuery) use ($search) {
                          $customerQuery->where('name', 'like', "%{$search}%")
                                      ->orWhere('surname', 'like', "%{$search}%")
                                      ->orWhere('email', 'like', "%{$search}%")
                                      ->orWhere('phone', 'like', "%{$search}%")
                                      ->orWhereRaw("CONCAT(name, ' ', surname) LIKE ?", ["%{$search}%"]);
                      })
                      // Fallback to invoice columns for backward compatibility
                      ->orWhere('customer_name', 'like', "%{$search}%")
                      ->orWhere('customer_email', 'like', "%{$search}%")
                      ->orWhere('customer_phone', 'like', "%{$search}%");
                });
            }

            $invoices = $query->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $invoices,
                'message' => 'All invoices retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve all invoices', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve invoices'
            ], 500);
        }
    }

    /**
     * Get invoices by registration ID
     */
    public function getByRegistration($registrationId): JsonResponse
    {
        try {
            $invoices = Invoice::with(['registration', 'packagePrice', 'customer'])
                ->where('registration_id', $registrationId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $invoices,
                'active_invoices' => $invoices->where('is_active', true)->values(),
                'inactive_invoices' => $invoices->where('is_active', false)->values(),
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve invoices for registration', [
                'registration_id' => $registrationId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve invoices'
            ], 500);
        }
    }

    /**
     * Manually activate a main invoice (admin function)
     */
    public function activate($invoiceId): JsonResponse
    {
        try {
            $invoice = Invoice::findOrFail($invoiceId);
            
            if ($invoice->invoice_type !== 'main') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only main invoices can be manually activated'
                ], 422);
            }

            $invoice->update(['is_active' => true]);

            Log::info('Invoice manually activated', [
                'invoice_id' => $invoiceId,
                'registration_id' => $invoice->registration_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Invoice activated successfully',
                'data' => $invoice->load(['registration', 'packagePrice', 'customer'])
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to activate invoice', [
                'invoice_id' => $invoiceId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to activate invoice'
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
            'package_price_id' => 'nullable|exists:package_prices,id',
            'amount' => 'required|numeric|min:0',
            'billing_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:billing_date',
            'notes' => 'nullable|string|max:1000',
            'is_recurring' => 'boolean'
        ]);

        try {
            $registration = Registration::with(['packagePrice', 'customer'])->findOrFail($request->registration_id);
            
            // Use provided package_price_id or get from registration
            $packagePriceId = $request->package_price_id ?: $registration->package_price_id;
            
            if (!$packagePriceId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Package price information is required'
                ], 422);
            }
            
            $packagePrice = PackagePrice::find($packagePriceId);
            if (!$packagePrice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid package price selected'
                ], 422);
            }

            $invoice = Invoice::create([
                'registration_id' => $registration->id,
                'customer_id' => $registration->customer_id,
                // Keep individual columns for backward compatibility
                'customer_name' => $registration->customer ? 
                    $registration->customer->name . ' ' . $registration->customer->surname : 
                    $registration->full_name,
                'customer_email' => $registration->customer ? 
                    $registration->customer->email : 
                    $registration->email,
                'customer_phone' => $registration->customer ? 
                    $registration->customer->phone : 
                    $registration->phone,
                'customer_address' => $registration->customer ? 
                    $registration->customer->address : 
                    $registration->address,
                'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                'package_price_id' => $packagePriceId,
                'amount' => $request->amount,
                'payment_period' => $registration->payment_period,
                'billing_date' => $request->billing_date,
                'due_date' => $request->due_date,
                'is_active' => true,
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
                'data' => $invoice->load(['registration', 'packagePrice', 'customer'])
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
            $invoice->load(['registration', 'packagePrice', 'customer', 'emailLogs']);

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
            'package_price_id' => 'sometimes|exists:package_prices,id',
            'amount' => 'sometimes|numeric|min:0',
            'billing_date' => 'sometimes|date',
            'due_date' => 'sometimes|date',
            'status' => ['sometimes', Rule::in(['pending', 'sent', 'paid', 'overdue', 'cancelled'])],
            'notes' => 'nullable|string|max:1000',
            'is_recurring' => 'sometimes|boolean'
        ]);

        try {
            $invoice->update($request->only([
                'package_price_id', 'amount', 'billing_date', 'due_date', 'status', 'notes', 'is_recurring'
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
                'data' => $invoice->load(['registration', 'packagePrice', 'customer'])
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
            $registrations = Registration::with(['packagePrice', 'customer'])
                ->where('status', 'processed')
                ->select('id', 'name', 'surname', 'email', 'package_price_id', 'customer_id')
                ->get()
                ->map(function ($registration) {
                    return [
                        'id' => $registration->id,
                        'name' => $registration->customer ? 
                            $registration->customer->name . ' ' . $registration->customer->surname : 
                            $registration->full_name,
                        'email' => $registration->customer ? 
                            $registration->customer->email : 
                            $registration->email,
                        'package_price_id' => $registration->package_price_id,
                        'service_type' => $registration->packagePrice?->service_type,
                        'package' => $registration->packagePrice?->package,
                        'price' => $registration->packagePrice?->price,
                        'customer_id' => $registration->customer_id
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
     * Get available service types from package_prices
     */
    public function getServiceTypes(): JsonResponse
    {
        try {
            $serviceTypes = PackagePrice::select('service_type')
                ->distinct()
                ->pluck('service_type');

            return response()->json([
                'success' => true,
                'data' => $serviceTypes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get service types: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available packages for a service type
     */
    public function getPackages(string $serviceType): JsonResponse
    {
        try {
            $packages = PackagePrice::where('service_type', $serviceType)
                ->select('id', 'package', 'price')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $packages
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get packages: ' . $e->getMessage()
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