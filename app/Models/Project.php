<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero')
            ->useDisk('public')
            ->singleFile();

        $this->addMediaCollection('before')
            ->useDisk('public')
            ->singleFile();

        $this->addMediaCollection('floor_plan')
            ->useDisk('public')
            ->singleFile();

        $this->addMediaCollection('gallery')
            ->useDisk('public');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(300)
            ->height(300)
            ->format('webp')
            ->quality(80)
            ->nonQueued();

        $this->addMediaConversion('card')
            ->width(800)
            ->height(600)
            ->format('webp')
            ->quality(82)
            ->nonQueued();

        $this->addMediaConversion('large')
            ->width(1600)
            ->format('webp')
            ->quality(85)
            ->nonQueued();
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        $url = $this->getFirstMediaUrl('hero', 'large');

        return $url !== '' ? $url : null;
    }
}