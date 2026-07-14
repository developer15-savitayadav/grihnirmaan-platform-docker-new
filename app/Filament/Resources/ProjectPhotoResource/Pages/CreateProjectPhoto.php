<?php

namespace App\Filament\Resources\ProjectPhotoResource\Pages;

use App\Filament\Resources\ProjectPhotoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Events\ProjectProgressUpdated;

class CreateProjectPhoto extends CreateRecord
{
    protected static string $resource = ProjectPhotoResource::class;
    protected function afterCreate(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            event(new ProjectProgressUpdated($this->record->project));
        }
    }
}
