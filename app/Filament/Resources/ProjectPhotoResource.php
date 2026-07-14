<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectPhotoResource\Pages;
use App\Models\CustomerProject;
use App\Models\ProjectPhoto;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectPhotoResource extends Resource
{
    protected static ?string $model = ProjectPhoto::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Customer Portal';

    protected static ?string $navigationLabel = 'Site Photos';

    public static function shouldRegisterNavigation(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'site_supervisor']);
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('customer_project_id')
                ->label('Project')
                ->options(CustomerProject::pluck('project_code', 'id'))
                ->searchable()
                ->required(),

            Forms\Components\FileUpload::make('photo_path')
                ->label('Photo')
                ->image()
                ->directory('portal/photos')
                ->required(),

            Forms\Components\TextInput::make('caption')
                ->maxLength(255),

            Forms\Components\Hidden::make('uploaded_by')
                ->default(fn () => auth()->id()),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo_path')
                    ->label('Photo'),

                Tables\Columns\TextColumn::make('project.project_code')
                    ->label('Project'),

                Tables\Columns\TextColumn::make('caption')
                    ->searchable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y h:i A'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn () => auth()->user()?->role === 'admin'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjectPhotos::route('/'),
            'create' => Pages\CreateProjectPhoto::route('/create'),
            'edit' => Pages\EditProjectPhoto::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'customer_project_id',
        'caption',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->title;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Caption'=>$record->caption,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
