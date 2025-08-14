<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ContentSecurityPolicy
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        $csp = "default-src 'self'; " .
               "script-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com; " .
               "style-src 'self' 'unsafe-inline' *.googleapis.com; " .
               "img-src 'self' data: *.googleapis.com *.gstatic.com; " .
               "connect-src 'self' *.googleapis.com; " .
               "frame-src 'self' *.google.com;";
        
        $response->headers->set('Content-Security-Policy', $csp);
        
        return $response;
    }
}