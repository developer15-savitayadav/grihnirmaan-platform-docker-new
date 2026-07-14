<?php

namespace App\Filament\Resources\ProjectPhotoResource\Pages;

use App\Filament\Resources\ProjectPhotoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Events\ProjectProgressUpdated;

class EditProjectPhoto extends EditRecord
{
    protected static string $resource = ProjectPhotoResource::class;

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
