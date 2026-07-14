<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?string $navigationLabel = 'Testimonials';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Customer Testimonial')
                    ->schema([
                        Forms\Components\FileUpload::make('customer_photo')
                            ->label('Customer Photo')
                            ->image()
                            ->disk('public')
                            ->directory('testimonials')
                            ->imageEditor()
                            ->nullable()
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('customer_name')
                            ->label('Customer Name')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('project_id')
                            ->numeric()
                            ->label('Project ID'),

                        Forms\Components\Textarea::make('content')
                            ->label('Review')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('video_url')
                            ->url()
                            ->label('Video URL'),

                        Forms\Components\TextInput::make('rating')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(5)
                            ->default(5),

                        Forms\Components\Toggle::make('is_featured')
                            ->label('Featured')
                            ->default(false),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('customer_photo')
                    ->label('Photo')
                    ->disk('public')
                    ->circular()
                    ->size(60),

                Tables\Columns\TextColumn::make('customer_name')
                    ->label('Customer Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('project_id')
                    ->label('Project ID')
                    ->sortable(),

                Tables\Columns\TextColumn::make('rating')
                    ->label('Rating')
                    ->badge()
                    ->suffix(' ★'),

                Tables\Columns\TextColumn::make('content')
                    ->label('Review')
                    ->limit(50)
                    ->searchable(),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('video_url')
                    ->label('Video URL')
                    ->limit(30)
                    ->toggleable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage testimonials') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage testimonials') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'customer_name',
        'project_id',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->customer_name;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Project'=>$record->project_name,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
