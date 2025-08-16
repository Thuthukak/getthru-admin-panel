<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class InstallationController extends Controller
{
    /**
     * Display a listing of installations with filters and pagination
     */
    public function index(Request $request): JsonResponse
    {
        $query = Registration::query();
        
        // Apply filters
        $this->applyFilters($query, $request);
        
        // Get paginated results
        $installations = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));
        
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
        $installation = Registration::findOrFail($id);
        return response()->json($installation);
    }
    
    /**
     * Update the installation status
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,in_progress,completed,cancelled'
        ]);
        
        $installation = Registration::findOrFail($id);
        
        $oldStatus = $installation->status;
        $installation->status = $request->status;
        
        // Update processed_at timestamp when status changes to completed
        if ($request->status === 'completed' && $oldStatus !== 'completed') {
            $installation->processed_at = Carbon::now();
        }
        
        $installation->save();
        
        return response()->json([
            'message' => 'Status updated successfully',
            'installation' => $installation
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
            'status' => 'sometimes|string|in:pending,confirmed,in_progress,completed,cancelled'
        ]);
        
        $installation->update($validated);
        
        return response()->json([
            'message' => 'Installation updated successfully',
            'installation' => $installation
        ]);
    }
    
    /**
     * Remove the specified installation (soft delete)
     */
    public function destroy($id): JsonResponse
    {
        $installation = Registration::findOrFail($id);
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
            'completed' => Registration::where('status', 'completed')->count(),
            'cancelled' => Registration::where('status', 'cancelled')->count(),
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