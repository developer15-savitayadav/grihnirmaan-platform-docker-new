<?php
namespace App\Http\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\ThrottleRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Trust Render's load balancer so Laravel correctly detects the
        // original HTTPS scheme (Render terminates SSL at the edge, so
        // requests reach this container as plain HTTP without this).
        $middleware->trustProxies(at: '*');

        $middleware->web(append: [
             SetLocale::class,
            HandleInertiaRequests::class,
             ThrottleSubmissions::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            ThrottleRequests::class,

        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();