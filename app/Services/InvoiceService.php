<?php

// app/Services/InvoiceService.php
namespace App\Services;

use App\Models\Invoice;
use App\Models\Registration;
use App\Models\PackagePrice;
use App\Models\InvoiceEmailLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class InvoiceService
{
    /**
     * Create initial invoice when registration is processed
     */
    public function createInitialInvoice(Registration $registration)
    {
        try {
            $amount = PackagePrice::getPrice($registration->service_type, $registration->package);
            
            $billingDate = $this->calculateBillingDate($registration->payment_period);
            $dueDate = $billingDate->copy()->addDays(30);

            $invoice = Invoice::create([
                'registration_id' => $registration->id,
                'customer_name' => $registration->full_name,
                'customer_email' => $registration->email,
                'customer_phone' => $registration->phone,
                'customer_address' => $registration->address,
                'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                'service_type' => $registration->service_type,
                'package' => $registration->package,
                'amount' => $amount,
                'payment_period' => $registration->payment_period,
                'billing_date' => $billingDate,
                'due_date' => $dueDate,
                'status' => 'pending',
                'is_recurring' => true,
                'next_billing_date' => $this->calculateNextBillingDate($billingDate, $registration->payment_period)
            ]);

            Log::info('Initial invoice created for registration', [
                'registration_id' => $registration->id,
                'invoice_id' => $invoice->id
            ]);

            return $invoice;
        } catch (\Exception $e) {
            Log::error('Failed to create initial invoice', [
                'registration_id' => $registration->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Generate recurring invoices for all active customers
     */
    public function generateRecurringInvoices()
    {
        $today = Carbon::today();
        
        // Get all invoices that are due for renewal today
        $dueInvoices = Invoice::where('next_billing_date', $today)
            ->where('is_recurring', true)
            ->where('status', '!=', 'cancelled')
            ->with('registration')
            ->get();

        $generated = 0;

        foreach ($dueInvoices as $lastInvoice) {
            try {
                $registration = $lastInvoice->registration;
                
                if (!$registration || $registration->status !== 'processed') {
                    continue;
                }

                $amount = PackagePrice::getPrice($registration->service_type, $registration->package);
                $billingDate = $today;
                $dueDate = $billingDate->copy()->addDays(30);

                $newInvoice = Invoice::create([
                    'registration_id' => $registration->id,
                    'customer_name' => $registration->full_name,
                    'customer_email' => $registration->email,
                    'customer_phone' => $registration->phone,
                    'customer_address' => $registration->address,
                    'invoice_number' => (new Invoice())->generateInvoiceNumber(),
                    'service_type' => $registration->service_type,
                    'package' => $registration->package,
                    'amount' => $amount,
                    'payment_period' => $registration->payment_period,
                    'billing_date' => $billingDate,
                    'due_date' => $dueDate,
                    'status' => 'pending',
                    'is_recurring' => true,
                    'next_billing_date' => $this->calculateNextBillingDate($billingDate, $registration->payment_period)
                ]);

                // Update the last invoice's next billing date to null
                $lastInvoice->update(['next_billing_date' => null]);

                $generated++;

                Log::info('Recurring invoice generated', [
                    'registration_id' => $registration->id,
                    'invoice_id' => $newInvoice->id
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
     * Send invoice via email
     */
    public function sendInvoice(Invoice $invoice, bool $isManual = false)
    {
        try {
            // Here you would implement your email sending logic
            // For now, we'll just simulate sending
            
            $emailSent = $this->sendInvoiceEmail($invoice);

            if ($emailSent) {
                $invoice->markAsSent();
                
                InvoiceEmailLog::create([
                    'invoice_id' => $invoice->id,
                    'email' => $invoice->customer_email,
                    'sent_at' => now(),
                    'status' => 'sent'
                ]);

                Log::info('Invoice sent successfully', [
                    'invoice_id' => $invoice->id,
                    'manual' => $isManual
                ]);

                return true;
            }

            return false;

        } catch (\Exception $e) {
            InvoiceEmailLog::create([
                'invoice_id' => $invoice->id,
                'email' => $invoice->customer_email,
                'sent_at' => now(),
                'status' => 'failed',
                'error_message' => $e->getMessage()
            ]);

            Log::error('Failed to send invoice', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }

    /**
     * Send invoices automatically based on billing dates
     */
    public function sendAutomaticInvoices()
    {
        $today = Carbon::today();
        
        // Get invoices that are due today and haven't been sent yet
        $invoices = Invoice::whereDate('billing_date', $today)
            ->where('status', 'pending')
            ->get();

        $sent = 0;

        foreach ($invoices as $invoice) {
            if ($this->sendInvoice($invoice)) {
                $sent++;
            }
        }

        return $sent;
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
     * Simulate sending invoice email (implement your actual email logic here)
     */
    private function sendInvoiceEmail(Invoice $invoice)
    {
        // In a real implementation, you would use Laravel's Mail facade
        // Mail::to($invoice->customer_email)->send(new InvoiceMail($invoice));
        
        // For now, just return true to simulate successful sending
        return true;
    }

    /**
     * Get invoice statistics
     */
    public function getInvoiceStats()
    {
        return [
            'total_invoices' => Invoice::count(),
            'pending_invoices' => Invoice::where('status', 'pending')->count(),
            'sent_invoices' => Invoice::where('status', 'sent')->count(),
            'paid_invoices' => Invoice::where('status', 'paid')->count(),
            'overdue_invoices' => Invoice::where('status', 'overdue')->count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('amount'),
            'pending_revenue' => Invoice::whereIn('status', ['pending', 'sent'])->sum('amount'),
            'overdue_revenue' => Invoice::where('status', 'overdue')->sum('amount'),
        ];
    }
}