<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\CustomerProject;
use App\Models\User;
// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
Broadcast::channel('customer-project.{projectId}', function (User $user, int $projectId) {
    $project = CustomerProject::find($projectId);
  
    if (! $project) {
        return false;
    }
    return $project->customer_user_id === $user->id
        || $project->assigned_supervisor_id === $user->id
        || $user->hasRole('admin');
});
