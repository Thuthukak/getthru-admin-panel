<?php
// app/Models/Invoice.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'client_id',
        'invoice_date',
        'due_date',
        'status',
        'notes',
        'terms',
        'subtotal',
        'tax_rate',
        'tax_amount',
        'discount_rate',
        'discount_amount',
        'total',
        'paid_amount',
        'balance',
        'paid_date',
        'payment_method',
        'payment_notes',
        'sent_at',
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date' => 'date',
        'paid_date' => 'date',
        'sent_at' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_rate' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'balance' => 'decimal:2',
    ];

    // Relationships
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class)->orderBy('sort_order');
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', '!=', 'paid')
                    ->where('due_date', '<', now());
    }

    public function scopeByClient($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('invoice_date', [$startDate, $endDate]);
    }

    // Accessors & Mutators
    public function getIsOverdueAttribute(): bool
    {
        return $this->status !== 'paid' && $this->due_date < now();
    }

    public function getFormattedTotalAttribute(): string
    {
        return '$' . number_format($this->total, 2);
    }

    public function getFormattedBalanceAttribute(): string
    {
        return '$' . number_format($this->balance, 2);
    }

    // Methods
    public function calculateTotals(): void
    {
        $this->subtotal = $this->items->sum('total');
        
        // Calculate discount
        if ($this->discount_rate > 0) {
            $this->discount_amount = ($this->subtotal * $this->discount_rate) / 100;
        }
        
        $subtotalAfterDiscount = $this->subtotal - $this->discount_amount;
        
        // Calculate tax
        if ($this->tax_rate > 0) {
            $this->tax_amount = ($subtotalAfterDiscount * $this->tax_rate) / 100;
        }
        
        $this->total = $subtotalAfterDiscount + $this->tax_amount;
        $this->balance = $this->total - $this->paid_amount;
    }

    public function generateInvoiceNumber(): string
    {
        $year = now()->year;
        $lastInvoice = static::whereYear('created_at', $year)
                           ->orderBy('id', 'desc')
                           ->first();
        
        $number = $lastInvoice ? 
            intval(substr($lastInvoice->invoice_number, -4)) + 1 : 1;
        
        return 'INV-' . $year . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    public function markAsSent(): void
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }

    public function markAsPaid(float $amount = null, string $method = null, string $notes = null): void
    {
        $paymentAmount = $amount ?? $this->balance;
        
        $this->update([
            'paid_amount' => $this->paid_amount + $paymentAmount,
            'balance' => $this->total - ($this->paid_amount + $paymentAmount),
            'status' => ($this->paid_amount + $paymentAmount) >= $this->total ? 'paid' : 'sent',
            'paid_date' => ($this->paid_amount + $paymentAmount) >= $this->total ? now() : $this->paid_date,
            'payment_method' => $method ?? $this->payment_method,
            'payment_notes' => $notes ?? $this->payment_notes,
        ]);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($invoice) {
            if (empty($invoice->invoice_number)) {
                $invoice->invoice_number = $invoice->generateInvoiceNumber();
            }
        });
    }
}