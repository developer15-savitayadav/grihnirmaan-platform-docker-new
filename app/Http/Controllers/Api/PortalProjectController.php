<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortalProjectController extends Controller
{
    public function projects(Request $request): JsonResponse
    {
        $projects = CustomerProject::with(['supervisor', 'milestones'])
            ->where('customer_user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_code' => $project->project_code,
                    'plot_address' => $project->plot_address,
                    'start_date' => optional($project->start_date)->format('d M Y'),
                    'expected_completion' => optional($project->expected_completion)->format('d M Y'),
                    'current_phase' => $project->current_phase,
                    'overall_progress_percent' => $project->overall_progress_percent,
                    'total_value' => $project->total_value,
                    'amount_paid' => $project->amount_paid,
                    'balance_amount' => $project->balance_amount,
                    'supervisor' => $project->supervisor ? [
                        'id' => $project->supervisor->id,
                        'name' => $project->supervisor->name,
                        'email' => $project->supervisor->email,
                        'phone' => $project->supervisor->phone ?? null,
                    ] : null,
                    'milestones_count' => $project->milestones->count(),
                ];
            });

        return response()->json([
            'success' => true,
            'projects' => $projects,
        ]);
    }

    public function milestones(Request $request, CustomerProject $project): JsonResponse
    {
        if ($project->customer_user_id !== $request->user()->id) {
            abort(403, 'Unauthorized access.');
        }

        $milestones = $project->milestones()
            ->orderBy('expected_date')
            ->get()
            ->map(function ($milestone) {
                return [
                    'id' => $milestone->id,
                    'milestone_name' => $milestone->milestone_name,
                    'expected_date' => optional($milestone->expected_date)->format('d M Y'),
                    'completed_date' => optional($milestone->completed_date)->format('d M Y'),
                    'status' => $milestone->status,
                    'status_color' => $milestone->status_color,
                    'payment_due' => $milestone->payment_due,
                    'notes' => $milestone->notes,
                ];
            });

        return response()->json([
            'success' => true,
            'project' => [
                'id' => $project->id,
                'project_code' => $project->project_code,
                'current_phase' => $project->current_phase,
                'overall_progress_percent' => $project->overall_progress_percent,
            ],
            'milestones' => $milestones,
        ]);
    }
     public function photos($id)
    {
        $project = CustomerProject::where('customer_user_id', auth()->id())
            ->findOrFail($id);

        return response()->json($project->photos);
    }

    public function documents($id)
    {
        $project = CustomerProject::where('customer_user_id', auth()->id())
            ->findOrFail($id);

        return response()->json($project->documents);
    }
}
