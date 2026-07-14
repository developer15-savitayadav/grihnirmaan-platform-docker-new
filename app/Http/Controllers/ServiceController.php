<?php

namespace App\Http\Controllers;

use App\Models\BrandPartner;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
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

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedServices = Service::query()
            ->where('is_active', true)
            ->where('id', '!=', $service->id)
            ->inRandomOrder()
            ->limit(3)
            ->get([
                'id',
                'slug',
                'name',
                'short_description',
                'icon_name'
            ]);

        $brandPartnerSlugs = collect($service->brand_partners ?? [])
            ->map(fn($v) => is_array($v) ? ($v['slug'] ?? null) : $v)
            ->filter()
            ->values();

        $brandPartners = $brandPartnerSlugs->isEmpty()
            ? BrandPartner::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'logo_path',
                'website_url'
            ])
            : BrandPartner::query()
            ->where('is_active', true)
            ->whereIn('slug', $brandPartnerSlugs)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'logo_path',
                'website_url'
            ]);

        return Inertia::render('Services/Show', [
            'service' => $service->only([
                'id',
                'slug',
                'name',
                'short_description',
                'long_description',
                'icon_name',
                'features',
                'process_steps',
                'faqs',
                'meta_title',
                'meta_description',
            ]),
            'relatedServices' => $relatedServices,
            'brandPartners' => $brandPartners,
        ]);
    }
}
