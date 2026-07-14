<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@grihnirmaan.in'],
            [
                'name' => 'GrihNirmaan Admin',
                'phone' => '+919999900001',
                'role' => User::ROLE_ADMIN,
                'password' => Hash::make('Admin@12345'),
                'email_verified_at' => now(),
            ],
        );
    }
}
