<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Service extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'name',
        'description',
        'base_price',
        'is_active',
        
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];
  

    // Relationship with EstimateService
    public function estimateServices()
    {
        return $this->hasMany(EstimateService::class);
    }

    // Scope for active services only
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

     /**
     * Scope a query to search services by name or description.
     */
    public function scopeSearch($query, $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
              ->orWhere('description', 'like', "%{$term}%");
        });
    }

      public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    // Accessors
    public function getFormattedBasePriceAttribute(): string
    {
        return '$' . number_format($this->base_price, 2);
    }
}
