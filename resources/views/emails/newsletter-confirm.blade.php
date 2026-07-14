<h2>Confirm your subscription</h2>

<p>Thanks for subscribing to GrihNirmaan newsletter.</p>

<p>Please click the button below to confirm your email:</p>

<a href="{{ route('newsletter.confirm', $subscriber->confirmation_token) }}"
   style="display:inline-block;background:#1F4E79;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;">
    Confirm Subscription
</a>

<p>If you did not request this, you can ignore this email.</p>
