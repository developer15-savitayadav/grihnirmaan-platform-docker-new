<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequest;
use App\Models\Lead;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function show()
    {
        return Inertia::render('Quote');
    }

    public function store(StoreQuoteRequest $request)
    {
        $data = $request->validated();

        Lead::create([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'source' => 'quote',
            'service_interest' => $data['service_interest'] ?? null,
            'plot_size_sqft' => $data['plot_size_sqft'] ?? null,
            'locality' => $data['locality'] ?? null,
            'finish_level' => $data['finish_level'] ?? 'standard',
            'raw_payload' => $data,
            'status' => 'new',
        ]);

        return back()->with('success', 'Your quote request has been submitted successfully.');
    }
}
