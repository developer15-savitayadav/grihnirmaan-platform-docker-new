<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Twilio\Rest\Client;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Step 1: validate email + password.
     * If OTP login is enabled AND OTP send succeeds → go to OTP step.
     * Otherwise (OTP disabled, or Twilio fails, e.g. free-trial number restriction) → login directly.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $this->ensureIsNotRateLimited($request);

        if (! Auth::validate($credentials)) {
            RateLimiter::hit($this->throttleKey($request));

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey($request));

        $user = User::where('email', $credentials['email'])->first();
        $remember = $request->boolean('remember');

        // ── Fallback path: OTP login turned off in config ─────────────────
        if (! config('services.otp_login_enabled')) {
            return $this->loginDirectly($request, $user, $remember);
        }

        // ── OTP path requires a registered phone number ───────────────────
        if (empty($user->phone)) {
            return back()->withErrors([
                'email' => 'Mobile number is not registered for this account.',
            ])->onlyInput('email');
        }

        $verifySid = config('services.twilio.verification_sid');

        if (! $verifySid) {
            // Twilio not configured at all → fallback to direct login.
            return $this->loginDirectly($request, $user, $remember);
        }

        try {
            $verification = (new Client(
                config('services.twilio.sid'),
                config('services.twilio.token')
            ))->verify->v2
                ->services($verifySid)
                ->verifications
                ->create('+91' . $user->phone, 'sms');

            if ($verification->status !== 'pending') {
                // Twilio didn't confirm it queued the SMS → fallback.
                return $this->loginDirectly($request, $user, $remember);
            }
        } catch (\Throwable $e) {
            // Free-trial Twilio account, unverified number, etc. → fallback.
            return $this->loginDirectly($request, $user, $remember);
        }

        $request->session()->put('otp_login_user_id', $user->id);
        $request->session()->put('otp_login_remember', $remember);
        $request->session()->put('otp_login_expires_at', now()->addMinutes(5));

        return back()->with([
            'status' => 'OTP sent successfully.',
            'phone' => $this->maskPhone($user->phone),
            'otpStep' => true,
        ]);
    }

    /**
     * Logs the user in directly, skipping OTP entirely.
     */
    private function loginDirectly(Request $request, User $user, bool $remember): RedirectResponse
    {
        Auth::login($user, $remember);
        $request->session()->regenerate();

        return redirect()->intended(route('portal.dashboard', absolute: false));
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

    private function ensureIsNotRateLimited(Request $request): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        event(new \Illuminate\Auth\Events\Lockout($request));

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    private function throttleKey(Request $request): string
    {
        return Str::transliterate(
            Str::lower($request->input('email')) . '|' . $request->ip()
        );
    }

    private function maskPhone(string $phone): string
    {
        return str_repeat('*', max(strlen($phone) - 2, 0)) . substr($phone, -2);
    }
}
