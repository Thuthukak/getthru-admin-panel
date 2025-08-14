<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barber;
use App\Models\User;

class BarberController extends Controller
{
    public function index()
    {
        // find barber in barbeers table by user_id and return their name from users table in json
        return response()->json(Barber::with('user')->get());
    }
}
