<?php

namespace App\Console\Commands;

use App\Services\InvoiceService;
use Illuminate\Console\Command;

class GenerateRecurringInvoices extends Command
{
    protected $signature = 'invoices:generate-recurring';
    protected $description = 'Generate recurring invoices that are due today';

    public function handle()
    {
        $invoiceService = app(InvoiceService::class);
        $generated = $invoiceService->generateRecurringInvoices();
        
        $this->info("Generated {$generated} recurring invoices");
        
        return 0;
    }
}