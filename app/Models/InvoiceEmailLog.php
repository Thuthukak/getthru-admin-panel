<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceEmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'email',
        'attempt_number',
        'is_manual',
        'sent_at',
        'completed_at',
        'status',
        'error_message'
    ];

    protected $casts = [
        'sent_at' => 'datetime'
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}