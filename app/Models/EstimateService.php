<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EstimateService extends Model
{
   use HasFactory;

    protected $fillable = [
        'estimate_id',
        'service_id',
        'price',
        'notes'
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Get the estimate this service belongs to.
     */
    public function estimate()
    {
        return $this->belongsTo(Estimate::class);
    }

    /**
     * Get the service details.
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }


}
