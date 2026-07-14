<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

class WhatsAppService
{
    public function credentialsAvailable(): bool
    {
        return filled(config('services.twilio.sid'))
            && filled(config('services.twilio.token'))
            && filled(config('services.twilio.whatsapp_from'));
    }

    public function sendMessage(string $to, string $message): bool
    {
        if (! $this->credentialsAvailable()) {
            Log::warning('WhatsApp message skipped because Twilio credentials are missing.');

            return false;
        }

        $to = $this->formatWhatsAppNumber($to);
        $from = $this->formatWhatsAppFrom((string) config('services.twilio.whatsapp_from'));

        try {
            $client = new Client(
                (string) config('services.twilio.sid'),
                (string) config('services.twilio.token'),
            );

            $client->messages->create($to, [
                'from' => $from,
                'body' => $message,
            ]);

            return true;
        } catch (\Throwable $exception) {
            Log::error('Twilio WhatsApp send failed.', [
                'to' => $this->maskPhone($to),
                'error' => $exception->getMessage(),
            ]);

            return false;
        }
    }

    private function formatWhatsAppNumber(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone) ?: '';

        if (str_starts_with($digits, '91') && strlen($digits) === 12) {
            return 'whatsapp:+' . $digits;
        }

        return 'whatsapp:+91' . ltrim($digits, '0');
    }

    private function formatWhatsAppFrom(string $from): string
    {
        return str_starts_with($from, 'whatsapp:') ? $from : 'whatsapp:' . $from;
    }

    private function maskPhone(string $phone): string
    {
        return substr($phone, 0, 12) . '****';
    }
}
