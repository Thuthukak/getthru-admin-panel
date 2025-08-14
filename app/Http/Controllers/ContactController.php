<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Log;


class ContactController extends Controller
{
    public function contactForm(Request $request)
{
    Log::info('in contact form method');

    $validated = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'subject' => 'required',
        'message' => 'required',
    ]);

    Log::info('data', $validated);

    Contact::create($validated);

    Log::info('contact created sucessfully');

    return response()->json([
        'message' => 'Message sent successfully',
    ], 201);
}

}
