<?php
namespace App\Http\Controllers;

use App\Mail\EstimateRequest;
use App\Models\Estimate;
use App\Models\EstimateService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
// validator
use Validator;
use Exception;

class EstimateController extends Controller
{

    /**
     * Get all estimates with their services for admin dashboard
     */
    public function index(Request $request)
    {
        try {
            $estimates = Estimate::with(['services.service'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($estimate) {
                    return [
                        'id' => $estimate->id,
                        'name' => $estimate->name,
                        'email' => $estimate->email,
                        'total_amount' => $estimate->total_amount,
                        'status' => $estimate->status,
                        'notes' => $estimate->notes,
                        'created_at' => $estimate->created_at->toISOString(),
                        'updated_at' => $estimate->updated_at->toISOString(),
                        'services' => $estimate->services->map(function ($estimateService) {
                            return [
                                'id' => $estimateService->service_id,
                                'name' => $estimateService->service->name ?? 'Unknown Service',
                                'price' => $estimateService->price,
                            ];
                        })
                    ];
                });

            return response()->json($estimates);
        } catch (Exception $e) {
            Log::error('Failed to fetch estimates', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to fetch estimates',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'selectedServices' => 'required|array|min:1',
            'selectedServices.*.id' => 'required|integer|exists:services,id',
            'totalEstimate' => 'required|numeric|min:0',
            'additionalDetails' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create estimate record
            $estimate = Estimate::create([
                'name' => $request->name,
                'email' => $request->email,
                'total_amount' => $request->totalEstimate,
                'notes' => $request->additionalDetails,
                'status' => 'pending', // Default status
            ]);

            // Store selected services
            foreach ($request->selectedServices as $service) {
                EstimateService::create([
                    'estimate_id' => $estimate->id,
                    'service_id' => $service['id'],
                    'price' => $service['price'],
                ]);
            }

            // Try to send email notification
            $emailSent = false;
            $emailError = null;
            
            try {
                Mail::to($request->email)
                    ->cc(config('mail.admin_address'))
                    ->bcc(config('mail.from.address'))
                    ->send(new EstimateRequest($estimate));
                    
                $emailSent = true;
                
                // Update estimate status to indicate email was sent
                $estimate->update(['status' => 'emailed']);
                
            } catch (Exception $mailException) {
                // Log the email error but don't fail the entire request
                Log::error('Failed to send estimate email', [
                    'estimate_id' => $estimate->id,
                    'email' => $request->email,
                    'error' => $mailException->getMessage()
                ]);
                
                $emailError = $mailException->getMessage();
                
                // Update estimate status to indicate email failed
                $estimate->update(['status' => 'email_failed']);
            }

            // Return success response with email status
            $response = [
                'message' => 'Estimate request received successfully',
                'estimate_id' => $estimate->id,
                'email_sent' => $emailSent
            ];

            // If email failed, inform the user
            if (!$emailSent) {
                $response['email_warning'] = 'Your request was saved, but we encountered an issue sending the confirmation email. We will contact you directly within 24 hours.';
            }

            return response()->json($response, 201);

        } catch (Exception $e) {
            // Log the general error
            Log::error('Failed to create estimate', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'An error occurred while processing your request. Please try again or contact us directly.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Update single estimate status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,emailed,email_failed,completed,cancelled'
        ]);

        try {
            $estimate = Estimate::findOrFail($id);
            $estimate->update([
                'status' => $request->status,
                'updated_at' => now()
            ]);

            return response()->json([
                'message' => 'Status updated successfully',
                'estimate' => $estimate
            ]);
        } catch (Exception $e) {
            Log::error('Failed to update estimate status', [
                'estimate_id' => $id,
                'status' => $request->status,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to update status',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Bulk update estimate statuses
     */
    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:estimates,id',
            'status' => 'required|in:pending,emailed,email_failed,completed,cancelled'
        ]);

        try {
            $updated = Estimate::whereIn('id', $request->ids)
                ->update([
                    'status' => $request->status,
                    'updated_at' => now()
                ]);

            return response()->json([
                'message' => "{$updated} estimates updated successfully",
                'updated_count' => $updated
            ]);
        } catch (Exception $e) {
            Log::error('Failed to bulk update estimate statuses', [
                'ids' => $request->ids,
                'status' => $request->status,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to bulk update statuses',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Resend email for a specific estimate
     */
    public function resendEmail(Request $request, $id)
    {
        try {
            $estimate = Estimate::with(['services.service'])->findOrFail($id);

            // Try to send email
            Mail::to($estimate->email)
                ->cc(config('mail.admin_address'))
                ->bcc(config('mail.from.address'))
                ->send(new EstimateRequest($estimate));

            // Update status to emailed 
                $estimate->update([
                    'status' => 'emailed',
                    'updated_at' => now()
                
            ]);

            return response()->json([
                'message' => 'Email sent successfully',
                'estimate' => $estimate
            ]);
        } catch (Exception $e) {
            Log::error('Failed to resend estimate email', [
                'estimate_id' => $id,
                'error' => $e->getMessage()
            ]);

            // Update status to email_failed
            $estimate = Estimate::find($id);
            if ($estimate) {
                $estimate->update([
                    'status' => 'email_failed',
                    'updated_at' => now()
                ]);
            }

            return response()->json([
                'message' => 'Failed to send email',
                'error' => config('app.debug') ? $e->getMessage() : 'Email delivery failed'
            ], 500);
        }
    }

    /**
     * Send bulk emails
     */
    public function bulkSendEmails(Request $request)
    {
        $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:estimates,id'
        ]);

        try {
            $estimates = Estimate::with(['services.service'])
                ->whereIn('id', $request->ids)
                ->get();

            $sent = 0;
            $failed = 0;
            $failedIds = [];

            foreach ($estimates as $estimate) {
                try {
                    Mail::to($estimate->email)
                        ->cc(config('mail.admin_address'))
                        ->bcc(config('mail.from.address'))
                        ->send(new EstimateRequest($estimate));

                    // Update status to emailed
                    $estimate->update([
                        'status' => 'emailed',
                        'updated_at' => now()
                    ]);

                    $sent++;
                } catch (Exception $e) {
                    Log::error('Failed to send bulk email', [
                        'estimate_id' => $estimate->id,
                        'email' => $estimate->email,
                        'error' => $e->getMessage()
                    ]);

                    // Update status to email_failed
                    $estimate->update([
                        'status' => 'email_failed',
                        'updated_at' => now()
                    ]);

                    $failed++;
                    $failedIds[] = $estimate->id;
                }
            }

            return response()->json([
                'message' => "Bulk email operation completed",
                'sent' => $sent,
                'failed' => $failed,
                'failed_ids' => $failedIds
            ]);
        } catch (Exception $e) {
            Log::error('Failed to process bulk emails', [
                'ids' => $request->ids,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to process bulk emails',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

     /**
     * Download PDF for estimate
     */
    public function downloadPDF(Request $request, $id)
    {
        try {
            $estimate = Estimate::with(['services.service'])->findOrFail($id);

            // Generate PDF using DomPDF
            $pdf = Pdf::loadView('estimates.pdf', compact('estimate'));

            // Return PDF as download
            return $pdf->download("estimate-{$id}.pdf");
        } catch (Exception $e) {
            Log::error('Failed to generate PDF', [
                'estimate_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to generate PDF',
                'error' => config('app.debug') ? $e->getMessage() : 'PDF generation failed'
            ], 500);
        }
    }

    /**
     * Delete an estimate
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $estimate = Estimate::findOrFail($id);

            // Delete related estimate services first
            EstimateService::where('estimate_id', $id)->delete();

            // Delete the estimate
            $estimate->delete();

            DB::commit();

            return response()->json([
                'message' => 'Estimate deleted successfully'
            ]);
        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Failed to delete estimate', [
                'estimate_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Failed to delete estimate',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    

}