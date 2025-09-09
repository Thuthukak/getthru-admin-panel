<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\PasswordResetController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\BarberController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\InstallationController;
use App\Http\Controllers\PackagePriceController;
use App\Http\Controllers\CustomerController;
use Inertia\Inertia;


// Admin Authentication Routes
Route::prefix('admin')->group(function () {
    // Guest Middleware (only for login & register pages)
    Route::middleware('guest')->group(function () {
       
        Route::get('/auth', [HomeController::class, 'AdminAuth'])->name('admin.auth');
    });
    
    // Authenticated Middleware (for authenticated admin actions)
    Route::middleware('auth')->group(function () {
        Route::get('/{any}', function () { return view('admin.dashboard'); })->where('any', '.*');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::patch('/profile', [ProfileController::class, 'update']);
        Route::post('/profile/picture', [ProfileController::class, 'uploadPicture']);
        Route::delete('/profile/picture', [ProfileController::class, 'removePicture']);
        Route::delete('/profile', [ProfileController::class, 'destroy']);
    });
        Route::prefix('api')->group(function () {
            Route::get('/get/profile-data', [ProfileController::class, 'profileData'])->name('profile.data');
            Route::get('/profile/data', [ProfileController::class, 'show'])->name('profile.data');
        });
});

//Auth and Non-authenticated users
    Route::get('/', [HomeController::class, 'Home'])->name('home');

    Route::prefix('services')->group(function () {
        Route::get('/web-design', [ServicesController::class, 'indexWebDesign'])->name('web-design.index');
        Route::get('/graphic-design', [ServicesController::class, 'indexGraphicDesign'])->name('graphic-design.index');
        Route::get('/product-design', [ServicesController::class, 'indexProductDesign'])->name('product-design.index');
        Route::get('/identity-design', [ServicesController::class, 'indexIdentityDesign'])->name('identity-design.index');
        Route::get('/e-commerce', [ServicesController::class, 'indexECommerce'])->name('e-commerce.index');
        Route::get('/digital-marketing', [ServicesController::class, 'indexDigitalMarketing'])->name('digital-marketing.index');
        
    });

    Route::post('/contact-form', [ContactController::class, 'contactForm'])->name('contact.form');
    Route::get('/faq', [HomeController::class, 'FaqIndex'])->name('faq.index');
    Route::get('/about-us', [HomeController::class, 'AboutUsIndex'])->name('about-us.index');
    Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');
    Route::get('/contact-us', [HomeController::class, 'ContactIndex'])->name('contact.index');
   
    Route::get('/reg-form', [HomeController::class, 'RegFormIndex'])->name('reg-form.index');

// API Routes (Public API)
Route::prefix('api')->group(function () {
     Route::get('/profile/data', [ProfileController::class, 'show'])->name('profile.data');

    Route::get('/services', [ServicesController::class, 'index'])->name('getServices');
    Route::post('/services', [ServicesController::class, 'store']);
    Route::post('/services/custom', [ServicesController::class, 'storeCustomService']);
    Route::get('/services/{service}', [ServicesController::class, 'show']);
    Route::put('/services/{service}', [ServicesController::class, 'update']);
    Route::delete('/services/{service}', [ServicesController::class, 'destroy']);
     // Additional utility routes
    Route::patch('/services/{service}/toggle-status', [ServicesController::class, 'toggleStatus']);
    Route::get('services/select', [ServicesController::class, 'forSelect']);
    Route::get('/services-active', [ServicesController::class, 'getActiveServices']);
    Route::get('/estimates', [EstimateController::class, 'index'])->name('estimates.show');
    Route::post('/estimates', [EstimateController::class, 'store'])->name('estimates.store');
    Route::put('estimates/{id}/status', [EstimateController::class, 'updateStatus']);
    Route::put('estimates/bulk-status', [EstimateController::class, 'bulkUpdateStatus']);
    Route::post('estimates/{id}/resend-email', [EstimateController::class, 'resendEmail']);
    Route::post('estimates/bulk-email', [EstimateController::class, 'bulkSendEmails']);
    Route::get('estimates/{id}/pdf', [EstimateController::class, 'downloadPDF']);
    Route::delete('estimates/{id}', [EstimateController::class, 'destroy']);

    //registration form
    Route::post('/reg-form-submit', [RegistrationController::class, 'store'])->name('reg-form.submit');
    Route::get('/packages/{serviceType}', [RegistrationController::class, 'getPackages']);
    Route::get('/service-types', [RegistrationController::class, 'getServiceTypes']);

    //installations
    Route::get('/installations', [InstallationController::class, 'index'])->name('installations.show');
    Route::get('/installations/service-types', [InstallationController::class, 'getServiceTypes']);
    Route::get('/installations/stats', [InstallationController::class, 'stats']);
    Route::get('/installations/{id}', [InstallationController::class, 'show']);
    Route::patch('/installations/{id}/status', [InstallationController::class, 'updateStatus']);
    Route::put('/installations/{id}', [InstallationController::class, 'update']);
    Route::delete('/installations/{id}', [InstallationController::class, 'destroy']);
    Route::post('/installations/{id}/restore', [InstallationController::class, 'restore']);
    Route::post('/installations/{id}/images', [InstallationController::class, 'uploadImages']);
    Route::get('/installations/{id}/images', [InstallationController::class, 'getImages']);
    Route::delete('/installations/{id}/images/{imageId}', [InstallationController::class, 'deleteImage']);
    // Invoice Data endpoints
    Route::get('/invoices/stats', [InvoiceController::class, 'stats']);
    Route::get('/invoices/registrations', [InvoiceController::class, 'getRegistrations']); 
    //invoices
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.show');
    Route::post('/invoices', [InvoiceController::class, 'store']); 
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show']); 
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']); 
    Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']);
    Route::get('/invoices/service-types', [InvoiceController::class, 'getServiceTypes']);
    Route::get('/invoices/service-types/{serviceType}/packages', [InvoiceController::class, 'getPackages']);
    // Invoice actions
    Route::post('/invoices/{invoice}/send', [InvoiceController::class, 'sendInvoice']);
    Route::post('/invoices/send-bulk', [InvoiceController::class, 'sendBulkInvoices']);
    // Invoice Automated processes
    Route::post('/invoices/generate-recurring', [InvoiceController::class, 'generateRecurring']);
    Route::post('/invoices/send-automatic', [InvoiceController::class, 'sendAutomatic']);
    Route::post('/invoices/mark-overdue', [InvoiceController::class, 'markOverdue']);
    // Packages
    Route::get('/packages', [PackagePriceController::class, 'index']);
    Route::post('/packages', [PackagePriceController::class, 'store']);
    Route::get('/packages/service-types', [PackagePriceController::class, 'getServiceTypes']);
    Route::get('/packages/{packagePrice}', [PackagePriceController::class, 'show']);
    Route::put('/packages/{packagePrice}', [PackagePriceController::class, 'update']);
    Route::delete('/packages/{packagePrice}', [PackagePriceController::class, 'destroy']);
    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{customer}', [CustomerController::class, 'show']);
    Route::put('/customers/{customer}', [CustomerController::class, 'update']);
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy']);
    Route::get('customers/locations', [CustomerController::class, 'locations']);
    Route::get('customers/stats', [CustomerController::class, 'stats']);



   
    
    // Helper endpoints
    Route::get('/invoices/profile/data', [ProfileController::class, 'show'])->name('profile.data');

    // registration form
    Route::post('/reg-form-submit', [RegistrationController::class, 'store'])->name('reg-form.submit');

    
});

require __DIR__.'/auth.php';
