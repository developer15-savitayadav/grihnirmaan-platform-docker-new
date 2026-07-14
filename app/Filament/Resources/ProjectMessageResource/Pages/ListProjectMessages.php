<?php

namespace App\Filament\Resources\ProjectMessageResource\Pages;

use App\Filament\Resources\ProjectMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProjectMessages extends ListRecords
{
    protected static string $resource = ProjectMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
