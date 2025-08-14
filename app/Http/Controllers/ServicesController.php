<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\Service;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ServicesController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Service::query();

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $query->search($request->search);
            }

            // Filter by status
            if ($request->has('status') && in_array($request->status, ['active', 'inactive'])) {
                $query->where('is_active', $request->status === 'active');
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            
            if (in_array($sortBy, ['name', 'base_price', 'created_at', 'updated_at'])) {
                $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
            }

            // Pagination or get all
            if ($request->has('per_page')) {
                $services = $query->paginate($request->get('per_page', 15));
            } else {
                $services = $query->get();
            }

            return response()->json($services);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching services',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function indexWebDesign()
    {
        $seoData = $this->mergeSeoData([
        // Override specific SEO data for this page
        'title' => 'Professional Web Design Services',
        'description' => 'We specialize in web design and development services, creating visually stunning and functional websites for businesses and organizations.',
        'keywords' => 'web design, website development, responsive design, user-friendly websites',
        'og_title' => 'Professional Web Design Services',
        'canonical_url' => url('/services/web-design'),
        'sec_img' => asset('assets/images/homepage-seen-computer-screen.jpg'),

        ]);

        return Inertia::render('Services/WebDesign', [
            'seo' => $seoData
        ])->with('seo', $seoData);
    }

    public function indexGraphicDesign()
    {
        $seoData = $this->mergeSeoData([
        // Override specific SEO data for this page
        'title' => 'Professional Graphic Design Services',
        'description' => 'We specialize in graphic design services, creating visually stunning and engaging designs for businesses and organizations.',
        'keywords' => 'graphic design, branding, logo design, user-friendly websites',
        'og_title' => 'Professional Graphic Design Services',
        'canonical_url' => url('/services/graphic-design'),
        'sec_img' => asset('assets/images/color-bulb.jpg'),

        ]);

        return Inertia::render('Services/GraphicDesign', [
            'seo' => $seoData
        ])->with('seo', $seoData);
    }


   public function indexProductDesign()
    {
        $seoData = $this->mergeSeoData([

        // Override specific SEO data for this page
        'title' => 'Product Design Services',
        'description' => 'Transform your ideas into impactful products with Penda Graphics. We specialize in product label design, mockups, color palettes, and brand-aligned packaging solutions.',
        'keywords' => 'product design, packaging design, label design, product mockups, brand packaging, color palette design, graphic design South Africa',
        'og_title' => 'Professional Product Design – Labels, Mockups & Packaging',
        'og_description' => 'From concept to shelf, Penda Graphics delivers stunning product visuals that connect with your audience.',
        'canonical_url' => url('/services/product-design'),
        'sec_img' => asset('assets/images/product_design.png'),

        ]);

        return Inertia::render('Services/ProductDesign', [
            'seo' => $seoData
        ]);
    }

    public function indexIdentityDesign()
    {
        $seoData = $this->mergeSeoData([

        // Override specific SEO data for this page
        'title' => 'Identity Design & Branding Services',
        'description' => 'Build a consistent and professional brand identity with Penda Graphics. We offer logo design, business cards, letterheads, and branded stationery to define your visual identity.',
        'keywords' => 'identity design, brand identity, logo design, business card design, letterhead design, brand stationery, branding South Africa',
        'og_title' => 'Professional Identity Design – Logo, Stationery & Brand Assets',
        'og_description' => 'Craft a cohesive visual identity with Penda Graphics. From logos to business cards, we make your brand unforgettable.',
        'canonical_url' => url('/services/identity-design'),
        'sec_img' => asset('assets/images/Digital-Marketing-Agency.jpg'),

        ]);

        return Inertia::render('Services/IdentityDesign', [
            'seo' => $seoData
        ]);
    }


   public function indexECommerce()
    {
        $seoData = $this->mergeSeoData([

        // Override specific SEO data for this page
        'title' => 'E-Commerce Website Design & Development',
        'description' => 'Launch your online store with Penda Graphics. We create custom e-commerce websites that are secure, scalable, and designed to convert visitors into customers.',
        'keywords' => 'e-commerce website, online store design, e-commerce development, online shop South Africa, Laravel e-commerce, sell online, secure checkout, mobile commerce',
        'og_title' => 'Sell Online with a Powerful E-Commerce Website',
        'og_description' => 'From custom-built online stores to mobile-friendly e-commerce platforms, Penda Graphics helps your business grow online.',
        'canonical_url' => url('/services/e-commerce'),
        'sec_img' => asset('assets/images/ecommerce-mcommerce.webp'),

        ]);

        return Inertia::render('Services/ECommerce', [
            'seo' => $seoData
        ]);
    }


    public function indexDigitalMarketing()
    {
        $seoData = $this->mergeSeoData([

        // Override specific SEO data for this page
        'title' => 'Digital Marketing Services',
        'description' => 'Grow your brand online with Penda Graphics. We offer SEO, social media marketing, email campaigns, and targeted digital strategies to increase your visibility and drive results.',
        'keywords' => 'digital marketing, SEO South Africa, social media marketing, email marketing, online advertising, content marketing, brand awareness, digital campaigns',
        'og_title' => 'Results-Driven Digital Marketing Solutions',
        'og_description' => 'Boost your online presence with expert SEO, social media, and email marketing services tailored for business growth.',
        'canonical_url' => url('/services/digital-marketing'),
        'sec_img' => asset('assets/images/Digital-Marketing-Agency.jpg'),

        ]);

        return Inertia::render('Services/DigitalMarketing', [
            'seo' => $seoData
        ]);
    }

/**
 * Store a newly created service.
 */
public function store(Request $request)
{
    Log::info('we are in the store method', ['request_data' => $request->all()]);
    
    try {
        // Convert string boolean to actual boolean before validation
        $requestData = $request->all();
        if (isset($requestData['is_active'])) {
            $requestData['is_active'] = filter_var($requestData['is_active'], FILTER_VALIDATE_BOOLEAN);
        }
        
        $validatedData = Validator::make($requestData, [
            'name' => 'required|string|max:255|unique:services,name',
            'description' => 'required|string|max:1000',
            'base_price' => 'required|numeric|min:0|max:999999.99',
            'is_active' => 'required|boolean',
        ])->validate();

        Log::info('validatedData', $validatedData);

        $service = Service::create($validatedData);

        Log::info('Service created', ['service' => $service->toArray()]);

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);

    } catch (ValidationException $e) {
        Log::error('Validation failed', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        Log::error('Error creating service', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Error creating service',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Store custom service.
 */

public function storeCustomService(Request $request)
{
    Log::info('we are in the store custom service method', ['request_data' => $request->all()]);
    
    try {

        $validatedData = Validator::make($requestData, [
            'name' => 'required|string|max:255|unique:services,name',
            'description' => 'required|string|max:1000',
            'base_price' => 'required|numeric|min:0|max:999999.99',
            'is_active' => 'required|boolean',
        ])->validate();

        Log::info('validatedData', $validatedData);

        $service = Service::create($validatedData);

        Log::info('Service created', ['service' => $service->toArray()]);

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);

    } catch (ValidationException $e) {
        Log::error('Validation failed', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        Log::error('Error creating service', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Error creating service',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Display the specified service.
 */
public function show(Service $service)
{
    try {
        return response()->json($service);

    } catch (\Exception $e) {
        Log::error('Error fetching service', ['error' => $e->getMessage()]);
        return response()->json([
            'message' => 'Error fetching service',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Update the specified service.
 */
public function update(Request $request, Service $service)
{
    Log::info('Updating service', ['service_id' => $service->id, 'request_data' => $request->all()]);
    
    try {
        // Convert string boolean to actual boolean before validation
        $requestData = $request->all();
        if (isset($requestData['is_active'])) {
            $requestData['is_active'] = filter_var($requestData['is_active'], FILTER_VALIDATE_BOOLEAN);
        }
        
        $validatedData = Validator::make($requestData, [
            'name' => 'required|string|max:255|unique:services,name,' . $service->id,
            'description' => 'required|string|max:1000',
            'base_price' => 'required|numeric|min:0|max:999999.99',
            'is_active' => 'required|boolean',
        ])->validate();

        Log::info('Update validation passed', $validatedData);

        $service->update($validatedData);

        Log::info('Service updated successfully', ['service' => $service->fresh()->toArray()]);

        return response()->json([
            'message' => 'Service updated successfully',
            'service' => $service->fresh()
        ]);

    } catch (ValidationException $e) {
        Log::error('Update validation failed', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        Log::error('Error updating service', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Error updating service',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Remove the specified service.
 */
public function destroy(Service $service)
{
    try {
        // Optional: Check if service is being used before deletion
        // You might want to add relationships checks here
        
        Log::info('Deleting service', ['service_id' => $service->id]);
        
        $service->delete();

        Log::info('Service deleted successfully', ['service_id' => $service->id]);

        return response()->json([
            'message' => 'Service deleted successfully'
        ]);

    } catch (\Exception $e) {
        Log::error('Error deleting service', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Error deleting service',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Toggle service active status.
 */
public function toggleStatus(Service $service)
{
    try {
        $oldStatus = $service->is_active;
        
        $service->update([
            'is_active' => !$service->is_active
        ]);

        Log::info('Service status toggled', [
            'service_id' => $service->id,
            'old_status' => $oldStatus,
            'new_status' => $service->fresh()->is_active
        ]);

        return response()->json([
            'message' => 'Service status updated successfully',
            'service' => $service->fresh()
        ]);

    } catch (\Exception $e) {
        Log::error('Error updating service status', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Error updating service status',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Get services formatted for select dropdown
     */
    public function forSelect(Request $request): JsonResponse
    {
        $services = Service::active()
            ->select('id', 'name', 'description', 'base_price')
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'value' => $service->id,
                    'label' => $service->name,
                    'description' => $service->description,
                    'base_price' => $service->base_price,
                    'formatted_price' => $service->formatted_base_price,
                ];
            });

        return response()->json($services);
    }
}


