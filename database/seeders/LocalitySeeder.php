<?php

namespace Database\Seeders;

use App\Models\Locality;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LocalitySeeder extends Seeder
{
    public function run(): void
    {
        $localities = [
            ['name' => 'Gomti Nagar',           'multiplier' => 1.25], // premium
            ['name' => 'Gomti Nagar Extension', 'multiplier' => 1.15], // premium
            ['name' => 'Hazratganj',            'multiplier' => 1.30], // premium (CBD)
            ['name' => 'Aliganj',               'multiplier' => 1.05], // standard+
            ['name' => 'Indira Nagar',          'multiplier' => 1.05], // standard+
            ['name' => 'Mahanagar',             'multiplier' => 1.10], // standard+
            ['name' => 'Vikas Nagar',           'multiplier' => 1.00], // standard
            ['name' => 'Sushant Golf City',     'multiplier' => 1.20], // premium
            ['name' => 'Shaheed Path',          'multiplier' => 1.15], // premium
            ['name' => 'LDA Colony',            'multiplier' => 1.00], // standard
            ['name' => 'Jankipuram',            'multiplier' => 0.95], // budget+
            ['name' => 'Chinhat',               'multiplier' => 0.90], // budget
            ['name' => 'Faizabad Road',         'multiplier' => 0.95], // budget+
            ['name' => 'Kanpur Road',           'multiplier' => 0.90], // budget
            ['name' => 'Raebareli Road',        'multiplier' => 0.85], // budget
        ];

        foreach ($localities as $row) {
            Locality::updateOrCreate(
                ['slug' => Str::slug($row['name'])],
                [
                    'name' => $row['name'],
                    'city' => 'Lucknow',
                    'base_price_multiplier' => $row['multiplier'],
                    'is_active' => true,
                ],
            );
        }
    }
}
