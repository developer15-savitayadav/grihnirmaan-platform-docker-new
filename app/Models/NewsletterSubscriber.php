<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'confirmed_at',
        'is_active',
        'source',
        'unsubscribe_token',
        'confirmation_token',
    ];

    protected $casts = [
        'confirmed_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function isConfirmed(): bool
    {
        return $this->confirmed_at !== null;
    }
}
