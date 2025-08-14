<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'service_id',
        'description',
        'quantity',
        'unit_price',
        'total',
        'sort_order',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    // Relationships
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    // Accessors
    public function getFormattedUnitPriceAttribute(): string
    {
        return '$' . number_format($this->unit_price, 2);
    }

    public function getFormattedTotalAttribute(): string
    {
        return '$' . number_format($this->total, 2);
    }

    // Methods
    public function calculateTotal(): void
    {
        $this->total = $this->quantity * $this->unit_price;
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            // Auto-populate from service if service_id is provided
            if ($item->service_id && !$item->description) {
                $service = Service::find($item->service_id);
                if ($service) {
                    $item->description = $service->description ?: $service->name;
                    $item->unit_price = $item->unit_price ?: $service->base_price;
                }
            }
            
            $item->calculateTotal();
        });

        static::updating(function ($item) {
            $item->calculateTotal();
        });

        static::saved(function ($item) {
            // Recalculate invoice totals when item is saved
            $item->invoice->calculateTotals();
            $item->invoice->saveQuietly(); // Avoid infinite loop
        });

        static::deleted(function ($item) {
            // Recalculate invoice totals when item is deleted
            $item->invoice->calculateTotals();
            $item->invoice->saveQuietly();
        });
    }
}