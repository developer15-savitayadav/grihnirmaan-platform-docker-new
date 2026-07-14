<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\CustomerProject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    { 
        $user = $request->user();

        $projects = CustomerProject::query()
            ->with([
                'supervisor:id,name,email,phone',
                'milestones' => fn ($query) => $query->orderBy('expected_date'),
                'documents:id,customer_project_id',
                'photos:id,customer_project_id',
                'messages:id,customer_project_id',
            ])
            ->when($user->role === 'customer', function ($query) use ($user) {
                $query->where('customer_user_id', $user->id);
            })
            ->when($user->role === 'site_supervisor', function ($query) use ($user) {
                $query->where('assigned_supervisor_id', $user->id);
            })
            ->latest()
            ->get()
            ->map(function ($project) {
                $nextMilestone = $project->milestones
                    ->whereIn('status', ['pending', 'in_progress'])
                    ->first();

                $completedMilestones = $project->milestones
                    ->whereIn('status', ['completed', 'approved'])
                    ->count();

                return [
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

                    'documents_count' => $project->documents->count(),
                    'photos_count' => $project->photos->count(),
                    'messages_count' => $project->messages->count(),

                    'milestones_count' => $project->milestones->count(),
                    'completed_milestones_count' => $completedMilestones,

                    'next_milestone' => $nextMilestone ? [
                        'name' => $nextMilestone->milestone_name,
                        'expected_date' => optional($nextMilestone->expected_date)->format('d M Y'),
                        'status' => $nextMilestone->status,
                        'payment_due' => number_format((float) $nextMilestone->payment_due, 2),
                    ] : null,

                    'supervisor' => $project->supervisor ? [
                        'name' => $project->supervisor->name,
                        'email' => $project->supervisor->email,
                        'phone' => $project->supervisor->phone,
                    ] : null,
                ];
            });

        return Inertia::render('Portal/Dashboard', [
            'projects' => $projects,
        ]);
    }
}
