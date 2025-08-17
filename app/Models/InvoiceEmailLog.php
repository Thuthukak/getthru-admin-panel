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
        'sent_at',
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