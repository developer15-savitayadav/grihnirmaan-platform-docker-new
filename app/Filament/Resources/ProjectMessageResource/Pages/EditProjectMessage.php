<?php

namespace App\Filament\Resources\ProjectMessageResource\Pages;

use App\Filament\Resources\ProjectMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Events\ProjectProgressUpdated;

class EditProjectMessage extends EditRecord
{
    protected static string $resource = ProjectMessageResource::class;

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
