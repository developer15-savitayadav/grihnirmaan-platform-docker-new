<?php

namespace App\Http\Controllers;

use App\Models\BrandPartner;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Locality;

class HomeController extends Controller
{
    public function index(): Response
    {

        $localities = Locality::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'base_price_multiplier',
            ]);
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->get([
                'id',
                'slug',
                'name',
                'short_description',
                'icon_name',
                'display_order',
            ]);

        $featuredProjects = Project::query()
            ->where('is_featured', true)
            ->orderBy('display_order')
            ->limit(3)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,

                    'location' => $project->locality,

                    'before_image' => $project->before_image_path
                        ? asset('storage/' . ltrim($project->before_image_path, '/'))
                        : null,

                    'image' => $project->hero_image_path
                        ? asset('storage/' . ltrim($project->hero_image_path, '/'))
                        : null,

                    'area' => $project->built_up_area_sqft
                        ? $project->built_up_area_sqft . ' sq ft'
                        : 'N/A',

                    'type' => $project->style ?: 'Residential',
                    'bhk' => $project->bhk,

                    'year' => $project->completion_date
                        ? $project->completion_date->format('Y')
                        : 'Ongoing',

                    'budget_range' => $project->budget_range,
                    'duration_months' => $project->duration_months,
                    'is_featured' => (bool) $project->is_featured,
                ];
            });

        $testimonials = Testimonial::query()
            ->with([
                'project:id,title,slug,locality,hero_image_path'
            ])
            ->where('is_featured', true)
            ->latest()
            ->limit(5)
            ->get([
                'id',
                'customer_photo',
                'customer_name',
                'content',
                'rating',
                'project_id',
            ])
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'customer_name' => $testimonial->customer_name,
                    'content' => $testimonial->content,
                    'rating' => $testimonial->rating,

                    'customer_photo' => $testimonial->customer_photo
                        ? asset('storage/' . ltrim($testimonial->customer_photo, '/'))
                        : asset('uploads/images/default-user.jpg'),

                    'project' => $testimonial->project ? [
                        'id' => $testimonial->project->id,
                        'title' => $testimonial->project->title,
                        'slug' => $testimonial->project->slug,
                        'location' => $testimonial->project->locality,
                        'url' => route('projects.show', $testimonial->project->slug),
                        'image' => $testimonial->project->hero_image_path
                            ? asset('storage/' . ltrim($testimonial->project->hero_image_path, '/'))
                            : null,
                    ] : null,
                ];
            });

        $brandPartners = BrandPartner::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'slug', 'name', 'logo_path', 'website_url']);

        return Inertia::render('Home', [
            'services' => $services,
            'featuredProjects' => $featuredProjects,
            'testimonials' => $testimonials,
            'brandPartners' => $brandPartners,
            'localities' => $localities,
        ]);
    }
}
