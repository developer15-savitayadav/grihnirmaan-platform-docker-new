<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?string $navigationLabel = 'Projects';

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\Section::make('Project Details')
                ->schema([

                    Forms\Components\Tabs::make('Translations')
                        ->tabs([
                            Forms\Components\Tabs\Tab::make('English')
                                ->schema([
                                    Forms\Components\TextInput::make('title_en')
                                        ->label('Title (English)')
                                        ->required()
                                        ->maxLength(255)
                                        ->live(onBlur: true)
                                        ->afterStateHydrated(function (Forms\Components\TextInput $component, ?Project $record) {
                                            $component->state($record?->getTranslation('title', 'en') ?? '');
                                        })
                                        ->afterStateUpdated(
                                            fn($state, callable $set) =>
                                            $set('slug', \Str::slug($state))
                                        ),

                                    Forms\Components\TextInput::make('locality_en')
                                        ->label('Locality (English)')
                                        ->maxLength(255)
                                        ->afterStateHydrated(function (Forms\Components\TextInput $component, ?Project $record) {
                                            $component->state($record?->getTranslation('locality', 'en') ?? '');
                                        }),
                                ])
                                ->columns(2),

                            Forms\Components\Tabs\Tab::make('हिन्दी')
                                ->schema([
                                    Forms\Components\TextInput::make('title_hi')
                                        ->label('Title (Hindi)')
                                        ->maxLength(255)
                                        ->afterStateHydrated(function (Forms\Components\TextInput $component, ?Project $record) {
                                            $component->state($record?->getTranslation('title', 'hi') ?? '');
                                        }),

                                    Forms\Components\TextInput::make('locality_hi')
                                        ->label('Locality (Hindi)')
                                        ->maxLength(255)
                                        ->afterStateHydrated(function (Forms\Components\TextInput $component, ?Project $record) {
                                            $component->state($record?->getTranslation('locality', 'hi') ?? '');
                                        }),
                                ])
                                ->columns(2),
                        ])
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\TextInput::make('plot_size_sqft')
                        ->numeric(),

                    Forms\Components\TextInput::make('built_up_area_sqft')
                        ->numeric(),

                    Forms\Components\TextInput::make('bhk')
                        ->label('BHK')
                        ->maxLength(20),

                    Forms\Components\TextInput::make('style')
                        ->maxLength(100),

                    Forms\Components\DatePicker::make('completion_date'),

                    Forms\Components\TextInput::make('duration_months')
                        ->numeric(),

                    Forms\Components\TextInput::make('budget_range')
                        ->maxLength(100),

                    SpatieMediaLibraryFileUpload::make('hero')
    ->label('After / Completed Image')
    ->collection('hero')
    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
    ->image()
    ->imageEditor()
    ->imagePreviewHeight('180')
    ->saveUploadedFileUsing(function (TemporaryUploadedFile $file, Project $record) {
        $media = $record
            ->addMedia($file->getRealPath())
            ->usingFileName($file->getClientOriginalName())
            ->toMediaCollection('hero');

        $record->update([
            'hero_image_path' => $media->getPathRelativeToRoot(),
        ]);

        return $media->uuid;
    }),


                    SpatieMediaLibraryFileUpload::make('before')
                        ->label('Before Construction Image')
                        ->collection('before')
                        ->image()
                        ->imageEditor()
                        ->saveUploadedFileUsing(function (TemporaryUploadedFile $file, Project $record) {
                            $media = $record
                                ->addMedia($file->getRealPath())
                                ->usingFileName($file->getClientOriginalName())
                                ->toMediaCollection('before');

                            $record->update([
                                'before_image_path' => $media->getPathRelativeToRoot(),
                            ]);

                            return $media->uuid;
                        }),

                    SpatieMediaLibraryFileUpload::make('floor_plan')
                        ->label('Floor Plan')
                        ->collection('floor_plan')
                        ->image()
                        ->imageEditor()
                        ->saveUploadedFileUsing(function (TemporaryUploadedFile $file, Project $record) {
                            $media = $record
                                ->addMedia($file->getRealPath())
                                ->usingFileName($file->getClientOriginalName())
                                ->toMediaCollection('floor_plan');

                            $record->update([
                                'floor_plan_path' => $media->getPathRelativeToRoot(),
                            ]);

                            return $media->uuid;
                        }),

                    SpatieMediaLibraryFileUpload::make('gallery')
                        ->label('Project Gallery')
                        ->collection('gallery')
                        ->multiple()
                        ->image()
                        ->imageEditor(),


                    Forms\Components\Tabs::make('Story Translations')
                        ->tabs([
                            Forms\Components\Tabs\Tab::make('English')
                                ->schema([
                                    Forms\Components\Textarea::make('customer_quote_en')
                                        ->label('Customer Quote (English)')
                                        ->rows(4)
                                        ->columnSpanFull()
                                        ->afterStateHydrated(function (Forms\Components\Textarea $component, ?Project $record) {
                                            $component->state($record?->getTranslation('customer_quote', 'en') ?? '');
                                        }),

                                    Forms\Components\Textarea::make('challenges_solved_en')
                                        ->label('Challenges Solved (English)')
                                        ->rows(4)
                                        ->columnSpanFull()
                                        ->afterStateHydrated(function (Forms\Components\Textarea $component, ?Project $record) {
                                            $component->state($record?->getTranslation('challenges_solved', 'en') ?? '');
                                        }),
                                ]),

                            Forms\Components\Tabs\Tab::make('हिन्दी')
                                ->schema([
                                    Forms\Components\Textarea::make('customer_quote_hi')
                                        ->label('Customer Quote (Hindi)')
                                        ->rows(4)
                                        ->columnSpanFull()
                                        ->afterStateHydrated(function (Forms\Components\Textarea $component, ?Project $record) {
                                            $component->state($record?->getTranslation('customer_quote', 'hi') ?? '');
                                        }),

                                    Forms\Components\Textarea::make('challenges_solved_hi')
                                        ->label('Challenges Solved (Hindi)')
                                        ->rows(4)
                                        ->columnSpanFull()
                                        ->afterStateHydrated(function (Forms\Components\Textarea $component, ?Project $record) {
                                            $component->state($record?->getTranslation('challenges_solved', 'hi') ?? '');
                                        }),
                                ]),
                        ])
                        ->columnSpanFull(),

                    Forms\Components\Toggle::make('is_featured')
                        ->default(false),

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

                Tables\Columns\ImageColumn::make('hero_image_path')
                    ->label('Image')
                    ->getStateUsing(function ($record) {
                        $path = $record->hero_image_path;

                        if (blank($path)) {
                            return null;
                        }

                        if (str_starts_with($path, '/storage/')) {
                            return asset(ltrim($path, '/'));
                        }

                        if (str_starts_with($path, 'storage/')) {
                            return asset($path);
                        }

                        if (str_starts_with($path, 'public/storage/')) {
                            return asset(str_replace('public/', '', $path));
                        }

                        return asset('storage/' . ltrim($path, '/'));
                    })
                    ->square()
                    ->size(50),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('locality')
                    ->searchable(),

                Tables\Columns\TextColumn::make('bhk')
                    ->label('BHK')
                    ->sortable(),

                Tables\Columns\TextColumn::make('budget_range')
                    ->sortable(),

                Tables\Columns\TextColumn::make('duration_months')
                    ->suffix(' months'),

                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('completion_date')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y'),
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
        'Locality' => $record->locality,
        'Budget' => $record->budget_range,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
} 
