<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\CustomerProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
 
class ProjectController extends Controller
{
    public function show(Request $request, CustomerProject $project): Response
    {
        $user = $request->user();

        abort_if(
            $user->role === 'customer' && $project->customer_user_id !== $user->id,
            403
        );

        abort_if(
            $user->role === 'site_supervisor' && $project->assigned_supervisor_id !== $user->id,
            403
        );

        $project->load([
            'customer:id,name,email,phone',
            'supervisor:id,name,email,phone',
            'milestones' => fn($query) => $query->orderBy('expected_date'),
            'documents' => fn($query) => $query->latest(),
            'photos' => fn($query) => $query->latest(),
            'messages.sender:id,name,role',
        ]);

        return Inertia::render('Portal/Projects', [
            'project' => [
                'id' => $project->id,
                'project_code' => $project->project_code,
                'plot_address' => $project->plot_address,
                'current_phase' => $project->current_phase,
                'overall_progress_percent' => $project->overall_progress_percent ?? 0,
                'total_value' => number_format((float) $project->total_value, 2),
                'amount_paid' => number_format((float) $project->amount_paid, 2),
                'balance_amount' => number_format((float) $project->balance_amount, 2),
                'start_date' => optional($project->start_date)->format('d M Y'),
                'expected_completion' => optional($project->expected_completion)->format('d M Y'),

                'customer' => $project->customer ? [
                    'name' => $project->customer->name,
                    'email' => $project->customer->email,
                    'phone' => $project->customer->phone,
                ] : null,

                'supervisor' => $project->supervisor ? [
                    'name' => $project->supervisor->name,
                    'email' => $project->supervisor->email,
                    'phone' => $project->supervisor->phone,
                ] : null,

                'milestones' => $project->milestones->map(fn($milestone) => [
                    'id' => $milestone->id,
                    'milestone_name' => $milestone->milestone_name,
                    'expected_date' => optional($milestone->expected_date)->format('d M Y'),
                    'completed_date' => optional($milestone->completed_date)->format('d M Y'),
                    'status' => $milestone->status,
                    'payment_due' => number_format((float) $milestone->payment_due, 2),
                    'notes' => $milestone->notes,
                ]),

                'documents' => $project->documents->map(fn($document) => [
                    'id' => $document->id,
                    'title' => $document->title,
                    'download_url' => Storage::url($document->file_path),
                    'uploaded_at' => $document->created_at->format('d M Y'),
                ]),

                'photos' => $project->photos->map(fn($photo) => [
                    'id' => $photo->id,
                    'caption' => $photo->caption,
                    'photo_url' => Storage::url($photo->photo_path),
                    'uploaded_at' => $photo->created_at->format('d M Y'),
                ]),

                'messages' => $project->messages->map(fn($message) => [
                    'id' => $message->id,
                    'sender_name' => $message->sender?->name,
                    'sender_role' => $message->sender?->role,
                    'message' => $message->message,
                    'created_at' => $message->created_at->format('d M Y h:i A'),
                ]),
            ],
        ]);
    }
}
