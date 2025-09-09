<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\PackagePrice;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PackagePriceController extends Controller
{
    /**
     * Display a listing of package prices.
     */
    public function index(): JsonResponse
    {
        $packages = PackagePrice::orderBy('service_type')
            ->orderBy('package')
            ->select('id', 'service_type', 'package', 'description', 'price')
            ->get();
       
        return response()->json($packages);
    }

    /**
     * Store a newly created package price.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_type' => 'required|string|max:255',
            'package' => [
                'required',
                'string',
                'max:255',
                Rule::unique('package_prices')->where(function ($query) use ($request) {
                    return $query->where('service_type', $request->service_type);
                })
            ],
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0|max:99999999.99'
        ]);

        $package = PackagePrice::create($validated);
       
        return response()->json($package, 201);
    }

    /**
     * Display the specified package price.
     */
    public function show(PackagePrice $packagePrice): JsonResponse
    {
        return response()->json($packagePrice);
    }

    /**
     * Update the specified package price.
     */
    public function update(Request $request, PackagePrice $packagePrice): JsonResponse
    {
        $validated = $request->validate([
            'service_type' => 'required|string|max:255',
            'package' => [
                'required',
                'string',
                'max:255',
                Rule::unique('package_prices')->where(function ($query) use ($request) {
                    return $query->where('service_type', $request->service_type);
                })->ignore($packagePrice->id)
            ],
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0|max:99999999.99'
        ]);

        $packagePrice->update($validated);
       
        return response()->json($packagePrice);
    }

    /**
     * Remove the specified package price.
     */
    public function destroy(PackagePrice $packagePrice): JsonResponse
    {
        $packagePrice->delete();
       
        return response()->json(['message' => 'Package deleted successfully']);
    }

    /**
     * Get unique service types for dropdown.
     */
    public function getServiceTypes(): JsonResponse
    {
        $serviceTypes = PackagePrice::distinct()
            ->pluck('service_type')
            ->sort()
            ->values();
           
        return response()->json($serviceTypes);
    }
}