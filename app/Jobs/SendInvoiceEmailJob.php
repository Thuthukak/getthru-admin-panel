<?php

// 1. First, create the job class: app/Jobs/SendInvoiceEmailJob.php
namespace App\Jobs;

use App\Models\Invoice;
use App\Models\InvoiceEmailLog;
use App\Mail\InvoiceMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Exception;

class SendInvoiceEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $invoice;
    public $isManual;
    
    // Job configuration
    public $tries = 3; // Retry 3 times before failing
    public $backoff = [60, 300, 900]; // Retry after 1min, 5min, 15min
    public $timeout = 120; // 2 minutes timeout

    public function __construct(Invoice $invoice, bool $isManual = false)
    {
        $this->invoice = $invoice;
        $this->isManual = $isManual;
        
        // Set queue name based on invoice type for priority handling
        $this->onQueue($invoice->invoice_type === 'deposit' ? 'high' : 'default');
    }

    public function handle()
    {
        try {
            // Check if invoice still exists and is valid
            if (!$this->invoice->exists) {
                Log::warning('Invoice no longer exists, skipping email job', [
                    'invoice_id' => $this->invoice->id
                ]);
                return;
            }

            // Check if email was already sent successfully
            $lastLog = InvoiceEmailLog::where('invoice_id', $this->invoice->id)
                ->where('status', 'sent')
                ->latest()
                ->first();

            if ($lastLog && !$this->isManual) {
                Log::info('Invoice email already sent, skipping', [
                    'invoice_id' => $this->invoice->id,
                    'last_sent' => $lastLog->sent_at
                ]);
                return;
            }

            // Log attempt
            $emailLog = InvoiceEmailLog::create([
                'invoice_id' => $this->invoice->id,
                'email' => $this->invoice->customer_email,
                'attempt_number' => $this->attempts(),
                'status' => 'attempting',
                'is_manual' => $this->isManual,
                'sent_at' => now()
            ]);

            // Send the email
            Mail::to($this->invoice->customer_email)->send(new InvoiceMail($this->invoice));

            // Update invoice status
            $this->invoice->markAsSent();

            // Update log as successful
            $emailLog->update([
                'status' => 'sent',
                'completed_at' => now()
            ]);

            Log::info('Invoice email sent successfully via job', [
                'invoice_id' => $this->invoice->id,
                'invoice_type' => $this->invoice->invoice_type,
                'email' => $this->invoice->customer_email,
                'attempt' => $this->attempts(),
                'manual' => $this->isManual
            ]);

        } catch (Exception $e) {
            // Update log with error
            if (isset($emailLog)) {
                $emailLog->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                    'completed_at' => now()
                ]);
            }

            Log::error('Invoice email job failed', [
                'invoice_id' => $this->invoice->id,
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
                'error' => $e->getMessage()
            ]);

            // Re-throw to trigger retry mechanism
            throw $e;
        }
    }

    public function failed(Exception $exception)
    {
        // This method is called when the job fails after all retries
        Log::error('Invoice email job failed permanently', [
            'invoice_id' => $this->invoice->id,
            'attempts' => $this->attempts(),
            'error' => $exception->getMessage()
        ]);

        // Update the last log entry
        InvoiceEmailLog::where('invoice_id', $this->invoice->id)
            ->latest()
            ->first()
            ->update([
                'status' => 'permanently_failed',
                'error_message' => 'Job failed after ' . $this->tries . ' attempts: ' . $exception->getMessage(),
                'completed_at' => now()
            ]);

        // Optionally notify administrators
        // Mail::to('admin@yourcompany.com')->send(new JobFailedNotification($this->invoice, $exception));
    }

    public function retryUntil()
    {
        // Job will be retried for up to 24 hours
        return now()->addHours(24);
    }
}
