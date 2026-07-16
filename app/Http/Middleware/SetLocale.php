<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Supported locales. Keep in sync with resources/js/locales/*
     * and lang/*.
     */
    protected array $supportedLocales = ['en', 'hi'];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->query('lang');

        if ($locale && in_array($locale, $this->supportedLocales, true)) {
            // Persist the choice for subsequent requests that don't pass ?lang=
            session(['locale' => $locale]);
        } else {
            $locale = session('locale');
        }

        if (! $locale || ! in_array($locale, $this->supportedLocales, true)) {
            $locale = config('app.locale', 'en');
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
