<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;

class InquiryController extends Controller
{
    public function store( StoreInquiryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $inquiry = Inquiry::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'service_interest' => $validated['service_interest'] ?? null,
            'source' => $validated['source'] ?? 'contact-page',
            'message' => $validated['message'] ?? null,
            'status' => 'new',
            'raw_payload' => $validated,
        ]);

        Lead::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'source' => 'contact-page',
            'service_interest' => $validated['service_interest'] ?? null,
            'raw_payload' => [
                'inquiry_id' => $inquiry->id,
                'subject' => $validated['subject'] ?? null,
                'message' => $validated['message'] ?? null,
                'form_data' => $validated,
            ],
            'status' => 'new',
        ]);

        return back()->with('success', 'Thanks! Your inquiry has been submitted successfully.');
    }
}