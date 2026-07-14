<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'project_slug' => 'sharma-residence-gomti-nagar',
                'customer_name' => 'Rahul Sharma',
                'content' => 'From Bhumi Poojan to handover, GrihNirmaan handled everything with complete transparency. Weekly photo updates, no surprise costs, and finishing quality way above what we expected.',
                'rating' => 5,
            ],
            [
                'project_slug' => 'verma-villa-sushant-golf-city',
                'customer_name' => 'Anita Verma',
                'content' => 'We were terrified of contractor fraud after hearing horror stories from neighbours. GrihNirmaan’s milestone-based payments through escrow gave us total peace of mind.',
                'rating' => 5,
            ],
            [
                'project_slug' => 'singh-bungalow-aliganj',
                'customer_name' => 'Manmohan Singh',
                'content' => 'The architecture team understood our vision for a Lucknowi-style facade and delivered exactly that, while keeping the interiors very modern. Highly recommended.',
                'rating' => 5,
            ],
        ];

        foreach ($items as $row) {
            $projectId = Project::where('slug', $row['project_slug'])->value('id');

            Testimonial::updateOrCreate(
                ['customer_name' => $row['customer_name'], 'project_id' => $projectId],
                [
                    'content' => $row['content'],
                    'rating' => $row['rating'],
                    'is_featured' => true,
                ],
            );
        }
    }
}
