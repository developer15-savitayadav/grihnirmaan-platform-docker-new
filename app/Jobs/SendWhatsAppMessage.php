<?php

namespace App\Jobs;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

class SendWhatsAppMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 30;

    public function __construct(public Lead $lead,  public ?string $customMessage = null) {}

    public function handle(): void
    {
        $this->lead->refresh();

      
        if ($this->lead->whatsapp_sent_at && !$this->customMessage) {
            return;
        }
        if (blank($this->lead->phone)) {
            Log::warning('WhatsApp skipped: phone missing', [
                'lead_id' => $this->lead->id,
            ]);
            return;
        }

        $to = $this->formatPhone($this->lead->phone);

        $calculation = $this->lead->raw_payload['calculation'] ?? [];
        $message = $this->customMessage ?: $this->buildEstimateMessage($calculation);
        try {
            $twilio = new Client(
                env('TWILIO_ACCOUNT_SID'),
                env('TWILIO_AUTH_TOKEN')
            );

            $response = $twilio->messages->create("whatsapp:$to", [
                'from' => 'whatsapp:' . env('TWILIO_WHATSAPP_NUMBER'),
                'body' => $message,
            ]);

            $this->lead->forceFill([
                'whatsapp_sent_at' => now(),
            ])->save();

            Log::info('WhatsApp sent successfully', [
                'lead_id' => $this->lead->id,
                'sid' => $response->sid,
                'to' => $to,
            ]);
        } catch (\Throwable $e) {
            Log::error('WhatsApp send failed', [
                'lead_id' => $this->lead->id,
                'to' => $to,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    private function formatPhone(string $phone): string
    {
        $phone = preg_replace('/\D/', '', $phone);

        if (strlen($phone) === 10) {
            return '+91' . $phone;
        }

        if (str_starts_with($phone, '91') && strlen($phone) === 12) {
            return '+' . $phone;
        }

        if (str_starts_with($phone, '+')) {
            return $phone;
        }

        return '+' . $phone;
    }

    private function buildEstimateMessage(array $calculation): string
    {
        $name = $this->lead->name ?: 'there';

        $plotSize = $calculation['plot_size_sqft']
            ?? $this->lead->plot_size_sqft
            ?? 'N/A';

        $builtUpArea = $calculation['built_up_area_sqft'] ?? 'N/A';

        $estimatedLow = $calculation['estimated_low'] ?? null;
        $estimatedHigh = $calculation['estimated_high'] ?? null;

        $estimatedBudget = $this->lead->estimated_budget ?? 0;

        $timeline = $calculation['timeline']
            ?? $calculation['timeline_months']
            ?? 'Our advisor will confirm';

        if ($estimatedLow && $estimatedHigh) {
            $costLine = '₹' . number_format((float) $estimatedLow)
                . ' – ₹' . number_format((float) $estimatedHigh);
        } else {
            $costLine = '₹' . number_format((float) $estimatedBudget);
        }

        return "Hi {$name}! 👋\n\n"
            . "Thank you for using GrihNirmaan's Cost Calculator.\n\n"
            . "📋 *Your Estimate Summary*\n"
            . "• Plot Size: {$plotSize} sq ft\n"
            . "• Built-up Area: {$builtUpArea} sq ft\n"
            . "• Finish Level: " . ucfirst((string) $this->lead->finish_level) . "\n"
            . "• Locality: " . ($this->lead->locality ?: 'N/A') . "\n"
            . "• Timeline: {$timeline}\n\n"
            . "💰 *Estimated Cost*\n"
            . "{$costLine}\n\n"
            . "A home advisor will call you within *30 minutes*.\n\n"
            . "— Team GrihNirmaan";
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('SendWhatsAppMessage job failed', [
            'lead_id' => $this->lead->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
