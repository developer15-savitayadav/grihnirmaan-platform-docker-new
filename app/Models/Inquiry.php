<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
   protected $fillable = [
        'name',
        'phone',
        'email',
        'subject',
        'service_interest',
        'source',
        'message',
        'status',
        'raw_payload',
    ];

    protected $casts = [
        'raw_payload' => 'array',
    ];
}
