<?php

namespace App\Console\Commands;

use App\Services\InvoiceService;
use Illuminate\Console\Command;

class MarkOverdueInvoices extends Command
{
    protected $signature = 'invoices:mark-overdue';
    protected $description = 'Mark invoices as overdue if past due date';

    public function handle()
    {
        $invoiceService = app(InvoiceService::class);
        $marked = $invoiceService->markOverdueInvoices();
        
        $this->info("Marked {$marked} invoices as overdue");
        
        return 0;
    }
}