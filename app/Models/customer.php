<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
