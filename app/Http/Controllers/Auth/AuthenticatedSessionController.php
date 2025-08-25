<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Inertia\Inertia;


class AuthenticatedSessionController extends BaseController
{
    /**
     * Display the login view.
     */
    public function create()
    {
        $seoData = $this->mergeSeoData([
            'title' => 'Admin Authentication ',
            'description' => 'Admin Authentication page for Get Thru',
            'keywords' => 'Penda Graphics, Web Design, Graphic Design, Branding, E-commerce, Digital Marketing',
            'og_title' => 'Admin Authentication | Penda Graphics',
            'hero_image' => asset('assets/images/logo/getthru_banner.png'),
        ]);

        return Inertia::render('Admin', [
            'seo' => $seoData
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
