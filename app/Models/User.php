<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

//     public function hasRole(string $role): bool
//     {
//         return $this->role === $role;
//     }
//     public function isAdmin(): bool
//     {
//         return $this->role === self::ROLE_ADMIN;
//     }
//     public function assignedLeads(): HasMany
//     {
//         return $this->hasMany(Lead::class, 'assigned_to');
//     }
//     public function blogPosts(): HasMany
//     {
//         return $this->hasMany(BlogPost::class, 'author_id');
//     }

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens, TwoFactorAuthenticatable, InteractsWithMedia;

    public const ROLE_ADMIN = 'admin';
    public const ROLE_SALES = 'sales';
    public const ROLE_CUSTOMER = 'customer';
    public const ROLE_SITE_SUPERVISOR = 'site_supervisor';
    public const ROLE_CONTENT_WRITER = 'content_writer';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'password',
        'phone_verified'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasAnyRole([
            'admin',
            'sales',
            self::ROLE_CONTENT_WRITER,
            'site_supervisor',
        ]);
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN || $this->hasRole('admin');
    }

    public function assignedLeads(): HasMany
    {
        return $this->hasMany(Lead::class, 'assigned_to');
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }
    protected static function booted(): void
    {
        static::created(function ($user) {

            if ($user->role) {

                if (!$user->hasRole($user->role)) {
                    $user->assignRole($user->role);
                }
            }
        });

        static::updated(function ($user) {

            if ($user->role) {

                $user->syncRoles([$user->role]);
            }
        });
    }
    /**
     * Customer Projects
     */
    public function customerProjects()
    {
        return $this->hasMany(CustomerProject::class, 'customer_user_id');
    }

    /**
     * Supervisor Assigned Projects
     */
    public function assignedProjects()
    {
        return $this->hasMany(CustomerProject::class, 'assigned_supervisor_id');
    }
   
}
