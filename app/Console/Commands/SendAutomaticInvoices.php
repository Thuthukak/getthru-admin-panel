<?php

namespace App\Console\Commands;

use App\Services\InvoiceService;
use Illuminate\Console\Command;

class SendAutomaticInvoices extends Command
{
    protected $signature = 'invoices:send-automatic';
    protected $description = 'Queue automatic invoice emails for today';

    public function handle()
    {
        $invoiceService = app(InvoiceService::class);
        $dispatched = $invoiceService->sendAutomaticInvoices();
        
        $this->info("Dispatched {$dispatched} invoice email jobs");
        
        return 0;
    }
}