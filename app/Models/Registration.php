<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'registrations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'phone',
        'alternative_phone',
        'email',
        'location',
        'address',
        'service_type',
        'package',
        'installation_date',
        'payment_period',
        'deposit_payment',
        'how_did_you_know',
        'comments',
        'status',
        'processed_at',
        'images_uploaded',
        'images_required'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'installation_date' => 'date',
        'processed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'images_uploaded' => 'boolean',
        'images_required' => 'boolean'
    ];


    // ==================== Installations ====================

    /**
     * Get the images for the installation
     */
    public function images()
    {
        return $this->hasMany(InstallationImage::class);
    }

    /**
     * Check if installation has all required images
     */
    public function hasAllImages()
    {
        return $this->images()->count() >= 3;
    }

    /**
     * Get images count attribute
     */
    public function getImagesCountAttribute()
    {
        return $this->images()->count();
    }


        public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        // Add any sensitive fields here if needed
    ];

    /**
     * Boot the model and set default values
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            if (empty($registration->status)) {
                $registration->status = 'pending';
            }
        });

        static::updated(function ($registration) {
            if ($registration->isDirty('status') && $registration->status === 'processed') {
                app(\App\Services\InvoiceService::class)->createInitialInvoice($registration);
            }
        });
    }

    // ==================== ACCESSORS ====================

    /**
     * Get the full name attribute
     */
    public function getFullNameAttribute(): string
    {
        return $this->name . ' ' . $this->surname;
    }

    /**
     * Get formatted installation date
     */
    public function getFormattedInstallationDateAttribute(): string
    {
        return $this->installation_date ? $this->installation_date->format('d M Y') : '';
    }

    /**
     * Get days until installation
     */
    public function getDaysUntilInstallationAttribute(): int
    {
        if (!$this->installation_date) {
            return 0;
        }
        
        return max(0, now()->diffInDays($this->installation_date, false));
    }

    // ==================== MUTATORS ====================

    /**
     * Set the email attribute to lowercase
     */
    public function setEmailAttribute(string $value): void
    {
        $this->attributes['email'] = strtolower(trim($value));
    }

    /**
     * Set the phone attribute (remove spaces and special characters)
     */
    public function setPhoneAttribute(?string $value): void
    {
        $this->attributes['phone'] = $value ? preg_replace('/[^\d+]/', '', $value) : null;
    }

    /**
     * Set the alternative phone attribute
     */
    public function setAlternativePhoneAttribute(?string $value): void
    {
        $this->attributes['alternative_phone'] = $value ? preg_replace('/[^\d+]/', '', $value) : null;
    }

    // ==================== SCOPES ====================

    /**
     * Scope for installations with complete images
     */
    public function scopeWithCompleteImages($query)
    {
        return $query->whereHas('images', function($q) {
            $q->selectRaw('registration_id, COUNT(*) as images_count')
              ->groupBy('registration_id')
              ->havingRaw('COUNT(*) >= 3');
        });
    }

    /**
     * Scope for installations without complete images
     */
    public function scopeWithoutCompleteImages($query)
    {
        return $query->whereDoesntHave('images')
            ->orWhereHas('images', function($q) {
                $q->selectRaw('registration_id, COUNT(*) as images_count')
                  ->groupBy('registration_id')
                  ->havingRaw('COUNT(*) < 3');
            });
    }


    /**
     * Scope to filter by status
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get pending registrations
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get processed registrations
     */
    public function scopeProcessed($query)
    {
        return $query->where('status', 'processed');
    }

    /**
     * Scope to get registrations for today's installations
     */
    public function scopeTodayInstallations($query)
    {
        return $query->whereDate('installation_date', today());
    }

    /**
     * Scope to get upcoming installations
     */
    public function scopeUpcomingInstallations($query, int $days = 7)
    {
        return $query->whereBetween('installation_date', [
            today(),
            today()->addDays($days)
        ]);
    }

    /**
     * Scope to search by name or email
     */
    public function scopeSearch($query, string $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
              ->orWhere('surname', 'like', "%{$term}%")
              ->orWhere('email', 'like', "%{$term}%")
              ->orWhere('phone', 'like', "%{$term}%");
        });
    }

    /**
     * Scope to filter by service type
     */
    public function scopeByServiceType($query, string $serviceType)
    {
        return $query->where('service_type', $serviceType);
    }

    /**
     * Scope to filter by package
     */
    public function scopeByPackage($query, string $package)
    {
        return $query->where('package', $package);
    }

    // ==================== METHODS ====================

    /**
     * Mark registration as processed
     */
    public function markAsProcessed(): bool
    {
        return $this->update([
            'status' => 'processed',
            'processed_at' => now()
        ]);
    }

    /**
     * Check if installation date is overdue
     */
    public function isOverdue(): bool
    {
        return $this->installation_date && $this->installation_date->isPast() && $this->status === 'pending';
    }

    /**
     * Get contact information as array
     */
    public function getContactInfo(): array
    {
        return [
            'name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'alternative_phone' => $this->alternative_phone,
        ];
    }

    /**
     * Get service details as array
     */
    public function getServiceDetails(): array
    {
        return [
            'service_type' => $this->service_type,
            'package' => $this->package,
            'installation_date' => $this->formatted_installation_date,
            'payment_period' => $this->payment_period,
            'deposit_payment' => $this->deposit_payment,
        ];
    }

    // ==================== STATIC METHODS ====================

    /**
     * Get registration statistics
     */
    public static function getStats(): array
    {
        return [
            'total' => static::count(),
            'pending' => static::pending()->count(),
            'processed' => static::processed()->count(),
            'today_installations' => static::todayInstallations()->count(),
            'upcoming_installations' => static::upcomingInstallations()->count(),
            'overdue' => static::where('installation_date', '<', today())
                              ->where('status', 'pending')
                              ->count(),
        ];
    }

    /**
     * Get popular service types
     */
    public static function getPopularServiceTypes(): array
    {
        return static::selectRaw('service_type, COUNT(*) as count')
                    ->groupBy('service_type')
                    ->orderBy('count', 'desc')
                    ->pluck('count', 'service_type')
                    ->toArray();
    }

    /**
     * Get popular packages
     */
    public static function getPopularPackages(): array
    {
        return static::selectRaw('package, COUNT(*) as count')
                    ->groupBy('package')
                    ->orderBy('count', 'desc')
                    ->pluck('count', 'package')
                    ->toArray();
    }
}