<?php

namespace App\Http\Controllers;

use App\Models\BrandPartner;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Faq;
use App\Models\Locality;
use App\Models\Project;
use App\Models\Testimonial;

class PageController extends Controller
{
    public function howItWorks()
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'slug' => $service->slug,
                    'name' => $service->name,
                    'short_description' => $service->short_description,
                    'icon_name' => $service->icon_name,
                    'process_steps' => collect($service->process_steps ?? [])->map(function ($step) {
                        return [
                            'title' => $step['title'] ?? '',
                            'description' => $step['description'] ?? '',
                            'photos' => collect($step['photos'] ?? [])->map(function ($photo) {
                                return asset('storage/' . ltrim($photo, '/'));
                            })->values(),
                            'video_url' => $step['video_url'] ?? null,
                        ];
                    })->values(),
                ];
            });

        return Inertia::render('HowItWorks', [
            'services' => $services,
        ]);
    }

    public function about()
    {
        $brandPartners = BrandPartner::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'slug', 'name', 'logo_path', 'website_url']);
        return Inertia::render('About/Index', [
            'brandPartners' => $brandPartners
        ]);
    }
    public function team()
    {
        return Inertia::render('About/Team');
    }

    public function partners(): Response
    {
        $brandPartners = BrandPartner::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn($partner) => [
                'id' => $partner->id,
                'slug' => $partner->slug,
                'name' => $partner->name,
                'logo' => $partner->logo_path
                    ? asset('storage/' . ltrim($partner->logo_path, '/'))
                    : null,
                'website_url' => $partner->website_url,
                'description' => $partner->description,
            ]);

        return Inertia::render('About/Partners', [
            'partners' => $brandPartners,
        ]);
    }
    public function privacy()
    {
        return Inertia::render('Privacy');
    }

    public function terms()
    {
        return Inertia::render('Terms');
    }
    public function nri(): Response
    {
        return Inertia::render('Nri/Index', [
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->limit(8)
                ->get([
                    'id',
                    'name',
                    'slug',
                    'short_description',
                    'icon_name',
                ]),

            'featuredProjects' => Project::query()
                ->where('is_featured', true)
                ->orderBy('display_order')
                ->limit(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'locality',
                    'plot_size_sqft',
                    'built_up_area_sqft',
                    'budget_range',
                    'duration_months',
                    'hero_image_path',
                ]),

            'testimonials' => Testimonial::query()
                ->latest()
                ->limit(6)
                ->get([
                    'id',
                    'customer_name',
                    'content',
                    'rating',
                    'customer_photo',
                ]),

            'faqs' => Faq::query()
                ->where('is_active', true)
                ->where(function ($query) {
                    $query->whereIn('category', ['nri', 'general'])
                        ->orWhereHas('service', function ($service) {
                            $service->where('slug', 'nri-home-construction');
                        });
                })
                ->orderBy('display_order')
                ->limit(10)
                ->get([
                    'id',
                    'service_id',
                    'question',
                    'answer',
                    'category',
                ]),

            'brandPartners' => BrandPartner::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get([
                    'id',
                    'slug',
                    'name',
                    'logo_path',
                    'website_url',
                ]),

            'localities' => Locality::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'slug',
                    'base_price_multiplier',
                ]),
        ]);
    }
    public function thankYou()
    {
        return Inertia::render('ThankYou');
    }
    public function calendlyform()
    {
        return Inertia::render('Consultation/Book');
    }
}
