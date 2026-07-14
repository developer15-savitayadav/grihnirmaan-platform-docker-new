<?php

namespace App\Filament\Resources\ProjectMilestoneResource\Pages;

use App\Filament\Resources\ProjectMilestoneResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Events\ProjectProgressUpdated;

class EditProjectMilestone extends EditRecord
{
    protected static string $resource = ProjectMilestoneResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function afterSave(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            event(new ProjectProgressUpdated($this->record->project));
        }
    }
}
