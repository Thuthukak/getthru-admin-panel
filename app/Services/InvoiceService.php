<?php

// app/Services/InvoiceService.php
namespace App\Services;

use App\Models\Invoice;
use App\Models\Registration;
use App\Models\PackagePrice;
use App\Models\InvoiceEmailLog;
use App\Jobs\SendInvoiceEmailJob;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class InvoiceService
{
    // Deposit constants
    const FULL_DEPOSIT = 950;
    const HALF_DEPOSIT = 475;

    /**
     * Create initial invoice when registration is processed
     */
    public function createInitialInvoice(Registration $registration)
    {
        try {
            $packagePrice = $registration->packagePrice;
            if (!$packagePrice) {
                throw new \Exception('Package price not found for registration');
            }

            $baseAmount = $packagePrice->price;
            
            // Handle deposit logic based on payment method
            if (strtolower($registration->deposit_payment) === 'pay later') {
                // Pay later: Add full deposit to main invoice, but keep it inactive until processed
                $mainInvoiceAmount = $baseAmount + self::FULL_DEPOSIT;
                
                $invoice = $this->createInvoice($registration, $mainInvoiceAmount, 'main', false); // is_active = false
                
                Log::info('Pay later invoice created', [
                    'registration_id' => $registration->id,
                    'invoice_id' => $invoice->id,
                    'amount' => $mainInvoiceAmount,
                    'deposit_included' => self::FULL_DEPOSIT,
                    'is_active' => false
                ]);

                return $invoice;
                
            } else {
                // Other payment methods: Create separate deposit invoice + main invoice with half deposit
                
                // 1. Create deposit invoice (R475) - ACTIVE immediately
                $depositInvoice = $this->createDepositInvoice($registration);
                
                // 2. Create main invoice with package price + half deposit (R475) - INACTIVE until processed
                $mainInvoiceAmount = $baseAmount + self::HALF_DEPOSIT;
                $mainInvoice = $this->createInvoice($registration, $mainInvoiceAmount, 'main', false); // is_active = false
                
                Log::info('Split payment invoices created', [
                    'registration_id' => $registration->id,
                    'deposit_invoice_id' => $depositInvoice->id,
                    'deposit_amount' => self::HALF_DEPOSIT,
                    'deposit_active' => true,
                    'main_invoice_id' => $mainInvoice->id,
                    'main_amount' => $mainInvoiceAmount,
                    'main_active' => false,
                    'payment_method' => $registration->deposit_payment
                ]);

                return [
                    'deposit_invoice' => $depositInvoice,
                    'main_invoice' => $mainInvoice
                ];
            }

        } catch (\Exception $e) {
            Log::error('Failed to create initial invoice', [
                'registration_id' => $registration->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Create a deposit invoice
     */
    private function createDepositInvoice(Registration $registration)
    {
        $billingDate = Carbon::today();
        $dueDate = $billingDate->copy()->addDays(7); // Deposit due in 7 days

        return Invoice::create([
            'registration_id' => $registration->id,
            'customer_name' => $registration->full_name,
            'customer_email' => $registration->email,
            'customer_phone' => $registration->phone,
            'customer_address' => $registration->address,
            'invoice_number' => (new Invoice())->generateInvoiceNumber(),
            'package_price_id' => $registration->package_price_id,
            'package' => $registration->packagePrice->package,
            'service_type' => $registration->service_type, // FIXED: Added missing service_type
            'amount' => self::HALF_DEPOSIT,
            'payment_period' => 'one-time', // Deposit is one-time payment
            'billing_date' => $billingDate,
            'due_date' => $dueDate,
            'is_active' => true, // DEPOSIT INVOICES ARE ALWAYS ACTIVE
            'status' => 'pending',
            'invoice_type' => 'deposit', // New field to distinguish invoice types
            'description' => 'Installation Deposit - ' . $registration->packagePrice->service_type . ' (' . $registration->packagePrice->package . ')',
            'is_recurring' => false,
            'next_billing_date' => null
        ]);
    }

    /**
     * Create main service invoice
     */
    private function createInvoice(Registration $registration, $amount, $type = 'main', $isActive = false)
    {
        $billingDate = $this->calculateBillingDate($registration->payment_period);
        $dueDate = $billingDate->copy()->addDays(30);
        
        $description = $registration->packagePrice->service_type . ' (' . $registration->packagePrice->package . ')';
        
        // Add deposit info to description if applicable
        if ($type === 'main') {
            if (strtolower($registration->deposit_payment) === 'pay later') {
                $description .= ' - Including Installation Deposit (R' . self::FULL_DEPOSIT . ')';
            } else {
                $description .= ' - Including Partial Installation Deposit (R' . self::HALF_DEPOSIT . ')';
            }
        }

        return Invoice::create([
            'registration_id' => $registration->id,
            'customer_name' => $registration->full_name,
            'customer_email' => $registration->email,
            'customer_phone' => $registration->phone,
            'customer_address' => $registration->address,
            'invoice_number' => (new Invoice())->generateInvoiceNumber(),
            'package_price_id' => $registration->package_price_id,
            'service_type' => $registration->service_type, // This was already here correctly
            'package' => $registration->packagePrice->package,
            'amount' => $amount,
            'payment_period' => $registration->payment_period,
            'billing_date' => $billingDate,
            'due_date' => $dueDate,
            'is_active' => $isActive, // Use parameter to control active state
            'status' => 'pending',
            'invoice_type' => $type, // 'main' or 'deposit'
            'description' => $description,
            'is_recurring' => $type === 'main', // Only main invoices are recurring
            'next_billing_date' => $type === 'main' ? $this->calculateNextBillingDate($billingDate, $registration->payment_period) : null
        ]);
    }

    /**
     * Activate main invoices for a registration (called when status becomes 'processed')
     */
    public function activateMainInvoices($registrationId)
    {
        $updated = Invoice::where('registration_id', $registrationId)
            ->where('invoice_type', 'main')
            ->where('is_active', false)
            ->update(['is_active' => true]);

        Log::info('Main invoices activated', [
            'registration_id' => $registrationId,
            'invoices_activated' => $updated
        ]);

        return $updated;
    }

    /**
     * Generate recurring invoices for all active customers
     * Note: Only generate for main invoices, not deposit invoices
     */
    public function generateRecurringInvoices()
    {
        $today = Carbon::today();
        
        // Get all main invoices that are due for renewal today
        $dueInvoices = Invoice::where('next_billing_date', $today)
            ->where('is_recurring', true)
            ->where('status', '!=', 'cancelled')
            ->where('is_active', true) // Only active invoices
            ->where('invoice_type', 'main') // Only main invoices should recur
            ->with('registration')
            ->get();

        $generated = 0;

        foreach ($dueInvoices as $lastInvoice) {
            try {
                $registration = $lastInvoice->registration;
                
                if (!$registration || $registration->status !== 'processed') {
                    continue;
                }

                $packagePrice = $registration->packagePrice;
                if (!$packagePrice) {
                    Log::warning('Package price not found for recurring invoice', [
                        'registration_id' => $registration->id
                    ]);
                    continue;
                }

                // For recurring invoices, only charge the package price (no deposit)
                $amount = $packagePrice->price;
                $billingDate = $today;
                $dueDate = $billingDate->copy()->addDays(30);

                $newInvoice = Invoice::create([
                    'registration_id' => $registration->id,
                    'customer_name' => $registration->full_name,
                    'customer_email' => $registration->email,
                    'customer_phone' => $registration->phone,
                    'customer_address' => $registration->address,
                    'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                    'package_price_id' => $registration->package_price_id,
                    'service_type' => $registration->service_type,
                    'package' => $registration->package,
                    'amount' => $amount,
                    'payment_period' => $registration->payment_period,
                    'billing_date' => $billingDate,
                    'due_date' => $dueDate,
                    'is_active' => true, // New recurring invoices are active
                    'status' => 'pending',
                    'invoice_type' => 'main',
                    'description' => $packagePrice->service_type . ' (' . $packagePrice->package . ')',
                    'is_recurring' => true,
                    'next_billing_date' => $this->calculateNextBillingDate($billingDate, $registration->payment_period)
                ]);

                // Update the last invoice's next billing date to null
                $lastInvoice->update(['next_billing_date' => null]);

                $generated++;

                Log::info('Recurring invoice generated', [
                    'registration_id' => $registration->id,
                    'invoice_id' => $newInvoice->id,
                    'amount' => $amount
                ]);

            } catch (\Exception $e) {
                Log::error('Failed to generate recurring invoice', [
                    'last_invoice_id' => $lastInvoice->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        return $generated;
    }

    /**
     * Send invoice via email using job queue
     */
    public function sendInvoice(Invoice $invoice, bool $isManual = false)
    {
        try {
            // Validate invoice
            if (!$invoice->customer_email) {
                throw new \Exception('Customer email is required');
            }

            // Dispatch job to queue
            SendInvoiceEmailJob::dispatch($invoice, $isManual);

            Log::info('Invoice email job dispatched', [
                'invoice_id' => $invoice->id,
                'invoice_type' => $invoice->invoice_type,
                'email' => $invoice->customer_email,
                'manual' => $isManual
            ]);

            return true;

        } catch (\Exception $e) {
            // Log immediate dispatch error
            InvoiceEmailLog::create([
                'invoice_id' => $invoice->id,
                'email' => $invoice->customer_email,
                'sent_at' => now(),
                'status' => 'dispatch_failed',
                'error_message' => $e->getMessage(),
                'is_manual' => $isManual
            ]);

            Log::error('Failed to dispatch invoice email job', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }

    /**
     * Send invoices automatically with job queue
     */
    public function sendAutomaticInvoices()
    {
        $today = Carbon::today();
        
        // Get invoices that are due today and haven't been sent yet
        $invoices = Invoice::whereDate('billing_date', $today)
            ->where('status', 'pending')
            ->where('is_active', true) // Only send active invoices
            ->get();

        $dispatched = 0;

        foreach ($invoices as $invoice) {
            if ($this->sendInvoice($invoice, false)) {
                $dispatched++;
            }
        }

        Log::info('Automatic invoice email jobs dispatched', [
            'date' => $today->toDateString(),
            'jobs_dispatched' => $dispatched
        ]);

        return $dispatched;
    }

    /**
     * Retry failed invoice emails
     */
    public function retryFailedInvoices($hours = 24)
    {
        $cutoff = now()->subHours($hours);
        
        // Get invoices with failed emails in the last X hours
        $failedInvoiceIds = InvoiceEmailLog::where('status', 'failed')
            ->where('sent_at', '>=', $cutoff)
            ->pluck('invoice_id')
            ->unique();

        $retried = 0;
        
        foreach ($failedInvoiceIds as $invoiceId) {
            $invoice = Invoice::find($invoiceId);
            if ($invoice && $this->sendInvoice($invoice, true)) {
                $retried++;
            }
        }

        Log::info('Failed invoice emails retried', [
            'retried_count' => $retried,
            'hours_back' => $hours
        ]);

        return $retried;
    }


    /**
     * Mark invoices as overdue
     */
    public function markOverdueInvoices()
    {
        $overdueCount = Invoice::where('due_date', '<', Carbon::today())
            ->whereIn('status', ['sent', 'pending'])
            ->update(['status' => 'overdue']);

        Log::info('Marked invoices as overdue', ['count' => $overdueCount]);

        return $overdueCount;
    }

    /**
     * Calculate billing date based on payment period
     */
    private function calculateBillingDate($paymentPeriod)
    {
        $today = Carbon::today();

        if ($paymentPeriod === '1st of every month') {
            return $today->startOfMonth();
        } elseif ($paymentPeriod === '15th of every month') {
            return $today->day <= 15 ? $today->copy()->day(15) : $today->copy()->addMonth()->day(15);
        }

        return $today;
    }

    /**
     * Calculate next billing date
     */
    private function calculateNextBillingDate($currentBillingDate, $paymentPeriod)
    {
        if ($paymentPeriod === '1st of every month') {
            return $currentBillingDate->copy()->addMonth()->startOfMonth();
        } elseif ($paymentPeriod === '15th of every month') {
            return $currentBillingDate->copy()->addMonth()->day(15);
        }

        return null;
    }

    /**
     * Send invoice email with PDF attachment
     */
    // private function sendInvoiceEmail(Invoice $invoice)
    // {
    //     try {
    //         Mail::to($invoice->customer_email)->send(new \App\Mail\InvoiceMail($invoice));
    //         return true;
    //     } catch (\Exception $e) {
    //         Log::error('Failed to send invoice email', [
    //             'invoice_id' => $invoice->id,
    //             'error' => $e->getMessage()
    //         ]);
    //         return false;
    //     }
    // }

    /**
     * Get invoice statistics with breakdown by type
     */
    public function getInvoiceStats()
    {
        return [
            'total_invoices' => Invoice::count(),
            'main_invoices' => Invoice::where('invoice_type', 'main')->count(),
            'deposit_invoices' => Invoice::where('invoice_type', 'deposit')->count(),
            'pending_invoices' => Invoice::where('status', 'pending')->count(),
            'sent_invoices' => Invoice::where('status', 'sent')->count(),
            'paid_invoices' => Invoice::where('status', 'paid')->count(),
            'overdue_invoices' => Invoice::where('status', 'overdue')->count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('amount'),
            'pending_revenue' => Invoice::whereIn('status', ['pending', 'sent'])->sum('amount'),
            'overdue_revenue' => Invoice::where('status', 'overdue')->sum('amount'),
            'deposit_revenue' => Invoice::where('invoice_type', 'deposit')->where('status', 'paid')->sum('amount'),
            'service_revenue' => Invoice::where('invoice_type', 'main')->where('status', 'paid')->sum('amount'),
        ];
    }
}