<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $email = $request->input('email');
        $newsletter = new Newsletter();
        $newsletter->email = $email;
        $newsletter->save();
        return response()->json(['message' => 'Subscribed successfully']);
    }
}
