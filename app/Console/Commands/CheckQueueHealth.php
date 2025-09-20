<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\InvoiceEmailLog;

class CheckQueueHealth extends Command
{
    protected $signature = 'queue:health-check';
    protected $description = 'Check queue and email sending health';

    public function handle()
    {
        $stats = [
            'pending_jobs' => DB::table('jobs')->count(),
            'failed_jobs' => DB::table('failed_jobs')->count(),
            'emails_sent_today' => InvoiceEmailLog::where('status', 'sent')
                ->whereDate('sent_at', today())
                ->count(),
            'emails_failed_today' => InvoiceEmailLog::whereIn('status', ['failed', 'permanently_failed'])
                ->whereDate('sent_at', today())
                ->count(),
        ];
        
        $this->table(['Metric', 'Count'], [
            ['Pending Jobs', $stats['pending_jobs']],
            ['Failed Jobs', $stats['failed_jobs']],
            ['Emails Sent Today', $stats['emails_sent_today']],
            ['Emails Failed Today', $stats['emails_failed_today']],
        ]);
        
        // Alert if too many failed jobs
        if ($stats['failed_jobs'] > 50) {
            $this->error('WARNING: High number of failed jobs detected!');
        }
        
        return 0;
    }
}