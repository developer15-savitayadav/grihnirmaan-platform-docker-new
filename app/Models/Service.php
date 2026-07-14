<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Service extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'slug',
        'name',
        'short_description',
        'long_description',
        'icon_name',
        'features',
        'process_steps',
        'faqs',
        'brand_partners',
        'display_order',
        'meta_title',
        'meta_description',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'process_steps' => 'array',
        'faqs' => 'array',
        'brand_partners' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // public function faqRecords(): HasMany
    // {
    //     return $this->hasMany(Faq::class);
    // }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'slug',
                'short_description',
                'display_order',
                'is_active',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('services');
    }
    public function serviceFaqs()
    {
        return $this->hasMany(Faq::class, 'service_id')
            ->orderBy('display_order');
    }
    public function syncFaqsJsonFromTable(): void
    {
        $this->updateQuietly([
            'faqs' => $this->serviceFaqs()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->get(['question', 'answer'])
                ->map(fn($faq) => [
                    'question' => $faq->question,
                    'answer' => $faq->answer,
                ])
                ->values()
                ->toArray(),
        ]);
    }
}
