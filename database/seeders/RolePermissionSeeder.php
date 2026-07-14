<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view dashboard',

            'manage leads',
            'manage services',
            'manage projects',
            'manage blogs',
            'manage testimonials',
            'manage faqs',
            'manage brand partners',
            'manage localities',

            'manage users',
            'manage roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $sales = Role::firstOrCreate(['name' => 'sales', 'guard_name' => 'web']);
        $contentWriter = Role::firstOrCreate(['name' => 'content_writer', 'guard_name' => 'web']);
        $siteSupervisor = Role::firstOrCreate(['name' => 'site_supervisor', 'guard_name' => 'web']);
        $customer = Role::firstOrCreate(['name' => 'customer', 'guard_name' => 'web']);

        $admin->syncPermissions($permissions);

        $sales->syncPermissions([
            'view dashboard',
            'manage leads',
        ]);

        $contentWriter->syncPermissions([
            'view dashboard',
            'manage services',
            'manage projects',
            'manage blogs',
            'manage testimonials',
            'manage faqs',
            'manage brand partners',
            'manage localities',
        ]);

        $siteSupervisor->syncPermissions([
            'view dashboard',
            'manage projects',
        ]);

        $customer->syncPermissions([]);

        $user = User::first();

        if ($user) {
            $user->assignRole('admin');
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
