<?php

namespace App\Http\Controllers;

use App\Http\Requests\CostCalculatorRequest;
use App\Jobs\GeneratePdfQuote;
use App\Jobs\PushLeadToCrm;
use App\Jobs\SendWhatsAppMessage;
use App\Models\Lead;
use App\Models\Locality;
use App\Services\CostCalculationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Twilio\Rest\Client;

class CostCalculatorController extends Controller
{
    public function show(): Response
    {
        $localities = Locality::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'base_price_multiplier',
            ]);

        return Inertia::render('CostCalculator', [
            'localities' => $localities,
        ]);
    }

    public function calculate(
        CostCalculatorRequest $request,
        CostCalculationService $calculator
    ): JsonResponse {
        $data = $request->validated();

        $locality = Locality::query()
            ->where('slug', $data['locality'])
            ->where('is_active', true)
            ->firstOrFail();

        $data['locality_name'] = $locality->name;
        $data['locality_multiplier'] = $locality->base_price_multiplier;

        $result = $calculator->calculate($data);

        $lead = Lead::create([
            'name' => $data['name'] ?? null,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'source' => 'calculator',
            'service_interest' => 'Civil Construction',
            'plot_size_sqft' => $result['plot_size_sqft'] ?? null,
            'estimated_budget' => (($result['estimated_low'] ?? 0) + ($result['estimated_high'] ?? 0)) / 2,
            'locality' => $locality->name,
            'finish_level' => $data['finish_level'],
            'raw_payload' => [
                'input' => $data,
                'calculation' => $result,
            ],
            'status' => 'new',
        ]);

        GeneratePdfQuote::dispatch($lead);
        PushLeadToCrm::dispatch($lead);
        SendWhatsAppMessage::dispatch($lead);
        return response()->json([
            'success' => true,
            'message' => 'Cost calculated successfully.',
            'lead_id' => $lead->id,
            'result' => $result,
        ]);
    }

    public function downloadPdf(Lead $lead): StreamedResponse
    {
        $lead->refresh();

        abort_if(!$lead->pdf_quote_path, 404, 'PDF not generated yet.');

        $disk = Storage::disk(config('filesystems.default'));

        abort_if(
            !$disk->exists($lead->pdf_quote_path),
            404,
            'PDF file not found.'
        );

        return $disk->download(
            $lead->pdf_quote_path,
            'Construction-Estimate-' . $lead->id . '.pdf'
        );
    }
    public function send(Request $request)
    {
        try {
            $twilio = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));

            $message = $twilio->messages->create("whatsapp:".$request->to, [
                'from' => "whatsapp:".env('twilio_whatsapp_number'),
                'body' => $request->message,
            ]);

            dd($message);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
