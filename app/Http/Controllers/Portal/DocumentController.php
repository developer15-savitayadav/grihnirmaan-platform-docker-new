<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\ProjectDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $documents = ProjectDocument::query()
            ->with(['project:id,project_code,customer_user_id,assigned_supervisor_id'])
            ->whereHas('project', function ($query) use ($request) {
                $user = $request->user();

                if ($user->role === 'customer') {
                    $query->where('customer_user_id', $user->id);
                }

                if ($user->role === 'site_supervisor') {
                    $query->where('assigned_supervisor_id', $user->id);
                }
            })
            ->latest()
            ->get()
            ->map(fn ($document) => [
                'id' => $document->id,
                'title' => $document->title,
                'project_code' => $document->project?->project_code,
                'uploaded_at' => $document->created_at->format('d M Y'),
                'download_url' => URL::temporarySignedRoute(
                    'portal.documents.download',
                    now()->addHour(),
                    ['document' => $document->id]
                ),
            ]);

        return Inertia::render('Portal/Documents', [
            'documents' => $documents,
        ]);
    }

    public function download(Request $request, ProjectDocument $document)
    {
        $user = $request->user();

        $document->load('project'); 

        abort_if(
            $user->role === 'customer' &&
            $document->project->customer_user_id !== $user->id,
            403
        );

        abort_if(
            $user->role === 'site_supervisor' &&
            $document->project->assigned_supervisor_id !== $user->id,
            403
        );

        abort_unless(Storage::disk('public')->exists($document->file_path), 404);

        return Storage::disk('public')->download(
            $document->file_path,
            $document->title
        );
    }
}
