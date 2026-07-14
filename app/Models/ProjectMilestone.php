<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMilestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_project_id',
        'milestone_name',
        'expected_date',
        'completed_date',
        'status',
        'payment_due',
        'notes',
    ];

    protected $casts = [
        'expected_date' => 'date',
        'completed_date' => 'date',
        'payment_due' => 'decimal:2',
    ];

    /**
     * Parent Project
     */
    public function project()
    {
        return $this->belongsTo(CustomerProject::class, 'customer_project_id');
    }

    /**
     * Status Badge Color
     */
    public function getStatusColorAttribute()
    {
        return match ($this->status) {
            'pending' => 'secondary',
            'in_progress' => 'warning',
            'completed' => 'success',
            'approved' => 'primary',
            default => 'secondary',
        };
    }
}
