<?php

namespace App\Http\Controllers;

use App\Mail\NewsletterConfirmMail;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'source' => ['nullable', 'string', 'max:100'],
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => $validated['email']],
            [
                'source' => $validated['source'] ?? 'website',
                'is_active' => false,
                'confirmation_token' => Str::random(64),
                'unsubscribe_token' => Str::random(64),
            ]
        );

        Mail::to($subscriber->email)->send(
            new NewsletterConfirmMail($subscriber)
        );

        return back()->with(
            'newsletter_success',
            'Confirmation email sent successfully. Please check your inbox and click the confirmation link.'
        );
    }

    public function confirm(string $token)
    {
        $subscriber = NewsletterSubscriber::where('confirmation_token', $token)->firstOrFail();

        $subscriber->update([
            'is_active' => true,
            'confirmed_at' => now(),
            'confirmation_token' => null,
        ]);

        return redirect('/')->with('success', 'Newsletter subscription confirmed.');
    }
}
