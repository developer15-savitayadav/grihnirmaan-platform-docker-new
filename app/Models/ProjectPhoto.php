<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectPhoto extends Model
{
    protected $fillable = [
        'customer_project_id',
        'photo_path',
        'caption',
        'uploaded_by',
    ];

    public function project()
    {
        return $this->belongsTo(CustomerProject::class, 'customer_project_id');
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
