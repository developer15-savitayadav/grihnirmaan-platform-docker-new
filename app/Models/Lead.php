<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
class Lead extends Model
{
    use HasFactory, LogsActivity; 

    public const STATUS_NEW = 'new';
    public const STATUS_CONTACTED = 'contacted';
    public const STATUS_QUALIFIED = 'qualified';
    public const STATUS_CONVERTED = 'converted';
    public const STATUS_LOST = 'lost';

    public const FINISH_BUDGET = 'budget';
    public const FINISH_STANDARD = 'standard';
    public const FINISH_PREMIUM = 'premium';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'source',
        'service_interest',
        'plot_size_sqft',
        'estimated_budget',
        'locality',
        'finish_level',
        'raw_payload',
        'status',
        'assigned_to',
        'notes',
        'whatsapp_sent_at',
        'pdf_quote_path',
    ];

    protected $casts = [
        'raw_payload' => 'array',
        'estimated_budget' => 'decimal:2',
        'plot_size_sqft' => 'integer',
        'whatsapp_sent_at' => 'datetime',
    ];

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
     public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'phone',
                'status',
                'assigned_to',
                'notes',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('leads');
    }
}
