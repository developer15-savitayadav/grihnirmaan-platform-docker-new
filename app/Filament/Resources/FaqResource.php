<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\Faq;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle';
    protected static ?string $navigationGroup = 'Website Content';
    protected static ?string $navigationLabel = 'FAQs';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('FAQ Details')
                ->schema([
                    Forms\Components\TextInput::make('question')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\Textarea::make('answer')
                        ->required()
                        ->rows(5)
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('category')
                        ->maxLength(100),

                    Forms\Components\Select::make('service_id')
                        ->label('Related Service')
                        ->relationship('service', 'name')
                        ->searchable()
                        ->preload()
                        ->nullable()
                        ->required(),

                    Forms\Components\TextInput::make('display_order')
                        ->label('Display Order')
                        ->numeric()
                        ->default(0),

                    Forms\Components\Toggle::make('is_active')
                        ->default(true),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('question')
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                Tables\Columns\TextColumn::make('answer')
                    ->label('Answer')
                    ->limit(60)
                    ->searchable(),

                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('service_id')
                    ->label('Service ID')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('display_order')
                    ->label('Order')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'Construction' => 'Construction',
                        'Interior Design' => 'Interior Design',
                        'Home Construction' => 'Home Construction',
                        'Architecture' => 'Architecture',
                        'Turnkey Projects' => 'Turnkey Projects',
                        'Project Planning' => 'Project Planning',
                        'Building Materials' => 'Building Materials',
                        'Residential Construction' => 'Residential Construction',
                    ]),

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
            ->defaultSort('display_order', 'asc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage faqs') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage faqs') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'question',
        'answer',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->question;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Answer' => \Str::limit(strip_tags($record->answer),50),
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
