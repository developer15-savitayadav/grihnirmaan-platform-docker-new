<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectMessageResource\Pages;
use App\Models\CustomerProject;
use App\Models\ProjectMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectMessageResource extends Resource
{
    protected static ?string $model = ProjectMessage::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Customer Portal';

    protected static ?string $navigationLabel = 'Messages';

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

            Forms\Components\Textarea::make('message')
                ->required()
                ->columnSpanFull(),

            Forms\Components\FileUpload::make('attachment_path')
                ->directory('portal/messages'),

            Forms\Components\Hidden::make('sender_id')
                ->default(fn () => auth()->id()),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('project.project_code')
                    ->label('Project'),

                Tables\Columns\TextColumn::make('sender.name')
                    ->label('Sender'),

                Tables\Columns\TextColumn::make('message')
                    ->limit(50),

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
            'index' => Pages\ListProjectMessages::route('/'),
            'create' => Pages\CreateProjectMessage::route('/create'),
            'edit' => Pages\EditProjectMessage::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'customer_project_id',
        'message',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->subject;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Message'=>\Str::limit(strip_tags($record->message),50),
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('view',['record'=>$record]);
}
}
