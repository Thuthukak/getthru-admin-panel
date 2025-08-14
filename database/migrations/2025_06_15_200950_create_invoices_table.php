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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->date('invoice_date');
            $table->date('due_date');
            $table->enum('status', ['draft', 'sent', 'paid', 'overdue', 'cancelled'])->default('draft');
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
            
            // Financial fields
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('tax_rate', 5, 2)->default(0); // Percentage
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('discount_rate', 5, 2)->default(0); // Percentage
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total', 12, 2)->default(0);
            $table->decimal('paid_amount', 12, 2)->default(0);
            $table->decimal('balance', 12, 2)->default(0);
            
            // Payment info
            $table->date('paid_date')->nullable();
            $table->string('payment_method')->nullable();
            $table->text('payment_notes')->nullable();
            
            // Timestamps
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'created_at']);
            $table->index(['client_id', 'status']);
            $table->index('invoice_date');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
