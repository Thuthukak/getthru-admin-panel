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
        Schema::table('invoices', function (Blueprint $table) {
            // Add invoice type to distinguish between main and deposit invoices
            $table->enum('invoice_type', ['main', 'deposit'])->default('main')->after('status');
            
            // Add description field for more detailed invoice information
            $table->text('description')->nullable()->after('invoice_type');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['invoice_type', 'description']);
        });
    }
};
