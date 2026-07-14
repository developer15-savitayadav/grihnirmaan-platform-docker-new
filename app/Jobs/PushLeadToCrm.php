<?php

namespace App\Jobs;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PushLeadToCrm implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1;
    public int $timeout = 60;

    public function __construct(public Lead $lead) {}

    public function handle(): void
    {
        $lead = $this->lead->fresh();

        if (!$lead) {
            return;
        }

        $token = config('services.hubspot.token');

        Log::info('HubSpot config check', [
            'lead_id' => $lead->id,
            'has_token' => !empty($token),
            'token_start' => $token ? substr($token, 0, 8) : null,
        ]);

        if (!$token) {
            throw new \Exception('HubSpot token missing. Check .env and config/services.php');
        }

        if (!$lead->email && !$lead->phone) {
            Log::warning('HubSpot skipped: lead has no email or phone', [
                'lead_id' => $lead->id,
            ]);

            return;
        }

        $properties = [
            'firstname' => $lead->name ?: 'Website Lead',
            'phone' => $lead->phone,
            'company' => 'GrihNirmaan Website',
            'lifecyclestage' => 'lead',
        ];

        if ($lead->email) {
            $properties['email'] = $lead->email;
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token,
            'Content-Type' => 'application/json',
        ])->post('https://api.hubapi.com/crm/v3/objects/contacts', [
            'properties' => $properties,
        ]);

        Log::info('HubSpot create contact response', [
            'lead_id' => $lead->id,
            'status' => $response->status(),
            'body' => $response->json(),
        ]);

        if ($response->failed()) {
            throw new \Exception('HubSpot contact create failed: '.$response->body());
        }
    }
}