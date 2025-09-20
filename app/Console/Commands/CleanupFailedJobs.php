<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CleanupFailedJobs extends Command
{
    protected $signature = 'queue:cleanup-failed {--days=7}';
    protected $description = 'Clean up old failed jobs to prevent database bloat';

    public function handle()
    {
        $days = $this->option('days');
        $cutoff = now()->subDays($days);
        
        $deleted = DB::table('failed_jobs')
            ->where('failed_at', '<', $cutoff)
            ->delete();
            
        $this->info("Cleaned up {$deleted} failed jobs older than {$days} days.");
        
        return 0;
    }
}