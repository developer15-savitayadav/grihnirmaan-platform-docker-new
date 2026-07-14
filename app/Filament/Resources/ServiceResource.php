<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?string $navigationLabel = 'Services';

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\Section::make('Service Details')
                ->schema([

                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(150)
                        ->live(onBlur: true)
                        ->afterStateUpdated(
                            fn($state, callable $set) =>
                            $set('slug', \Str::slug($state))
                        ),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(100),

                    Forms\Components\TextInput::make('icon_name')
                        ->label('Icon Name')
                        ->maxLength(50),

                    Forms\Components\Textarea::make('short_description')
                        ->rows(3)
                        ->maxLength(255)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('long_description')
                        ->columnSpanFull(),

                    Forms\Components\Toggle::make('is_active')
                        ->default(true),
                ])
                ->columns(2),

            Forms\Components\Section::make('Features')
                ->schema([
                    Forms\Components\TagsInput::make('features')
                        ->placeholder('Add feature')
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Process Steps')
                ->description('Add expandable timeline steps with photos and YouTube video URL.')
                ->schema([
                    Forms\Components\Repeater::make('process_steps')
                        ->schema([
                            Forms\Components\TextInput::make('title')
                                ->required()
                                ->maxLength(150),

                            Forms\Components\Textarea::make('description')
                                ->required()
                                ->rows(3)
                                ->columnSpanFull(),

                            Forms\Components\FileUpload::make('photos')
                                ->label('Step Photos')
                                ->multiple()
                                ->image()
                                ->imageEditor()
                                ->directory('services')
                                ->disk('public')
                                ->visibility('public')
                                ->reorderable()
                                ->columnSpanFull(),

                            Forms\Components\TextInput::make('video_url')
                                ->label('YouTube Video URL')
                                ->url()
                                ->placeholder('https://www.youtube.com/watch?v=VIDEO_ID')
                                ->columnSpanFull(),
                        ])
                        ->columns(2)
                        ->addActionLabel('Add Process Step')
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('FAQs')
                ->schema([
                    Forms\Components\Repeater::make('serviceFaqs')
                        ->relationship('serviceFaqs')
                        ->schema([
                            Forms\Components\TextInput::make('question')
                                ->required()
                                ->maxLength(255),

                            Forms\Components\Textarea::make('answer')
                                ->required()
                                ->rows(3)
                                ->columnSpanFull(),

                            Forms\Components\TextInput::make('category')
                                ->maxLength(100),

                            Forms\Components\TextInput::make('display_order')
                                ->numeric()
                                ->default(0),

                            Forms\Components\Toggle::make('is_active')
                                ->default(true),
                        ])
                        ->columns(2)
                        ->orderColumn('display_order')
                        ->addActionLabel('Add FAQ')
                        ->reorderable()
                        ->collapsible()
                        ->cloneable()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('SEO')
                ->schema([
                    Forms\Components\TextInput::make('meta_title')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('meta_description')
                        ->rows(3)
                        ->maxLength(500)
                        ->columnSpanFull(),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('icon_name')
                    ->label('Icon')
                    ->toggleable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])

            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status'),
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
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage services') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage services') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'name',
        'slug',
        'short_description',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->name;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Slug' => $record->slug,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
}
