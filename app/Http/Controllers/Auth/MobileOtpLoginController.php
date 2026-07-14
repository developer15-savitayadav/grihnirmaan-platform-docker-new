<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;

class MobileOtpLoginController extends Controller
{
    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'otp' => ['required', 'digits:6'],
        ]);

        $userId = $request->session()->get('otp_login_user_id');
        $expiresAt = $request->session()->get('otp_login_expires_at');
        $remember = $request->session()->get('otp_login_remember', false);

        if (! $userId || ! $expiresAt || now()->greaterThan($expiresAt)) {
            $request->session()->forget(['otp_login_user_id', 'otp_login_remember', 'otp_login_expires_at']);

            return redirect()->route('login')->withErrors([
                'email' => 'Your session has expired. Please log in again.',
            ]);
        }

        $user = User::find($userId);

        if (! $user) {
            return redirect()->route('login')->withErrors([
                'email' => 'User not found. Please log in again.',
            ]);
        }

        try {
            $checkCode = $this->connect()
                ->verify->v2
                ->services(config('services.twilio.verification_sid'))
                ->verificationChecks
                ->create([
                    'to' => '+91' . $user->phone,
                    'code' => $request->otp,
                ]);

            if ($checkCode->status !== 'approved') {
                return back()->withErrors(['otp' => 'Invalid or expired OTP.'])->with([
                    'phone' => $this->maskPhone($user->phone),
                    'otpStep' => true,
                ]);
            }
        } catch (\Throwable $e) {
            return back()->withErrors(['otp' => 'Verification failed: ' . $e->getMessage()])->with([
                'phone' => $this->maskPhone($user->phone),
                'otpStep' => true,
            ]);
        }

        $user->forceFill(['phone_verified' => true])->save();
        $request->session()->forget(['otp_login_user_id', 'otp_login_remember', 'otp_login_expires_at']);

        Auth::login($user, $remember);
        $request->session()->regenerate();

        return redirect()->intended(route('portal.dashboard', absolute: false));
    }

    public function resendOtp(Request $request): RedirectResponse
    {
        $userId = $request->session()->get('otp_login_user_id');
        $user = $userId ? User::find($userId) : null;

        if (! $user) {
            return redirect()->route('login')->withErrors([
                'email' => 'Your session has expired. Please log in again.',
            ]);
        }

        try {
            $this->connect()
                ->verify->v2
                ->services(config('services.twilio.verification_sid'))
                ->verifications
                ->create('+91' . $user->phone, 'sms');

            $request->session()->put('otp_login_expires_at', now()->addMinutes(5));

            return back()->with([
                'status' => 'A new OTP has been sent.',
                'phone' => $this->maskPhone($user->phone),
                'otpStep' => true,
            ]);
        } catch (\Throwable $e) {
            return back()->withErrors(['otp' => 'Unable to resend OTP: ' . $e->getMessage()])->with([
                'otpStep' => true,
            ]);
        }
    }

    public function cancel(Request $request): RedirectResponse
    {
        $request->session()->forget(['otp_login_user_id', 'otp_login_remember', 'otp_login_expires_at']);

        return redirect()->route('login');
    }

    private function connect(): Client
    {
        return new Client(config('services.twilio.sid'), config('services.twilio.token'));
    }

    private function maskPhone(string $phone): string
    {
        return str_repeat('*', max(strlen($phone) - 2, 0)) . substr($phone, -2);
    }
}
