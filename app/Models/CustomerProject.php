<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_user_id',
        'project_code',
        'plot_address',
        'start_date',
        'expected_completion',
        'current_phase',
        'overall_progress_percent',
        'total_value',
        'amount_paid',
        'assigned_supervisor_id',
    ];

    protected $casts = [
        'start_date' => 'date',
        'expected_completion' => 'date',
        'total_value' => 'decimal:2',
        'amount_paid' => 'decimal:2',
    ];

    /**
     * Customer
     */
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_user_id');
    }

    /**
     * Assigned Site Supervisor
     */
    public function supervisor()
    {
        return $this->belongsTo(User::class, 'assigned_supervisor_id');
    }

    /**
     * Project Milestones
     */
    public function milestones()
    {
        return $this->hasMany(ProjectMilestone::class, 'customer_project_id');
    }

    /**
     * Remaining Amount
     */
    public function getBalanceAmountAttribute()
    {
        return $this->total_value - $this->amount_paid;
    }

    /**
     * Progress Percentage
     */
    public function calculateProgress()
    {
        $total = $this->milestones()->count();

        if ($total === 0) {
            return 0;
        }

        $completed = $this->milestones()
            ->whereIn('status', ['completed', 'approved'])
            ->count();

        return round(($completed / $total) * 100);
    }
    public function documents()
    {
        return $this->hasMany(ProjectDocument::class);
    }

    public function photos()
    {
        return $this->hasMany(ProjectPhoto::class);
    }

    public function messages()
    {
        return $this->hasMany(ProjectMessage::class);
    }
}
