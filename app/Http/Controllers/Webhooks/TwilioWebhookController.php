<?php

namespace App\Http\Controllers\Webhooks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TwilioWebhookController extends Controller
{
    public function whatsappStatus(Request $request)
    {
        Log::info('Verified Twilio WhatsApp status webhook', [
            'MessageSid' => $request->input('MessageSid'),
            'MessageStatus' => $request->input('MessageStatus'),
            'To' => $request->input('To'),
            'From' => $request->input('From'),
            'ErrorCode' => $request->input('ErrorCode'),
            'ErrorMessage' => $request->input('ErrorMessage'),
        ]);

        return response('OK', 200);
    }

    public function incomingWhatsapp(Request $request)
    {
        Log::info('Verified Twilio incoming WhatsApp webhook', [
            'MessageSid' => $request->input('MessageSid'),
            'From' => $request->input('From'),
            'To' => $request->input('To'),
            'Body' => $request->input('Body'),
        ]);

        return response('OK', 200);
    }
}
