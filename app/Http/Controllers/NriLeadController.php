<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNriLeadRequest;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class NriLeadController extends Controller
{
    public function store(StoreNriLeadRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $phone = preg_replace('/[^0-9+]/', '', $validated['phone']);

        Lead::create([
            'name' => $validated['name'],
            'phone' => $phone,
            'email' => null,

            'source' => 'nri-page',
            'service_interest' => 'nri-home-construction',

            'plot_size_sqft' => null,
            'estimated_budget' => null,
            'locality' => null,
            'finish_level' => 'standard',

            'raw_payload' => [
                'lead_type' => 'nri-consultation',
                'country' => null,
                'timezone' => 'timezone-aware-consultation-required',
                'preferred_callback_time' => 'sales-team-to-confirm',
                'preferred_communication' => 'phone',
                'property_location' => null,
                'message' => 'NRI page quick consultation form submitted.',
                'submitted_from' => '/nri',
                'ip' => $request->ip(),
                'user_agent' => Str::limit((string) $request->userAgent(), 500),
            ],

            'status' => 'new',
            'assigned_to' => null,
            'notes' => 'NRI page quick consultation lead. Sales team should confirm country, timezone, callback time, plot/location and budget.',
            'whatsapp_sent_at' => null,
            'pdf_quote_path' => null,
        ]);

        return redirect()
            ->route('thank-you')
            ->with('success', 'Thank you. Our NRI consultation team will contact you soon.');
    }
}