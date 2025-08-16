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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('phone');
            $table->string('alternative_phone')->nullable();
            $table->string('email');
            $table->string('location');
            $table->text('address');
            $table->string('service_type');
            $table->string('package');
            $table->date('installation_date');
            $table->string('payment_period');
            $table->string('deposit_payment');
            $table->string('how_did_you_know')->nullable();
            $table->text('comments')->nullable();
            $table->enum('status', ['pending', 'processed', 'cancelled'])->default('pending');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Add indexes for common queries
            $table->index('email');
            $table->index('phone');
            $table->index('installation_date');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};