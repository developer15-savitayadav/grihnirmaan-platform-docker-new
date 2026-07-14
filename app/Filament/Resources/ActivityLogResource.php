<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityLogResource\Pages;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Spatie\Activitylog\Models\Activity;

class ActivityLogResource extends Resource
{
    protected static ?string $model = Activity::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'Audit Logs';

    protected static ?string $navigationGroup = 'System';

    protected static ?int $navigationSort = 99;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),

                Tables\Columns\TextColumn::make('log_name')
                    ->label('Module')
                    ->badge()
                    ->searchable(),

                Tables\Columns\TextColumn::make('event')
                    ->label('Event')
                    ->badge()
                    ->searchable(),

                Tables\Columns\TextColumn::make('description')
                    ->label('Description')
                    ->searchable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('causer.name')
                    ->label('User')
                    ->default('System')
                    ->searchable(),

                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Model')
                    ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-')
                    ->searchable(),

                Tables\Columns\TextColumn::make('subject_id')
                    ->label('Record ID')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d M Y h:i A')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('log_name')
                    ->label('Module')
                    ->options([
                        'blog_posts' => 'Blog Posts',
                        'leads' => 'Leads',
                        'projects' => 'Projects',
                        'services' => 'Services',
                        'users' => 'Users',
                    ]),

                Tables\Filters\SelectFilter::make('event')
                    ->label('Event')
                    ->options([
                        'created' => 'Created',
                        'updated' => 'Updated',
                        'deleted' => 'Deleted',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Audit Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('id')
                            ->label('Log ID'),

                        Infolists\Components\TextEntry::make('log_name')
                            ->label('Module')
                            ->badge(),

                        Infolists\Components\TextEntry::make('event')
                            ->label('Event')
                            ->badge(),

                        Infolists\Components\TextEntry::make('description')
                            ->label('Description'),

                        Infolists\Components\TextEntry::make('causer.name')
                            ->label('Performed By')
                            ->default('System'),

                        Infolists\Components\TextEntry::make('subject_type')
                            ->label('Model')
                            ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-'),

                        Infolists\Components\TextEntry::make('subject_id')
                            ->label('Record ID'),

                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Date')
                            ->dateTime('d M Y h:i A'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Changed Data')
                    ->schema([
                        Infolists\Components\TextEntry::make('old_values')
                            ->label('Old Values')
                            ->state(function (Activity $record): string {
                                $old = $record->properties->get('old', []);

                                return empty($old)
                                    ? 'No old values'
                                    : json_encode($old, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                            })
                            ->columnSpanFull(),

                        Infolists\Components\TextEntry::make('new_values')
                            ->label('New Values')
                            ->state(function (Activity $record): string {
                                $attributes = $record->properties->get('attributes', []);

                                return empty($attributes)
                                    ? 'No new values'
                                    : json_encode($attributes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                            })
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListActivityLogs::route('/'),
            'view' => Pages\ViewActivityLog::route('/{record}'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'description',
        'event',
        'subject_type',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->description;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Event' => $record->event,
        'Subject' => class_basename($record->subject_type),
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('view', ['record' => $record]);
}
}
