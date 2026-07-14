<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectDocumentResource\Pages;
use App\Models\CustomerProject;
use App\Models\ProjectDocument;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectDocumentResource extends Resource
{
    protected static ?string $model = ProjectDocument::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Customer Portal';

    protected static ?string $navigationLabel = 'Project Documents';

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

            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255),

            Forms\Components\FileUpload::make('file_path')
                ->label('Document')
                ->directory('portal/documents')
                ->required(),

            Forms\Components\Hidden::make('uploaded_by')
                ->default(fn () => auth()->id()),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('project.project_code')
                    ->label('Project')
                    ->searchable(),

                Tables\Columns\TextColumn::make('title')
                    ->searchable(),

                Tables\Columns\TextColumn::make('uploader.name')
                    ->label('Uploaded By'),

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
            'index' => Pages\ListProjectDocuments::route('/'),
            'create' => Pages\CreateProjectDocument::route('/create'),
            'edit' => Pages\EditProjectDocument::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'title',
        'customer_project_id',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->title;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'customer_project_id'=>$record->document_type,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
