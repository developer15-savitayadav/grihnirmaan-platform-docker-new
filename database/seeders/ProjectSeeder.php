<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'sharma-residence-gomti-nagar',
                'title' => 'Sharma Residence',
                'locality' => 'Gomti Nagar',
                'plot_size_sqft' => 2400,
                'built_up_area_sqft' => 3800,
                'bhk' => '4BHK',
                'style' => 'Modern Contemporary',
                'completion_date' => '2025-08-15',
                'duration_months' => 9,
                'budget_range' => '₹1.2 - 1.5 Cr',
                'customer_quote' => 'GrihNirmaan delivered exactly what they promised — on time, on budget, and beautifully finished.',
                'challenges_solved' => 'Tight timeline (Diwali handover) on a corner plot with awkward setbacks. Optimised layout to maximise built-up area.',
                'hero_image_path' => 'uploads/projects/placeholder-1.jpg',
                'is_featured' => true,
                'display_order' => 1,
            ],
            [
                'slug' => 'verma-villa-sushant-golf-city',
                'title' => 'Verma Villa',
                'locality' => 'Sushant Golf City',
                'plot_size_sqft' => 3600,
                'built_up_area_sqft' => 5200,
                'bhk' => '5BHK',
                'style' => 'Indo-Mediterranean',
                'completion_date' => '2025-11-20',
                'duration_months' => 12,
                'budget_range' => '₹2.0 - 2.5 Cr',
                'customer_quote' => 'Every detail — from the marble selection to the home theatre — exceeded expectations.',
                'challenges_solved' => 'Vastu-compliant layout for a south-east plot, basement parking, and integrated home automation.',
                'hero_image_path' => 'uploads/projects/placeholder-2.jpg',
                'is_featured' => true,
                'display_order' => 2,
            ],
            [
                'slug' => 'singh-bungalow-aliganj',
                'title' => 'Singh Bungalow',
                'locality' => 'Aliganj',
                'plot_size_sqft' => 1800, 
                'built_up_area_sqft' => 2600,
                'bhk' => '3BHK',
                'style' => 'Traditional Lucknowi',
                'completion_date' => '2025-05-10',
                'duration_months' => 8,
                'budget_range' => '₹65 L - 80 L',
                'customer_quote' => 'They preserved the character of old Lucknow architecture while making it functional for modern life.',
                'challenges_solved' => 'Heritage-style facade with jharokhas and chajjas, while keeping interior layout fully modern.',
                'hero_image_path' => 'uploads/projects/placeholder-3.jpg',
                'is_featured' => true,
                'display_order' => 3,
            ],
        ];

        foreach ($projects as $row) {
            Project::updateOrCreate(
                ['slug' => $row['slug']],
                array_merge($row, [
                    'meta_title' => "{$row['title']} — {$row['locality']} | GrihNirmaan",
                    'meta_description' => substr($row['customer_quote'], 0, 160),
                ]),
            );
        }
    }
}
