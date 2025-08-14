<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Barber;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['service', 'client'])
        ->whereIn('status', ['queued', 'in-progress'])
        ->orderBy('created_at')
        ->get();

    $currentTime = Carbon::now();
    $totalTime = 0;
    $timePassed = 0;

    // Find the in-progress booking
    $inProgressBooking = $bookings->firstWhere('status', 'in-progress');

    if ($inProgressBooking && $inProgressBooking->start_time) {
        $timePassed = $currentTime->diffInMinutes(Carbon::parse($inProgressBooking->start_time));
    }

    $remainingTimeForCurrent = 0;

    // Adjust queue time dynamically
    $bookings->transform(function ($booking) use (&$totalTime, $timePassed, &$remainingTimeForCurrent) {
        $serviceDuration = $booking->service->duration ?? 0;

        if ($booking->status === 'in-progress') {
            $remainingTimeForCurrent = max(0, $serviceDuration - $timePassed);
            $totalTime += $remainingTimeForCurrent;
        } else {
            $totalTime += $serviceDuration;
        }

        $booking->timeRemaining = max(0, $totalTime - $timePassed);
        $booking->client_name = $booking->client->name ?? 'Unknown';

        return $booking;
    });

    return response()->json($bookings);
    }


    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:20',
            'email' => 'required|email|unique:clients,email',
            'service_id' => 'required|exists:services,id',
            'barber_id' => 'required|exists:barbers,id',
        ]);

        // Create the client (or find existing one by email)
        $client = Client::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'phoneNumber' => $request->phoneNumber,
            ]
        );

        // Generate a unique reference code
        $reference = '#' . now()->format('dm') . '-' . Str::random(4);

        // Create the booking
        $booking = Booking::create([
            'client_id' => $client->id,
            'reference' => $reference,
            'service_id' => $request->service_id,
            'barber_id' => $request->barber_id,
            'status' => 'queued',
            'skipCount' => 0,
        ]);

        return response()->json([
            'message' => 'Booking successfully created!',
            'booking' => $booking,
        ], 201);
    }


    //admin

    public function adminBookings()
    {
        return view ('admin.bookings');
    }

    public function adminBookingsData()
    {
        $bookings = Booking::with([
            'client',
            'barber.user', // Include the user relationship within barber
            'service'
        ])->get();
    
        // Transform data to include the barber's name
        $bookings->transform(function ($booking) {
            return [
                'id' => $booking->id,
                'reference' => $booking->reference,
                'client' => [
                    'id' => $booking->client->id,
                    'name' => $booking->client->name,
                ],
                'barber' => [
                    'id' => $booking->barber->id,
                    'name' => $booking->barber->user->name ?? 'N/A', // Get barber's name from users table
                ],
                'service' => [
                    'id' => $booking->service->id,
                    'name' => $booking->service->name,
                    'duration' => $booking->service->duration,
                    'price' => $booking->service->price,
                ],
                'date' => $booking->date,
                'status' => $booking->status,
            ];
        });
    
        return response()->json($bookings);
    }
    
}
