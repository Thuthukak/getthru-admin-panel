<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackagePrice extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_type',
        'package',
        'description',
        'price',

    ];

    protected $casts = [
        'price' => 'decimal:2'
    ];

    public static function getPrice($serviceType, $package)
    {
        $packagePrice = self::where('service_type', $serviceType)
            ->where('package', $package)
            ->first();

        return $packagePrice ? $packagePrice->price : 0;
    }
}