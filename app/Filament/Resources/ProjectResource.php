<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?string $navigationLabel = 'Projects';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),

                        Forms\Components\TextInput::make('locality')
                            ->maxLength(255),

                        Forms\Components\TextInput::make('plot_size_sqft')
                            ->numeric()
                            ->minValue(0),

                        Forms\Components\TextInput::make('built_up_area_sqft')
                            ->numeric()
                            ->minValue(0),

                        Forms\Components\TextInput::make('bhk')
                            ->label('BHK')
                            ->maxLength(20),

                        Forms\Components\TextInput::make('style')
                            ->maxLength(100),

                        Forms\Components\DatePicker::make('completion_date'),

                        Forms\Components\TextInput::make('duration_months')
                            ->numeric()
                            ->minValue(0),

                        Forms\Components\TextInput::make('budget_range')
                            ->maxLength(100),

                        SpatieMediaLibraryFileUpload::make('hero')
                            ->label('After / Completed Image')
                            ->collection('hero')
                            ->image()
                            ->acceptedFileTypes([
                                'image/jpeg',
                                'image/png',
                                'image/webp',
                            ])
                            ->imageEditor()
                            ->imagePreviewHeight('180')
                            ->maxSize(10240)
                            ->helperText('Allowed: JPG, PNG, WebP. Maximum 10 MB.'),

                        SpatieMediaLibraryFileUpload::make('before')
                            ->label('Before Construction Image')
                            ->collection('before')
                            ->image()
                            ->acceptedFileTypes([
                                'image/jpeg',
                                'image/png',
                                'image/webp',
                            ])
                            ->imageEditor()
                            ->imagePreviewHeight('180')
                            ->maxSize(10240),

                        SpatieMediaLibraryFileUpload::make('floor_plan')
                            ->label('Floor Plan')
                            ->collection('floor_plan')
                            ->image()
                            ->acceptedFileTypes([
                                'image/jpeg',
                                'image/png',
                                'image/webp',
                            ])
                            ->imageEditor()
                            ->imagePreviewHeight('180')
                            ->maxSize(10240),

                        SpatieMediaLibraryFileUpload::make('gallery')
                            ->label('Project Gallery')
                            ->collection('gallery')
                            ->multiple()
                            ->image()
                            ->acceptedFileTypes([
                                'image/jpeg',
                                'image/png',
                                'image/webp',
                            ])
                            ->imageEditor()
                            ->imagePreviewHeight('180')
                            ->maxSize(10240)
                            ->reorderable()
                            ->appendFiles(),

                        Forms\Components\Textarea::make('customer_quote')
                            ->rows(4)
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('challenges_solved')
                            ->rows(4)
                            ->columnSpanFull(),

                        Forms\Components\Toggle::make('is_featured')
                            ->default(false),

                        Forms\Components\TextInput::make('display_order')
                            ->numeric()
                            ->default(0)
                            ->minValue(0),

                        Forms\Components\TextInput::make('meta_title')
                            ->maxLength(255),

                        Forms\Components\Textarea::make('meta_description')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('hero')
                    ->label('Image')
                    ->collection('hero')
                    ->conversion('thumb')
                    ->square()
                    ->size(50)
                    ->defaultImageUrl(asset('images/project-placeholder.webp')),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('locality')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('bhk')
                    ->label('BHK')
                    ->sortable(),

                Tables\Columns\TextColumn::make('budget_range')
                    ->sortable(),

                Tables\Columns\TextColumn::make('duration_months')
                    ->suffix(' months')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('completion_date')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured Projects'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage projects') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage projects') ?? false;
    }

    public static function getGloballySearchableAttributes(): array
    {
        return [
            'title',
            'slug',
            'locality',
            'budget_range',
        ];
    }

    public static function getGlobalSearchResultTitle($record): string
    {
        return $record->title;
    }

    public static function getGlobalSearchResultDetails($record): array
    {
        return [
            'Locality' => $record->locality ?: 'Not specified',
            'Budget' => $record->budget_range ?: 'Not specified',
        ];
    }

    public static function getGlobalSearchResultUrl($record): string
    {
        return static::getUrl('edit', [
            'record' => $record,
        ]);
    }
}