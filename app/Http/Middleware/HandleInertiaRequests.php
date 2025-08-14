<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'layouts.app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $shared = [
            'auth' => [
                'user' => $request->user(),
            ],
        ];

        // Only add Ziggy if the class exists
        if (class_exists(Ziggy::class)) {
            $shared['ziggy'] = function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            };
        }

        return array_merge(parent::share($request), $shared);
    }
}