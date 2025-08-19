<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallationImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'image_path',
        'image_type'
    ];

    protected $dates = [
        'uploaded_at'
    ];

    /**
     * Get the installation that owns the image
     */
    public function installation()
    {
        return $this->belongsTo(Registration::class, 'registration_id');
    }

    /**
     * Get the full URL for the image
     */
    public function getImageUrlAttribute()
    {
        return asset('storage/' . $this->image_path);
    }
}