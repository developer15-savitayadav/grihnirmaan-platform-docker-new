<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectMessage extends Model
{
    protected $fillable = [
        'customer_project_id',
        'sender_id',
        'message',
        'attachment_path',
    ];

    public function project()
    {
        return $this->belongsTo(CustomerProject::class, 'customer_project_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
