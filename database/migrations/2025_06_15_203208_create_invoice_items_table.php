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
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->nullable()->constrained()->onDelete('set null');
            $table->string('description'); // Can override service description
            $table->decimal('quantity', 10, 2)->default(1);
            $table->decimal('unit_price', 10, 2); // Can override service base_price
            $table->decimal('total', 12, 2); // quantity * unit_price
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            // Indexes
            $table->index(['invoice_id', 'sort_order']);
            $table->index('service_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
