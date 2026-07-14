<?php

namespace App\Filament\Resources\CustomerProjectResource\Pages;

use App\Filament\Resources\CustomerProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Events\ProjectProgressUpdated;
class CreateCustomerProject extends CreateRecord
{
    protected static string $resource = CustomerProjectResource::class;
    protected function afterCreate(): void
    {
        broadcast(new ProjectProgressUpdated($this->record));
    }
}
