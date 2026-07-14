<?php

namespace App\Filament\Resources\ProjectDocumentResource\Pages;

use App\Events\ProjectProgressUpdated;
use App\Filament\Resources\ProjectDocumentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProjectDocument extends CreateRecord
{
    protected static string $resource = ProjectDocumentResource::class;

    protected function afterCreate(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            broadcast(new ProjectProgressUpdated($this->record->project));
        }
    }
}
