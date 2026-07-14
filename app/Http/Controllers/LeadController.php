<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): RedirectResponse
    {
        Lead::create([
            ...$request->validated(),
            'source' => $request->input('source', 'home_inline_form'),
            'status' => Lead::STATUS_NEW,
            'raw_payload' => [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->headers->get('referer'),
            ],
        ]);

        return back()->with('success', "Thanks! We'll call you within 30 minutes.");
    }
}
