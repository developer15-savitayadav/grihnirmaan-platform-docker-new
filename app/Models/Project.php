<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    use HasFactory, LogsActivity, InteractsWithMedia;
    protected $fillable = [
        'slug',
        'title',
        'locality',
        'plot_size_sqft',
        'built_up_area_sqft',
        'bhk',
        'style',
        'completion_date',
        'duration_months',
        'budget_range',
        'customer_quote',
        'challenges_solved',
        'hero_image_path',
        'before_image_path',
        'floor_plan_path',
        'is_featured',
        'display_order',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'completion_date' => 'date',
        'is_featured' => 'boolean',
        'plot_size_sqft' => 'integer',
        'built_up_area_sqft' => 'integer',
        'duration_months' => 'integer',
        'display_order' => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'title',
                'locality',
                'budget_range',
                'is_featured',
                'display_order',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('projects');
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero')->singleFile();
        $this->addMediaCollection('before')->singleFile();
        $this->addMediaCollection('floor_plan')->singleFile();
        $this->addMediaCollection('gallery');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(420)
            ->height(280)
            ->format('webp')
            ->quality(80)
            ->nonQueued();

        $this->addMediaConversion('card')
            ->width(900)
            ->height(600)
            ->format('webp')
            ->quality(85)
            ->nonQueued();

        $this->addMediaConversion('large')
            ->width(1400)
            ->height(900)
            ->format('webp')
            ->quality(90)
            ->nonQueued();
    }
}
