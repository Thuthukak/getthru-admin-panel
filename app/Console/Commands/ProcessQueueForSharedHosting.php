<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ProcessQueueForSharedHosting extends Command
{
    protected $signature = 'queue:work-shared {--timeout=240} {--max-jobs=10}';
    protected $description = 'Process queue jobs optimized for shared hosting';

    public function handle()
    {
        $timeout = $this->option('timeout');
        $maxJobs = $this->option('max-jobs');
        
        $this->info('Processing queue jobs for shared hosting...');
        
        // Process jobs with shared hosting optimizations
        $this->call('queue:work', [
            'connection' => 'database',
            '--queue' => 'high,default',
            '--stop-when-empty' => true,
            '--max-jobs' => $maxJobs,
            '--max-time' => $timeout,
            '--memory' => 128, // Limit memory usage
            '--sleep' => 3,
            '--tries' => 3
        ]);
        
        $this->info('Queue processing completed.');
        
        return 0;
    }
}

