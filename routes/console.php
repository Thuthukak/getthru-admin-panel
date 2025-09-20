<?php

use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Services\InvoiceService;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Send automatic invoices daily at 9 AM
Schedule::command('invoices:send-automatic')
    ->dailyAt('09:00')
    ->withoutOverlapping()
    ->runInBackground();

// Retry failed invoices every 4 hours - CONVERTED TO COMMAND
Schedule::command('invoices:retry-failed')
    ->everyFourHours()
    ->runInBackground();

// Clean old completed jobs weekly on Sunday at 2 AM
Schedule::command('queue:prune-batches --hours=168')
    ->weekly()
    ->sundays()
    ->at('02:00')
    ->runInBackground();

// Clean old failed jobs monthly
Schedule::command('queue:flush')
    ->monthly()
    ->runInBackground();

// Generate recurring invoices daily at 6 AM - CONVERTED TO COMMAND
Schedule::command('invoices:generate-recurring')
    ->dailyAt('06:00')
    ->runInBackground();

// Mark overdue invoices daily at midnight - CONVERTED TO COMMAND
Schedule::command('invoices:mark-overdue')
    ->dailyAt('00:00')
    ->runInBackground();

// Clean old failed jobs weekly - CONVERTED TO COMMAND
Schedule::command('queue:cleanup-failed --days=7')
    ->weekly()
    ->sundays()
    ->at('03:00')
    ->runInBackground();