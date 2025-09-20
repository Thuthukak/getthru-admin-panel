<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ProcessInvoiceEmailQueue extends Command
{
    protected $signature = 'queue:work-invoices {--timeout=60}';
    protected $description = 'Process invoice email queue jobs';

    public function handle()
    {
        $timeout = $this->option('timeout');
        
        $this->info('Starting invoice email queue worker...');
        
        // Process high priority queue first (deposits), then default
        $this->call('queue:work', [
            '--queue' => 'high,default',
            '--timeout' => $timeout,
            '--tries' => 3,
            '--delay' => 60
        ]);
    }
}