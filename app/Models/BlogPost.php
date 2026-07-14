<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class BlogPost extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'content',
        'featured_image_path',
        'author_id',
        'category',
        'tags',
        'published_at',
        'read_time_minutes',
        'view_count',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'read_time_minutes' => 'integer',
        'view_count' => 'integer',
    ];
    

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
     public function views(): HasMany
    {
        return $this->hasMany(BlogPostView::class);
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'title',
                'slug',
                'category',
                'published_at',
                'meta_title',
                'meta_description',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('blog_posts');
    }
}
