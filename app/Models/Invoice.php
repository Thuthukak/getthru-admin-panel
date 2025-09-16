<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'registration_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'invoice_number',
        'package_price_id', // Use this instead of service_type and package
        'service_type',
        'package',
        'invoice_type',
        'description',
        'amount',
        'payment_period',
        'billing_date',
        'due_date',
        'is_active',
        'status',
        'sent_at',
        'paid_at',
        'notes',
        'is_recurring',
        'next_billing_date'
    ];

    protected $casts = [
        'billing_date' => 'date',
        'due_date' => 'date',
        'next_billing_date' => 'date',
        'sent_at' => 'datetime',
        'paid_at' => 'datetime',
        'amount' => 'decimal:2',
        'is_recurring' => 'boolean'
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function packagePrice()
    {
        return $this->belongsTo(PackagePrice::class);
    }

    public function emailLogs()
    {
        return $this->hasMany(InvoiceEmailLog::class);
    }

    // Accessor methods for backward compatibility and easy access
    public function getServiceTypeAttribute()
    {
        return $this->packagePrice?->service_type;
    }

    public function getPackageAttribute()
    {
        return $this->packagePrice?->package;
    }

    public function getPackagePriceValueAttribute()
    {
        return $this->packagePrice?->price;
    }

    public function generateInvoiceNumber()
    {
        $year = date('Y');
        $month = date('m');
        $lastInvoice = self::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('id', 'desc')
            ->first();

        $sequence = $lastInvoice ? (int)substr($lastInvoice->invoice_number, -4) + 1 : 1;
        
        return 'INV-' . $year . $month . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    public function calculateNextBillingDate()
    {
        if (!$this->is_recurring) {
            return null;
        }

        $currentDate = $this->billing_date;
        
        if ($this->payment_period === '1st of every month') {
            return $currentDate->addMonth()->startOfMonth();
        } elseif ($this->payment_period === '15th of every month') {
            return $currentDate->addMonth()->day(15);
        }

        return null;
    }

     /**
     * Get formatted amount
     */
    public function getFormattedAmountAttribute(): string
    {
        return 'R' . number_format($this->amount, 2);
    }

    /**
     * Get days until due
     */
    public function getDaysUntilDueAttribute(): int
    {
        return $this->due_date->diffInDays(now(), false);
    }

    public function markAsSent()
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => now()
        ]);
    }

    public function markAsPaid()
    {
        $this->update([
            'status' => 'paid',
            'paid_at' => now()
        ]);
    }

    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
            ->whereIn('status', ['sent', 'pending']);
    }

    public function scopeDueToday($query)
    {
        return $query->whereDate('billing_date', today());
    }

    // Scope to filter by service type through package_prices relationship
    public function scopeByServiceType($query, $serviceType)
    {
        return $query->whereHas('packagePrice', function ($q) use ($serviceType) {
            $q->where('service_type', $serviceType);
        });
    }

    // Scope to filter by package through package_prices relationship
    public function scopeByPackage($query, $package)
    {
        return $query->whereHas('packagePrice', function ($q) use ($package) {
            $q->where('package', $package);
        });
    }
}