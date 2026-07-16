<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Project;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            // Small nav list for the Projects mega-menu. Fetched here (rather
            // than hardcoded in the frontend) so titles are translated per
            // the current locale via Project::$translatable.
            'navProjects' => fn () => Project::query()
                ->orderBy('display_order')
                ->limit(5)
                ->get(['title', 'slug'])
                ->map(fn ($project) => [
                    'title' => $project->title,
                    'slug' => $project->slug,
                ])
                ->values(),
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
                'phone' => fn () => $request->session()->get('phone'),
                'otpStep' => fn () => $request->session()->get('otpStep'),
            ],
        ];
    }
}
