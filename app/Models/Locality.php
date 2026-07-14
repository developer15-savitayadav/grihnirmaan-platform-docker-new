<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locality extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'city',
        'base_price_multiplier',
        'is_active',
    ];

    protected $casts = [
        'base_price_multiplier' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    public function leads()
{
    return $this->hasMany(\App\Models\Lead::class, 'locality', 'name');
}
}
