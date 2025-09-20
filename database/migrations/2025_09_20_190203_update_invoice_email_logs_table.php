<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoice_email_logs', function (Blueprint $table) {
            $table->integer('attempt_number')->default(1)->after('email');
            $table->boolean('is_manual')->default(false)->after('attempt_number');
            $table->timestamp('completed_at')->nullable()->after('sent_at');
            $table->string('status')->default('pending')->change(); // pending, attempting, sent, failed, permanently_failed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoice_email_logs', function (Blueprint $table) {
            $table->dropColumn(['attempt_number', 'is_manual', 'completed_at']);
        });
    }
};
