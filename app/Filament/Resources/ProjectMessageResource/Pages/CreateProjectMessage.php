<?php

namespace App\Filament\Resources\ProjectMessageResource\Pages;

use App\Filament\Resources\ProjectMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Events\ProjectProgressUpdated;

class CreateProjectMessage extends CreateRecord
{
    protected static string $resource = ProjectMessageResource::class;
    protected function afterCreate(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            event(new ProjectProgressUpdated($this->record->project));
        }
    }
}
