<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\InstallationImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class InstallationController extends Controller
{
    /**
     * Display a listing of installations with filters and pagination
     */
    public function index(Request $request): JsonResponse
    {
        $query = Registration::with('images'); // Load images relationship
        
        // Apply filters
        $this->applyFilters($query, $request);
        
        // Get paginated results
        $installations = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));
            
        // Add images_count to each installation
        $installations->getCollection()->transform(function ($installation) {
            $installation->images_count = $installation->images->count();
            $installation->images_uploaded = $installation->images_count >= 3;
            return $installation;
        });
        
        return response()->json($installations);
    }
    
    /**
     * Get unique service types for filter dropdown
     */
    public function getServiceTypes(): JsonResponse
    {
        $serviceTypes = Registration::distinct()
            ->whereNotNull('service_type')
            ->pluck('service_type')
            ->filter()
            ->sort()
            ->values();
            
        return response()->json($serviceTypes);
    }
    
    /**
     * Display the specified installation
     */
    public function show($id): JsonResponse
    {
        $installation = Registration::with('images')->findOrFail($id);
        $installation->images_count = $installation->images->count();
        $installation->images_uploaded = $installation->images_count >= 3;
        
        return response()->json($installation);
    }
    
    /**
     * Update the installation status
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,in_progress,processed,cancelled'
        ]);
        
        $installation = Registration::with('images')->findOrFail($id);
        
        // Check if trying to set to processed without images
        if ($request->status === 'processed') {
            $imagesCount = $installation->images->count();
            if ($imagesCount < 3) {
                return response()->json([
                    'message' => 'Cannot mark as processed. Installation requires 3 images to be uploaded.',
                    'images_required' => 3,
                    'images_uploaded' => $imagesCount
                ], 422);
            }
        }
        
        $oldStatus = $installation->status;
        $installation->status = $request->status;
        
        // Update processed_at timestamp when status changes to processed
        if ($request->status === 'processed' && $oldStatus !== 'processed') {
            $installation->processed_at = Carbon::now();
        }
        
        $installation->save();
        
        return response()->json([
            'message' => 'Status updated successfully',
            'installation' => $installation
        ]);
    }
    
    /**
     * Upload installation images
     */
    public function uploadImages(Request $request, $id): JsonResponse
    {
        $request->validate([
            'images' => 'required|array|size:3',
            'images.before' => 'required|image|mimes:jpeg,jpg,png,webp|max:5120',
            'images.during' => 'required|image|mimes:jpeg,jpg,png,webp|max:5120', 
            'images.after' => 'required|image|mimes:jpeg,jpg,png,webp|max:5120',
        ]);
        
        $installation = Registration::findOrFail($id);
        
        // Delete existing images for this installation
        InstallationImage::where('registration_id', $id)->delete();
        
        $uploadedImages = [];
        $allowedTypes = ['before', 'during', 'after'];
        
        foreach ($allowedTypes as $type) {
            if ($request->hasFile("images.{$type}")) {
                $file = $request->file("images.{$type}");
                
                // Generate unique filename
                $filename = $installation->id . '_' . $type . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                // Store file
                $path = $file->storeAs('installation-images', $filename, 'public');
                
                // Create database record
                $image = InstallationImage::create([
                    'registration_id' => $installation->id,
                    'image_path' => $path,
                    'image_type' => $type,
                ]);
                
                $uploadedImages[] = $image;
            }
        }
        
        // Update installation images_uploaded status
        $installation->images_uploaded = true;
        $installation->save();
        
        return response()->json([
            'message' => 'Images uploaded successfully',
            'images' => $uploadedImages
        ]);
    }
    
    /**
     * Get installation images
     */
    public function getImages($id): JsonResponse
    {
        $installation = Registration::findOrFail($id);
        $images = InstallationImage::where('registration_id', $id)
            ->orderBy('image_type')
            ->get();
            
        return response()->json($images);
    }
    
    /**
     * Delete a specific installation image
     */
    public function deleteImage($id, $imageId): JsonResponse
    {
        $installation = Registration::findOrFail($id);
        $image = InstallationImage::where('registration_id', $id)
            ->where('id', $imageId)
            ->firstOrFail();
            
        // Delete file from storage
        Storage::disk('public')->delete($image->image_path);
        
        // Delete database record
        $image->delete();
        
        // Check if we still have enough images
        $remainingImages = InstallationImage::where('registration_id', $id)->count();
        
        // Update installation status if needed
        if ($remainingImages < 3) {
            $installation->images_uploaded = false;
            // If status was processed, revert to in_progress
            if ($installation->status === 'processed') {
                $installation->status = 'in_progress';
            }
            $installation->save();
        }
        
        return response()->json([
            'message' => 'Image deleted successfully',
            'remaining_images' => $remainingImages
        ]);
    }
    
    /**
     * Update the specified installation
     */
    public function update(Request $request, $id): JsonResponse
    {
        $installation = Registration::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'surname' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'alternative_phone' => 'sometimes|nullable|string|max:20',
            'email' => 'sometimes|email|max:255',
            'location' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:500',
            'service_type' => 'sometimes|string|max:100',
            'package' => 'sometimes|string|max:100',
            'installation_date' => 'sometimes|date',
            'payment_period' => 'sometimes|string|max:50',
            'deposit_payment' => 'sometimes|numeric',
            'how_did_you_know' => 'sometimes|string|max:255',
            'comments' => 'sometimes|nullable|string|max:1000',
            'status' => 'sometimes|string|in:pending,confirmed,in_progress,processed,cancelled'
        ]);
        
        // Check status change validation
        if (isset($validated['status']) && $validated['status'] === 'processed') {
            $imagesCount = InstallationImage::where('registration_id', $id)->count();
            if ($imagesCount < 3) {
                return response()->json([
                    'message' => 'Cannot mark as processed without 3 installation images.',
                    'images_required' => 3,
                    'images_uploaded' => $imagesCount
                ], 422);
            }
        }
        
        $installation->update($validated);
        
        return response()->json([
            'message' => 'Installation updated successfully',
            'installation' => $installation->load('images')
        ]);
    }
    
    /**
     * Remove the specified installation (soft delete)
     */
    public function destroy($id): JsonResponse
    {
        $installation = Registration::findOrFail($id);
        
        // Delete associated images from storage
        $images = InstallationImage::where('registration_id', $id)->get();
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        
        // Delete image records
        InstallationImage::where('registration_id', $id)->delete();
        
        // Soft delete installation
        $installation->delete();
        
        return response()->json([
            'message' => 'Installation deleted successfully'
        ]);
    }
    
    /**
     * Restore a soft deleted installation
     */
    public function restore($id): JsonResponse
    {
        $installation = Registration::withTrashed()->findOrFail($id);
        $installation->restore();
        
        return response()->json([
            'message' => 'Installation restored successfully',
            'installation' => $installation
        ]);
    }
    
    /**
     * Get installation statistics
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Registration::count(),
            'pending' => Registration::where('status', 'pending')->count(),
            'confirmed' => Registration::where('status', 'confirmed')->count(),
            'in_progress' => Registration::where('status', 'in_progress')->count(),
            'processed' => Registration::where('status', 'processed')->count(),
            'cancelled' => Registration::where('status', 'cancelled')->count(),
            'with_images' => Registration::whereHas('images', function($query) {
                $query->havingRaw('COUNT(*) >= 3');
            })->count(),
            'without_images' => Registration::whereDoesntHave('images')
                ->orWhereHas('images', function($query) {
                    $query->havingRaw('COUNT(*) < 3');
                })->count(),
            'this_month' => Registration::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count(),
            'today' => Registration::whereDate('created_at', Carbon::today())->count()
        ];
        
        return response()->json($stats);
    }
    
    /**
     * Apply filters to the query
     */
    private function applyFilters(Builder $query, Request $request): void
    {
        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Service type filter
        if ($request->filled('service_type')) {
            $query->where('service_type', $request->service_type);
        }
        
        // Date range filter
        if ($request->filled('date_from')) {
            $query->whereDate('installation_date', '>=', $request->date_from);
        }
        
        if ($request->filled('date_to')) {
            $query->whereDate('installation_date', '<=', $request->date_to);
        }
        
        // Search filter (searches in name, surname, email, phone)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('surname', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('alternative_phone', 'like', "%{$search}%");
            });
        }
        
        // Images filter (if needed)
        if ($request->filled('has_images')) {
            if ($request->has_images === 'yes') {
                $query->whereHas('images', function($q) {
                    $q->havingRaw('COUNT(*) >= 3');
                });
            } elseif ($request->has_images === 'no') {
                $query->whereDoesntHave('images')
                    ->orWhereHas('images', function($q) {
                        $q->havingRaw('COUNT(*) < 3');
                    });
            }
        }
        
        // Location filter (if needed)
        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }
        
        // Package filter (if needed)
        if ($request->filled('package')) {
            $query->where('package', $request->package);
        }
    }
}