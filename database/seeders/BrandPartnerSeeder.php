<?php

namespace Database\Seeders;

use App\Models\BrandPartner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandPartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            [ 
                'name' => 'Havells',
                'description' => 'India’s leading FMEG brand for modular switches, fans, and electrical fittings.',
                'website_url' => 'https://www.havells.com',
                'logo_path' => 'uploads/brands/havells.svg',
            ],

            [
                'name' => 'Jaquar',
                'description' => 'Premium bath & sanitaryware brand.',
                'website_url' => 'https://www.jaquar.com',
                'logo_path' => 'uploads/brands/jaquar.svg',
            ],

            [
                'name' => 'UltraTech Cement',
                'description' => 'India’s No. 1 cement brand.',
                'website_url' => 'https://www.ultratechcement.com',
                'logo_path' => 'uploads/brands/ultratech.png',
            ],

            [
                'name' => 'Asian Paints',
                'description' => 'India’s most trusted paint brand.',
                'website_url' => 'https://www.asianpaints.com',
                'logo_path' => 'uploads/brands/asianpaints.avif',
            ],

            [
                'name' => 'Kajaria',
                'description' => 'India’s largest tile manufacturer.',
                'website_url' => 'https://www.kajariaceramics.com',
                'logo_path' => 'uploads/brands/kajaria.svg',
            ],

            [
                'name' => 'Kohler',
                'description' => 'American premium sanitaryware.',
                'website_url' => 'https://www.kohler.co.in',
                'logo_path' => 'uploads/brands/kohler.svg',
            ],
        ];

        foreach ($partners as $p) {
            BrandPartner::updateOrCreate(
                ['slug' => Str::slug($p['name'])],
                array_merge($p, ['is_active' => true]),
            );
        }
    }
}
