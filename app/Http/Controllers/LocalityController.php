<?php

namespace App\Http\Controllers;

use App\Models\Locality;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class LocalityController extends Controller
{

    public function index()
    {
        $localities = Locality::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Lucknow/Index', [
            'localities' => $localities,
        ]);
    }
    public function show(string $locality): Response
    {
        $localityData = Locality::query()
            ->where('slug', $locality)
            ->where('is_active', true)
            ->firstOrFail();

        $projects = Project::query()
            ->where('locality', $localityData->name)
            ->latest()
            ->limit(6)
            ->get([
                'id',
                'slug',
                'title',
                'locality',
                'plot_size_sqft',
                'built_up_area_sqft',
                'bhk',
                'style',
                'budget_range',
                'hero_image_path',
            ]);

        $nearbyLocalities = Locality::query()
            ->where('is_active', true)
            ->where('id', '!=', $localityData->id)
            ->orderBy('name')
            ->limit(4)
            ->get([
                'id',
                'name',
                'slug',
                'city',
                'base_price_multiplier',
            ]);

        return Inertia::render('Lucknow/Show', [
            'locality' => [
                'id' => $localityData->id,
                'name' => $localityData->name,
                'slug' => $localityData->slug,
                'city' => $localityData->city,
                'base_price_multiplier' => $localityData->base_price_multiplier,

                'title' => 'Home Construction in ' . $localityData->name,
                 'meta_title' => 'Home Construction in ' . $localityData->name . ', ' . $localityData->city,
                'meta_description' => 'Build your dream home in ' . $localityData->name . ' with construction, approvals, architecture and interiors.',
                'banner_image' => '/uploads/images/bcrumb-banner.jpg',
            ],

            'projects' => $projects,
            'nearbyLocalities' => $nearbyLocalities,
        ]);
    }
}
