<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'category',
        'service_id',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    protected static function booted(): void
    {
        static::saved(function (Faq $faq) {
            $faq->service?->syncFaqsJsonFromTable();
        });

        static::deleted(function (Faq $faq) {
            $faq->service?->syncFaqsJsonFromTable();
        });
    }
}
