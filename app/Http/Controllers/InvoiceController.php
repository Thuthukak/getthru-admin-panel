<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Registration;
use App\Models\PackagePrice;
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
            // Debug: Check if Invoice model can be accessed
            Log::info('Total invoices in DB: ' . Invoice::count());
            
            $query = Invoice::query();
            
            // Add relationships including packagePrice
            try {
                $query->with(['registration', 'packagePrice', 'emailLogs']);
                Log::info('Query with relationships built successfully');
            } catch (\Exception $e) {
                Log::error('Error with relationships: ' . $e->getMessage());
                // Fall back to query without relationships
                $query = Invoice::query();
            }
            
            // Apply filters with debugging
            if ($request->has('status') && $request->status !== '' && $request->status !== null) {
                Log::info('Applying status filter: ' . $request->status);
                $query->where('status', $request->status);
            }
            
            if ($request->has('search') && $request->search !== '' && $request->search !== null) {
                Log::info('Applying search filter: ' . $request->search);
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('customer_name', 'like', "%{$search}%")
                      ->orWhere('customer_email', 'like', "%{$search}%")
                      ->orWhere('invoice_number', 'like', "%{$search}%");
                });
            }
            
            if ($request->has('date_from') && $request->date_from !== '' && $request->date_from !== null) {
                Log::info('Applying date_from filter: ' . $request->date_from);
                $query->whereDate('billing_date', '>=', $request->date_from);
            }
            
            if ($request->has('date_to') && $request->date_to !== '' && $request->date_to !== null) {
                Log::info('Applying date_to filter: ' . $request->date_to);
                $query->whereDate('billing_date', '<=', $request->date_to);
            }
            
            // Filter by service type using packagePrice relationship
            if ($request->has('service_type') && $request->service_type !== '' && $request->service_type !== null) {
                Log::info('Applying service_type filter: ' . $request->service_type);
                $query->byServiceType($request->service_type);
            }
            
            // Filter by package using packagePrice relationship
            if ($request->has('package') && $request->package !== '' && $request->package !== null) {
                Log::info('Applying package filter: ' . $request->package);
                $query->byPackage($request->package);
            }
            
            if ($request->has('overdue') && $request->overdue === 'true') {
                Log::info('Applying overdue filter');
                try {
                    $query->overdue();
                } catch (\Exception $e) {
                    Log::error('Overdue scope error: ' . $e->getMessage());
                    // Fallback overdue logic
                    $query->where('due_date', '<', now())->where('status', '!=', 'paid');
                }
            }
            
            // Debug: Check count after filters
            Log::info('Count after filters: ' . $query->count());
            
            // Sorting with validation
            $sortField = $request->get('sort_field', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');
            
            // Validate sort field exists in table
            $validSortFields = [
                'id', 'invoice_number', 'customer_name', 'customer_email', 
                'amount', 'billing_date', 'due_date', 'status', 'created_at', 'updated_at'
            ];
            
            if (!in_array($sortField, $validSortFields)) {
                Log::warning('Invalid sort field: ' . $sortField . ', using created_at');
                $sortField = 'created_at';
            }
            
            if (!in_array($sortDirection, ['asc', 'desc'])) {
                Log::warning('Invalid sort direction: ' . $sortDirection . ', using desc');
                $sortDirection = 'desc';
            }
            
            Log::info("Sorting by: {$sortField} {$sortDirection}");
            $query->orderBy($sortField, $sortDirection);
            
            // Pagination
            $perPage = (int) $request->get('per_page', 15);
            if ($perPage < 1 || $perPage > 100) {
                Log::warning('Invalid per_page value: ' . $perPage . ', using 15');
                $perPage = 15;
            }
            
            Log::info('Attempting pagination with per_page: ' . $perPage);
            
            // Get the SQL query for debugging
            Log::info('Final SQL query: ' . $query->toSql());
            Log::info('Query bindings: ', $query->getBindings());
            
            $invoices = $query->paginate($perPage);
            
            Log::info('Pagination result - Total: ' . $invoices->total() . ', Count: ' . $invoices->count());
            
            return response()->json([
                'success' => true,
                'data' => $invoices
            ]);
            
        } catch (\Exception $e) {
            Log::error('Exception in InvoiceController@index: ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
            
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
            'package_price_id' => 'nullable|exists:package_prices,id', // Allow direct package_price_id
            'amount' => 'required|numeric|min:0',
            'billing_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:billing_date',
            'notes' => 'nullable|string|max:1000',
            'is_recurring' => 'boolean'
        ]);

        try {
            $registration = Registration::with('packagePrice')->findOrFail($request->registration_id);
            
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
                'customer_name' => $registration->full_name,
                'customer_email' => $registration->email,
                'customer_phone' => $registration->phone,
                'customer_address' => $registration->address,
                'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                'package_price_id' => $packagePriceId, // Store package_price_id instead of individual fields
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
                'data' => $invoice->load(['registration', 'packagePrice'])
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
            $invoice->load(['registration', 'packagePrice', 'emailLogs']);

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
                'data' => $invoice->load(['registration', 'packagePrice'])
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
            $registrations = Registration::with('packagePrice')
                ->where('status', 'processed')
                ->select('id', 'name', 'surname', 'email', 'package_price_id')
                ->get()
                ->map(function ($registration) {
                    return [
                        'id' => $registration->id,
                        'name' => $registration->full_name,
                        'email' => $registration->email,
                        'package_price_id' => $registration->package_price_id,
                        'service_type' => $registration->packagePrice?->service_type,
                        'package' => $registration->packagePrice?->package,
                        'price' => $registration->packagePrice?->price
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