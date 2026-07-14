<?php

namespace App\Jobs;

use App\Mail\QuoteEstimateMail; 
use App\Models\Lead;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class GeneratePdfQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 60;

    public function __construct(public Lead $lead) {}

    public function handle(): void
    {
        try {
            $this->lead->refresh();

            $input = $this->lead->raw_payload['input'] ?? [];
            $result = $this->lead->raw_payload['calculation'] ?? [];

            $pdf = Pdf::loadView('pdf.quote', [
                'lead' => $this->lead,
                'input' => $input,
                'result' => $result,
            ])->setPaper('a4', 'portrait');

            $filename = 'quotes/quote-lead-' . $this->lead->id . '.pdf';

            Storage::disk('local')->put($filename, $pdf->output());

            $this->lead->update([
                'pdf_quote_path' => $filename,
            ]);

            $this->lead->refresh();

            if (!empty($this->lead->email)) {
                Mail::to($this->lead->email)
                    ->send(new QuoteEstimateMail($this->lead));

                Log::info('Quote estimate email sent successfully.', [
                    'lead_id' => $this->lead->id,
                    'email' => $this->lead->email,
                ]);
            }

            Log::info('PDF quote generated successfully.', [
                'lead_id' => $this->lead->id,
                'path' => $filename,
            ]);
        } catch (\Throwable $exception) {
            Log::error('GeneratePdfQuote failed.', [
                'lead_id' => $this->lead->id,
                'error' => $exception->getMessage(),
            ]);

            throw $exception;
        }
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('GeneratePdfQuote permanently failed.', [
            'lead_id' => $this->lead->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
