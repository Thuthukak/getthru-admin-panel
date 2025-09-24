<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Registration;

class customer extends Model
{

    protected $table = 'customers';

    protected $fillable = [
        'name',
        'surname',
        'phone',
        'alternative_phone',
        'email',
        'location',
        'address',
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
