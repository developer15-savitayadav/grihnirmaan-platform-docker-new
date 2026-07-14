<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteEstimateMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Lead $lead) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your GrihNirmaan Construction Cost Estimate',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-estimate',
            with: [
                'lead'   => $this->lead,
                'result' => $this->lead->raw_payload['calculation'],
            ],
        );
    }

    public function attachments(): array
    {
        if (!$this->lead->pdf_quote_path) {
            return [];
        }

        return [
            Attachment::fromStorageDisk(
                'local',
                $this->lead->pdf_quote_path
            )->as(
                'Construction-Estimate-' . $this->lead->id . '.pdf'
            )->withMime('application/pdf'),
        ];
    }
    
}