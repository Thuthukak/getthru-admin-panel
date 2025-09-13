<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Registration;
use App\Models\PackagePrice;
use App\Models\Invoice;
use App\Models\Customer;
use App\Services\InvoiceService;
use Carbon\Carbon;

class RegistrationController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }

    /**
     * Store a new registration form submission
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        Log::info('Registration submission started', ['request_data' => $request->all()]);
        
        // Use database transaction to ensure data consistency
        DB::beginTransaction();
        
        try {
            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'alternativePhone' => 'nullable|string|max:20',
                'email' => 'required|email|max:255',
                'location' => 'required|string|max:255',
                'otherLocation' => 'nullable|string|max:255|required_if:location,Other',
                'address' => 'required|string|max:500',
                'serviceType' => 'required|string|max:255',
                'package' => 'required|string|max:255',
                'installationDate' => 'required|date|after_or_equal:today',
                'paymentPeriod' => 'required|string|max:255',
                'depositPayment' => 'required|string|in:card,eft,bank deposit,pay later',
                'howDidYouKnow' => 'nullable|string|max:255',
                'otherKnow' => 'nullable|string|max:255|required_if:howDidYouKnow,other',
                'comments' => 'nullable|string|max:1000',
            ]);

            // Return validation errors if any
            if ($validator->fails()) {
                DB::rollBack();
                Log::error('Validation failed', ['errors' => $validator->errors()->all()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get validated data
            $validatedData = $validator->validated();
            Log::info('Validated data', ['validated_data' => $validatedData]);

            // Find the corresponding package price
            $packagePrice = PackagePrice::where('service_type', $validatedData['serviceType'])
                ->where('package', $validatedData['package'])
                ->first();

            Log::info('Package price found', ['package_price' => $packagePrice]);

            if (!$packagePrice) {
                DB::rollBack();
                Log::error('Invalid service type and package combination');
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid service type and package combination'
                ], 422);
            }

            // Create customer record first
            $customer = Customer::create([
                'name' => $validatedData['name'],
                'surname' => $validatedData['surname'],
                'phone' => $validatedData['phone'],
                'alternative_phone' => $validatedData['alternativePhone'],
                'email' => $validatedData['email'],
                'location' => $validatedData['location'] === 'Other' ? $validatedData['otherLocation'] : $validatedData['location'],
                'address' => $validatedData['address'],
            ]);

            Log::info('Customer created', ['customer' => $customer]);

            // Create registration using Eloquent model with customer_id
            $registration = Registration::create([
                'customer_id' => $customer->id,
                'name' => $validatedData['name'],
                'surname' => $validatedData['surname'],
                'phone' => $validatedData['phone'],
                'alternative_phone' => $validatedData['alternativePhone'],
                'email' => $validatedData['email'],
                'location' => $validatedData['location'] === 'Other' ? $validatedData['otherLocation'] : $validatedData['location'],
                'address' => $validatedData['address'],
                'service_type' => $validatedData['serviceType'],
                'package' => $validatedData['package'],
                'package_price_id' => $packagePrice->id,
                'installation_date' => $validatedData['installationDate'],
                'payment_period' => $validatedData['paymentPeriod'],
                'deposit_payment' => $validatedData['depositPayment'],
                'how_did_you_know' => $validatedData['howDidYouKnow'] === 'other' ? $validatedData['otherKnow'] : $validatedData['howDidYouKnow'],
                'comments' => $validatedData['comments'],
                'status' => 'pending' // Start with pending status
            ]);

            Log::info('Registration created', ['registration' => $registration]);

            // Load the relationships
            $registration->load(['packagePrice', 'customer']);

            // Create invoices based on deposit payment method
            $invoiceResult = $this->invoiceService->createInitialInvoice($registration);
            
            // Prepare response data based on invoice creation result
            $responseData = [
                'full_name' => $registration->full_name,
                'email' => $registration->email,
                'service_type' => $registration->service_type,
                'package' => $registration->package,
                'price' => $registration->package_price_value,
                'installation_date' => $registration->formatted_installation_date,
                'deposit_payment' => $registration->deposit_payment
            ];

            // Handle different invoice scenarios
            if (strtolower($validatedData['depositPayment']) === 'Pay later') {
                // Single invoice with full deposit included
                $responseData['invoice'] = [
                    'invoice_type' => 'main',
                    'invoice_id' => $invoiceResult->id,
                    'amount' => $invoiceResult->amount,
                    'package_price' => $packagePrice->price,
                    'deposit_included' => 950,
                    'description' => 'Service package with full deposit (Pay Later option)'
                ];
            } else {
                // Split invoices: deposit + main
                $responseData['invoices'] = [
                    'type' => 'split',
                    'deposit_invoice' => [
                        'invoice_id' => $invoiceResult['deposit_invoice']->id,
                        'amount' => $invoiceResult['deposit_invoice']->amount,
                        'description' => 'Registration Deposit',
                        'due_date' => $invoiceResult['deposit_invoice']->due_date
                    ],
                    'main_invoice' => [
                        'invoice_id' => $invoiceResult['main_invoice']->id,
                        'amount' => $invoiceResult['main_invoice']->amount,
                        'description' => 'Service package with partial deposit',
                        'package_price' => $packagePrice->price,
                        'partial_deposit' => 475,
                        'due_date' => $invoiceResult['main_invoice']->due_date
                    ]
                ];
            }

           
            // Commit the transaction
            DB::commit();

            // Log successful submission
            Log::info('Registration and invoices created successfully', [
                'registration_id' => $registration->id,
                'customer_id' => $customer->id,
                'email' => $registration->email,
                'name' => $registration->full_name,
                'deposit_payment' => $registration->deposit_payment,
                'invoice_result' => is_array($invoiceResult) ? 'split_invoices' : 'single_invoice'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registration submitted and invoices created successfully',
                'registration_id' => $registration->id,
                'customer_id' => $customer->id,
                'data' => $responseData
            ], 201);

        } catch (\Exception $e) {
            // Rollback the transaction
            DB::rollBack();
            
            // Log the error
            Log::error('Registration form submission failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available packages for a service type
     *
     * @param string $serviceType
     * @return JsonResponse
     */
    public function getPackages(string $serviceType): JsonResponse
    {
        try {
            $packages = PackagePrice::where('service_type', $serviceType)
                ->select('id', 'package', 'price')
                ->get();

            return response()->json([
                'success' => true,
                'packages' => $packages
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get packages', [
                'error' => $e->getMessage(),
                'service_type' => $serviceType
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve packages'
            ], 500);
        }
    }

    /**
     * Get all service types
     *
     * @return JsonResponse
     */
    public function getServiceTypes(): JsonResponse
    {
        try {
            $serviceTypes = PackagePrice::select('service_type')
                ->distinct()
                ->pluck('service_type');

            return response()->json([
                'success' => true,
                'service_types' => $serviceTypes
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get service types', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve service types'
            ], 500);
        }
    }

    /**
     * Get registration details with invoices
     *
     * @param int $registrationId
     * @return JsonResponse
     */
    public function show(int $registrationId): JsonResponse
    {
        try {
            $registration = Registration::with(['customer', 'packagePrice', 'invoices'])
                ->findOrFail($registrationId);

            return response()->json([
                'success' => true,
                'data' => $registration
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get registration details', [
                'registration_id' => $registrationId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Registration not found'
            ], 404);
        }
    }

    /**
     * Get deposit payment options
     *
     * @return JsonResponse
     */
    public function getDepositPaymentOptions(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'options' => [
                ['value' => 'Card', 'label' => 'Credit/Debit Card'],
                ['value' => 'EFT Payment', 'label' => 'EFT Payment'],
                ['value' => 'Bank deposit', 'label' => 'Bank Deposit'],
                ['value' => 'Pay later', 'label' => 'Pay Later (Full deposit on first invoice)']
            ]
        ]);
    }

    /**
     * Get registrations with invoice summary
     *
     * @return JsonResponse
     */
    public function indexWithInvoices(Request $request): JsonResponse
    {
        try {
            $query = Registration::with(['customer', 'packagePrice', 'invoices']);
            
            // Apply filters
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }
            
            if ($request->has('deposit_payment')) {
                $query->where('deposit_payment', $request->deposit_payment);
            }
            
            if ($request->has('service_type')) {
                $query->where('service_type', $request->service_type);
            }

            $registrations = $query->paginate($request->get('per_page', 15));
            
            // Add invoice summary to each registration
            $registrations->getCollection()->transform(function ($registration) {
                $invoiceSummary = [
                    'total_invoices' => $registration->invoices->count(),
                    'main_invoices' => $registration->mainInvoices->count(),
                    'deposit_invoices' => $registration->depositInvoices->count(),
                    'total_amount_owed' => $registration->total_amount_owed,
                    'total_amount_paid' => $registration->total_amount_paid,
                    'has_pending' => $registration->hasPendingInvoices(),
                    'has_overdue' => $registration->hasOverdueInvoices(),
                ];
                
                $registration->invoice_summary = $invoiceSummary;
                return $registration;
            });

            return response()->json([
                'success' => true,
                'data' => $registrations
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get registrations with invoices', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve registrations'
            ], 500);
        }
    }
}