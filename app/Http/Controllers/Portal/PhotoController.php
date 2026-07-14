<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\ProjectPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PhotoController extends Controller
{
    public function index(Request $request): Response
    {
        $photos = ProjectPhoto::query()
            ->with(['project:id,project_code,customer_user_id'])
            ->whereHas('project', function ($query) use ($request) {
                $query->where('customer_user_id', $request->user()->id);
            })
            ->latest()
            ->get()
            ->map(fn ($photo) => [
                'id' => $photo->id,
                'project_code' => $photo->project?->project_code,
                'caption' => $photo->caption,
                'photo_url' => Storage::url($photo->photo_path),
                'uploaded_at' => $photo->created_at->format('d M Y'),
            ]);

        return Inertia::render('Portal/Photos', [
            'photos' => $photos,
        ]);
    }
}
