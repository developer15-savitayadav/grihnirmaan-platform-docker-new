<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsletterSubscriberResource\Pages;
use App\Filament\Resources\NewsletterSubscriberResource\RelationManagers;
use App\Models\NewsletterSubscriber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsletterSubscriberResource extends Resource
{
    protected static ?string $model = NewsletterSubscriber::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Marketing';
    protected static ?string $navigationLabel = 'Newsletter Subscribers';
    protected static ?string $modelLabel = 'Newsletter Subscriber';
    protected static ?string $pluralModelLabel = 'Newsletter Subscribers';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),

                Forms\Components\TextInput::make('source')
                    ->default('website')
                    ->maxLength(100),

                Forms\Components\DateTimePicker::make('confirmed_at'),

                Forms\Components\TextInput::make('unsubscribe_token')
                    ->maxLength(255)
                    ->disabled(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),

                Tables\Columns\TextColumn::make('source')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('confirmed_at')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Subscribers'),

                Tables\Filters\SelectFilter::make('source')
                    ->options([
                        'website' => 'Website',
                        'footer' => 'Footer',
                        'homepage-footer' => 'Homepage Footer',
                        'newsletter-page' => 'Newsletter Page',
                    ]),
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
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNewsletterSubscribers::route('/'),
            'create' => Pages\CreateNewsletterSubscriber::route('/create'),
            'edit' => Pages\EditNewsletterSubscriber::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'email',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->email;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
}
