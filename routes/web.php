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
    //invoices
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.show');
    Route::post('/invoices', [InvoiceController::class, 'store']); 
    Route::get('/invoices/clients', [ClientController::class, 'index']);
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show']); 
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']); 
    Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']); 
    // Special actions
    Route::post('/invoices/{invoice}/send', [InvoiceController::class, 'markAsSent']); 
    Route::post('/invoices/{invoice}/payment', [InvoiceController::class, 'recordPayment']); 
    Route::post('/invoices/{invoice}/duplicate', [InvoiceController::class, 'duplicate']); 
    
    // Statistics and reporting
    Route::get('/invoices/statistics', [InvoiceController::class, 'statistics']); 
    
    // Helper endpoints
    Route::get('/invoices/clients/list', [InvoiceController::class, 'getClients']); 

    Route::get('/invoices/profile/data', [ProfileController::class, 'show'])->name('profile.data');

    
});

require __DIR__.'/auth.php';
