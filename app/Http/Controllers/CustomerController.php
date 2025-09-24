<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function (Builder $q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('surname', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Individual field filters
        if ($request->has('name') && $request->name) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        if ($request->has('email') && $request->email) {
            $query->where('email', 'like', "%{$request->email}%");
        }

        // Date range filters
        if ($request->has('created_from') && $request->created_from) {
            $query->whereDate('created_at', '>=', $request->created_from);
        }

        if ($request->has('created_to') && $request->created_to) {
            $query->whereDate('created_at', '<=', $request->created_to);
        }

        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        $allowedSortFields = ['id', 'name', 'surname', 'email', 'phone', 'location', 'created_at', 'updated_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $perPage = min($perPage, 100); // Max 100 items per page

        $customers = $query->paginate($perPage);

        return response()->json([
            'data' => $customers->items(),
            'current_page' => $customers->currentPage(),
            'last_page' => $customers->lastPage(),
            'per_page' => $customers->perPage(),
            'total' => $customers->total(),
            'from' => $customers->firstItem(),
            'to' => $customers->lastItem(),
        ]);
    }

    public function store(Request $request)
    {
        Log::info('we are in the customer store method' . $request);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|string|max:255|unique:customers',
            'alternative_phone' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers',
            'location' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        Log::info('validated data' . $validated);

        $customer = Customer::create($validated);
        
        return response()->json([
            'message' => 'Customer created successfully',
            'data' => $customer
        ], 201);
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json(['data' => $customer]);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => [
                'required',
                'string',
                'max:255',
                Rule::unique('customers')->ignore($customer->id)
            ],
            'alternative_phone' => 'nullable|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('customers')->ignore($customer->id)
            ],
            'location' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        $customer->update($validated);
        
        return response()->json([
            'message' => 'Customer updated successfully',
            'data' => $customer
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        
        return response()->json([
            'message' => 'Customer deleted successfully'
        ], 204);
    }

    // Additional utility endpoints
    public function locations()
    {
        Log::info('we are in the locations method');
        $locations = Customer::distinct()->pluck('location')->filter()->sort()->values();
        return response()->json(['data' => $locations]);
    }

    public function stats()
    {
        $stats = [
            'total_customers' => Customer::count(),
            'customers_this_month' => Customer::whereMonth('created_at', now()->month)
                                           ->whereYear('created_at', now()->year)
                                           ->count(),
            'customers_this_week' => Customer::whereBetween('created_at', [
                now()->startOfWeek(),
                now()->endOfWeek()
            ])->count(),
            'top_locations' => Customer::groupBy('location')
                                     ->selectRaw('location, count(*) as count')
                                     ->orderBy('count', 'desc')
                                     ->limit(5)
                                     ->get(),
        ];

        return response()->json(['data' => $stats]);
    }
}