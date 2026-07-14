<?php

namespace App\Filament\Resources\ProjectMilestoneResource\Pages;

use App\Filament\Resources\ProjectMilestoneResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Events\ProjectProgressUpdated;

class CreateProjectMilestone extends CreateRecord
{
    protected static string $resource = ProjectMilestoneResource::class;
    protected function afterCreate(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            event(new ProjectProgressUpdated($this->record->project));
        }
    }
}
