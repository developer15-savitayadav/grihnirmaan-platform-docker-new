<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectDocument extends Model
{
    protected $fillable = [
        'customer_project_id',
        'title',
        'file_path',
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
