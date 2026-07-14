<?php

namespace App\Filament\Resources\ProjectDocumentResource\Pages;

use App\Events\ProjectProgressUpdated;
use App\Filament\Resources\ProjectDocumentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProjectDocument extends EditRecord
{
    protected static string $resource = ProjectDocumentResource::class;

    protected function afterSave(): void
    {
        $this->record->load('project');

        if ($this->record->project) {
            broadcast(new ProjectProgressUpdated($this->record->project));
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->after(function () {
                    if ($this->record->project) {
                        broadcast(new ProjectProgressUpdated($this->record->project));
                    }
                }),
        ];
    }
}
