<?php

namespace App\Filament\Resources\CustomerProjectResource\Pages;

use App\Filament\Resources\CustomerProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Events\ProjectProgressUpdated;
class EditCustomerProject extends EditRecord
{
    protected static string $resource = CustomerProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function afterSave(): void
    {
        broadcast(new ProjectProgressUpdated($this->record));
    }
}
