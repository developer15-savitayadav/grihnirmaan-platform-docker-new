<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    // public function index()
    // {
    //     $projects = [
    //         [
    //             'title' => 'Modern Villa',
    //             'slug' => 'modern-villa',
    //             'location' => 'Gomti Nagar',
    //             'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    //         ],
    //         [
    //             'title' => 'Premium Duplex',
    //             'slug' => 'premium-duplex',
    //             'location' => 'Indira Nagar',
    //             'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    //         ],
    //     ];

    //     return Inertia::render('Projects/Index', [
    //         'projects' => $projects,
    //     ]);
    // }

    // public function show($slug)
    // {
    //     return Inertia::render('Projects/Show', [
    //         'slug' => $slug,
    //     ]);
    // }
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('style')) {
            $query->where('style', $request->style);
        }

        if ($request->filled('bhk')) {
            $query->where('bhk', $request->bhk);
        }

        if ($request->filled('locality')) {
            $query->where('locality', $request->locality);
        }
        if ($request->filled('title')) {
            $query->where('title', $request->title);
        }
        $projects = $query
            ->orderBy('display_order', 'asc')
            ->latest()
            ->get()
            ->map(fn($project) => $this->transformProject($project));

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only([
                'featured',
                'style',
                'bhk',
                'locality',
                'title'
            ]),
        ]);
    }

    public function show(Project $project)
    {
        $project->load('testimonials');
 
        $data = $this->transformProject($project);

        $data['testimonials'] = $project->testimonials->map(function ($testimonial) {
            return [
                'id' => $testimonial->id,
                'customer_name' => $testimonial->customer_name,
                'customer_location' => $testimonial->customer_location,
                'content' => $testimonial->content,
                'rating' => $testimonial->rating,
                'customer_photo' => $testimonial->customer_photo
                    ? asset('storage/' . ltrim($testimonial->customer_photo, '/'))
                    : null,
            ];
        })->values();

        return Inertia::render('Projects/Show', [
            'project' => $data,
        ]);
    }
    public function apiList(Request $request)
    {
        $query = Project::query();

        if ($request->filled('locality')) {
            $query->where('locality', $request->locality);
        }

        if ($request->filled('style')) {
            $query->where('style', $request->style);
        }

        if ($request->filled('bhk')) {
            $query->where('bhk', $request->bhk);
        }

        if ($request->filled('year')) {
            $query->whereYear('completion_date', $request->year);
        }

        if ($request->filled('size')) {
            if ($request->size === 'small') {
                $query->where('built_up_area_sqft', '<', 1500);
            }

            if ($request->size === 'medium') {
                $query->whereBetween('built_up_area_sqft', [1500, 3000]);
            }

            if ($request->size === 'large') {
                $query->where('built_up_area_sqft', '>', 3000);
            }
        }

        $projects = $query
            ->orderBy('display_order', 'asc')
            ->latest()
            ->get()
            ->map(fn($project) => $this->transformProject($project));

        return response()->json([
            'projects' => $projects,
        ]);
    }
    private function transformProject(Project $project): array
    {
        $heroMedia = $project->getFirstMedia('hero');
        $beforeMedia = $project->getFirstMedia('before');
        $floorMedia = $project->getFirstMedia('floor_plan');

        return [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'location' => $project->locality,

            'before_image' => $beforeMedia
                ? $beforeMedia->getUrl('card')
                : ($project->before_image_path
                    ? asset('storage/' . ltrim($project->before_image_path, '/'))
                    : null),

            'image' => $heroMedia
                ? $heroMedia->getUrl('card')
                : ($project->hero_image_path
                    ? asset('storage/' . ltrim($project->hero_image_path, '/'))
                    : asset('images/project-placeholder.jpg')),

            'image_large' => $heroMedia
                ? $heroMedia->getUrl('large')
                : ($project->hero_image_path
                    ? asset('storage/' . ltrim($project->hero_image_path, '/'))
                    : asset('images/project-placeholder.jpg')),

            'floor_plan' => $floorMedia
                ? $floorMedia->getUrl('large')
                : ($project->floor_plan_path
                    ? asset('storage/' . ltrim($project->floor_plan_path, '/'))
                    : null),

            'gallery' => $project->getMedia('gallery')->map(fn($media) => [
                'id' => $media->id,
                'url' => $media->getUrl('large'),
                'thumb' => $media->getUrl('thumb'),
                'card' => $media->getUrl('card'),
                'large' => $media->getUrl('large'),
                'alt' => $project->title . ' gallery image',
            ])->values(),

            'area' => $project->built_up_area_sqft
                ? $project->built_up_area_sqft . ' sq ft'
                : 'N/A',

            'plot_size_sqft' => $project->plot_size_sqft,
            'built_up_area_sqft' => $project->built_up_area_sqft,
            'type' => $project->style ?: 'Residential',
            'style' => $project->style,
            'bhk' => $project->bhk,
            'year' => $project->completion_date ? $project->completion_date->format('Y') : 'Ongoing',
            'completion_date' => $project->completion_date ? $project->completion_date->format('d M Y') : 'Ongoing',
            'duration_months' => $project->duration_months,
            'budget_range' => $project->budget_range,
            'customer_quote' => $project->customer_quote,
            'challenges_solved' => $project->challenges_solved,
            'is_featured' => (bool) $project->is_featured,
            'meta_title' => $project->meta_title,
            'meta_description' => $project->meta_description,
        ];
    }
}
