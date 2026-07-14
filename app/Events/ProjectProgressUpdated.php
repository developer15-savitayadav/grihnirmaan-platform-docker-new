<?php

namespace App\Events;

use App\Models\CustomerProject;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ProjectProgressUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public CustomerProject $project)
    {
        $this->project->refresh();
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('customer-project.' . $this->project->id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'progress.updated';
    }

    public function broadcastWith(): array
    {
        $this->project->refresh()->load([
            'customer',
            'supervisor',
            'milestones',
            'documents',
            'photos',
            'messages.sender',
        ]);

        $nextMilestone = $this->project->milestones()
            ->whereIn('status', ['pending', 'in_progress'])
            ->orderBy('expected_date')
            ->first();

        return [
            'project' => [
                'id' => $this->project->id,
                'project_code' => $this->project->project_code,
                'plot_address' => $this->project->plot_address,
                'current_phase' => $this->project->current_phase,
                'overall_progress_percent' => (int) ($this->project->overall_progress_percent ?? 0),
                'total_value' => $this->project->total_value,
                'amount_paid' => $this->project->amount_paid,
                'balance_amount' => $this->project->balance_amount,
                'start_date' => optional($this->project->start_date)->format('d M Y'),
                'expected_completion' => optional($this->project->expected_completion)->format('d M Y'),

                'customer' => $this->project->customer ? [
                    'name' => $this->project->customer->name,
                    'email' => $this->project->customer->email,
                    'phone' => $this->project->customer->phone,
                ] : null,

                'supervisor' => $this->project->supervisor ? [
                    'name' => $this->project->supervisor->name,
                    'email' => $this->project->supervisor->email,
                    'phone' => $this->project->supervisor->phone,
                ] : null,

                'milestones' => $this->project->milestones()
                    ->orderBy('expected_date')
                    ->get()
                    ->map(fn($milestone) => [
                        'id' => $milestone->id,
                        'milestone_name' => $milestone->milestone_name,
                        'expected_date' => optional($milestone->expected_date)->format('d M Y'),
                        'completed_date' => optional($milestone->completed_date)->format('d M Y'),
                        'status' => $milestone->status,
                        'payment_due' => $milestone->payment_due,
                        'notes' => $milestone->notes,
                    ])
                    ->values(),

                'documents' => $this->project->documents()
                    ->latest()
                    ->get()
                    ->map(fn($document) => [
                        'id' => $document->id,
                        'title' => $document->title,
                        'uploaded_at' => $document->created_at->format('d M Y'),
                        'download_url' => URL::temporarySignedRoute(
                            'portal.documents.download',
                            now()->addHour(),
                            ['document' => $document->id]
                        ),
                    ])
                    ->values(),

                'photos' => $this->project->photos()
                    ->latest()
                    ->get()
                    ->map(fn($photo) => [
                        'id' => $photo->id,
                        'caption' => $photo->caption,
                        'uploaded_at' => $photo->created_at->format('d M Y'),
                        'photo_url' => Storage::disk('public')->url($photo->photo_path),
                    ])
                    ->values(),

                'messages' => $this->project->messages()
                    ->with('sender')
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(fn($message) => [
                        'id' => $message->id,
                        'sender_name' => $message->sender?->name,
                        'sender_role' => $message->sender?->role,
                        'message' => $message->message,
                        'created_at' => $message->created_at->format('d M Y, h:i A'),
                    ])
                    ->values(),

                'documents_count' => $this->project->documents()->count(),
                'photos_count' => $this->project->photos()->count(),
                'messages_count' => $this->project->messages()->count(),
                'milestones_count' => $this->project->milestones()->count(),
                'completed_milestones_count' => $this->project->milestones()
                    ->whereIn('status', ['completed', 'approved'])
                    ->count(),

                'next_milestone' => $nextMilestone ? [
                    'name' => $nextMilestone->milestone_name,
                    'expected_date' => optional($nextMilestone->expected_date)->format('d M Y'),
                    'status' => $nextMilestone->status,
                    'payment_due' => $nextMilestone->payment_due,
                ] : null,

                'updated_at' => now()->format('d M Y, h:i A'),
            ],
        ];
    }
}
