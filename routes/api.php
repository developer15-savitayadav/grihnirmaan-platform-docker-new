<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CostCalculatorController;
use App\Http\Controllers\LeadController;
 use App\Http\Controllers\Api\PortalProjectController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\ProjectController;

Route::post('/cost-calculator', [CostCalculatorController::class, 'calculate'])
    ->middleware('throttle:10,1');


Route::post('/leads', [LeadController::class, 'store'])
    ->name('api.leads.store');


Route::middleware('auth:sanctum')->prefix('portal')->group(function () {
    Route::get('/projects', [PortalProjectController::class, 'projects']);
    Route::get('/projects/{project}/milestones', [PortalProjectController::class, 'milestones']);
});
Route::get('/projects', [ProjectController::class, 'apiList']);