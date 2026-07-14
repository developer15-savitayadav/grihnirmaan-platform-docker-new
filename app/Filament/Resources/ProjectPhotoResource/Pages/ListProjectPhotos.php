<?php

namespace App\Filament\Resources\ProjectPhotoResource\Pages;

use App\Filament\Resources\ProjectPhotoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProjectPhotos extends ListRecords
{
    protected static string $resource = ProjectPhotoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
