<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Twilio\Security\RequestValidator;

class VerifyTwilioSignature
{
    public function handle(Request $request, Closure $next)
    {
        $signature = $request->header('X-Twilio-Signature');

        if (!$signature) {
            Log::warning('Twilio webhook blocked: missing signature', [
                'url' => $request->fullUrl(),
                'ip' => $request->ip(),
            ]);

            abort(403, 'Missing Twilio signature');
        }

        $authToken = config('services.twilio.token');

        if (!$authToken) {
            Log::error('Twilio auth token missing in config/services.php or .env');
            abort(500, 'Twilio auth token not configured');
        }

        $validator = new RequestValidator($authToken);

        $isValid = $validator->validate(
            $signature,
            $request->fullUrl(),
            $request->post()
        );

        if (!$isValid) {
            Log::warning('Twilio webhook blocked: invalid signature', [
                'url' => $request->fullUrl(),
                'ip' => $request->ip(),
                'payload' => $request->all(),
            ]);

            abort(403, 'Invalid Twilio signature');
        }

        return $next($request);
    }
}
