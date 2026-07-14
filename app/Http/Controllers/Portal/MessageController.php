<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\CustomerProject;
use App\Models\ProjectMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = CustomerProject::query()
            ->where('customer_user_id', $request->user()->id)
            ->get(['id', 'project_code']);

        $messages = ProjectMessage::query()
            ->with(['project:id,project_code,customer_user_id', 'sender:id,name,role'])
            ->whereHas('project', function ($query) use ($request) {
                $query->where('customer_user_id', $request->user()->id);
            })
            ->latest()
            ->get()
            ->map(fn ($message) => [
                'id' => $message->id,
                'project_id' => $message->customer_project_id,
                'project_code' => $message->project?->project_code,
                'sender_name' => $message->sender?->name,
                'sender_role' => $message->sender?->role,
                'message' => $message->message,
                'created_at' => $message->created_at->format('d M Y h:i A'),
            ]);

        return Inertia::render('Portal/Messages', [
            'projects' => $projects,
            'messages' => $messages,
        ]);
    } 

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_project_id' => ['required', 'exists:customer_projects,id'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $project = CustomerProject::where('id', $validated['customer_project_id'])
            ->where('customer_user_id', $request->user()->id)
            ->firstOrFail();

        ProjectMessage::create([
            'customer_project_id' => $project->id,
            'sender_id' => $request->user()->id,
            'message' => $validated['message'],
        ]);

        return back()->with('success', 'Message sent successfully.');
    }
}
