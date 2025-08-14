<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Estimate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'total_amount',
        'status',
        'notes'
    ];

     protected $casts = [
        'total_amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the services associated with this estimate.
     */
    public function services()
    {
        return $this->hasMany(EstimateService::class);
    }

    // Scope for filtering by status
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Scope for filtering by date range
    public function scopeDateRange($query, $from, $to)
    {
        if ($from) {
            $query->whereDate('created_at', '>=', $from);
        }
        if ($to) {
            $query->whereDate('created_at', '<=', $to);
        }
        return $query;
    }

    // Scope for searching by name or email
    public function scopeSearch($query, $search)
    {
        return $query->where(function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    // Accessor for formatted total amount
    public function getFormattedTotalAttribute()
    {
        return number_format($this->total_amount, 2);
    }

    // Check if estimate is overdue (older than 30 days)
    public function getIsOverdueAttribute()
    {
        return $this->created_at->diffInDays(now()) > 30;
    }
}
