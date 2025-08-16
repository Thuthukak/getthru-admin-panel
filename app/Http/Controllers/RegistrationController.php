<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Registration;
use Carbon\Carbon;

class RegistrationController extends Controller
{
    /**
     * Store a new registration form submission
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        Log::info('we are in the store method', ['request_data' => $request->all()]);
        try {
            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'alternativePhone' => 'nullable|string|max:20',
                'email' => 'required|email|max:255',
                'location' => 'required|string|max:255',
                'otherLocation' => 'nullable|string|max:255|required_if:location,Other',
                'address' => 'required|string|max:500',
                'serviceType' => 'required|string|max:255',
                'package' => 'required|string|max:255',
                'installationDate' => 'required|date|after_or_equal:today',
                'paymentPeriod' => 'required|string|max:255',
                'depositPayment' => 'required|string|max:255',
                'howDidYouKnow' => 'nullable|string|max:255',
                'otherKnow' => 'nullable|string|max:255|required_if:howDidYouKnow,other',
                'comments' => 'nullable|string|max:1000',
            ]);

            // Return validation errors if any
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get validated data
            $validatedData = $validator->validated();

            // Create registration using Eloquent model
            $registration = Registration::create([
                'name' => $validatedData['name'],
                'surname' => $validatedData['surname'],
                'phone' => $validatedData['phone'],
                'alternative_phone' => $validatedData['alternativePhone'],
                'email' => $validatedData['email'],
                'location' => $validatedData['location'] === 'Other' ? $validatedData['otherLocation'] : $validatedData['location'],
                'address' => $validatedData['address'],
                'service_type' => $validatedData['serviceType'],
                'package' => $validatedData['package'],
                'installation_date' => $validatedData['installationDate'],
                'payment_period' => $validatedData['paymentPeriod'],
                'deposit_payment' => $validatedData['depositPayment'],
                'how_did_you_know' => $validatedData['howDidYouKnow'] === 'other' ? $validatedData['otherKnow'] : $validatedData['howDidYouKnow'],
                'comments' => $validatedData['comments'],
            ]);

            // Log successful submission
            Log::info('Registration form submitted', [
                'registration_id' => $registration->id,
                'email' => $registration->email,
                'name' => $registration->full_name
            ]);

            // You can add additional logic here such as:
            // - Send confirmation email to customer
            // - Send notification email to admin
            // - Queue background jobs for processing
            // - Integrate with CRM systems

            return response()->json([
                'success' => true,
                'message' => 'Registration submitted successfully',
                'registration_id' => $registration->id,
                'data' => [
                    'full_name' => $registration->full_name,
                    'email' => $registration->email,
                    'installation_date' => $registration->formatted_installation_date
                ]
            ], 201);

        } catch (\Exception $e) {
            // Log the error
            Log::error('Registration form submission failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request'
            ], 500);
        }
    }
}