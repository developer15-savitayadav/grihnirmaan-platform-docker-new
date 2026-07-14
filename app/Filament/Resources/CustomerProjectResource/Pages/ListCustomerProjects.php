<?php

namespace App\Filament\Resources\CustomerProjectResource\Pages;

use App\Filament\Resources\CustomerProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCustomerProjects extends ListRecords
{
    protected static string $resource = CustomerProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
