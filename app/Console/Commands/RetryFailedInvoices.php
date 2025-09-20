<?php

namespace App\Console\Commands;

use App\Services\InvoiceService;
use Illuminate\Console\Command;

class RetryFailedInvoices extends Command
{
    protected $signature = 'invoices:retry-failed {--hours=4}';
    protected $description = 'Retry failed invoice emails from the last X hours';

    public function handle()
    {
        $hours = $this->option('hours');
        $invoiceService = app(InvoiceService::class);
        $retried = $invoiceService->retryFailedInvoices($hours);
        
        $this->info("Retried {$retried} failed invoice emails from the last {$hours} hours");
        
        return 0;
    }
}