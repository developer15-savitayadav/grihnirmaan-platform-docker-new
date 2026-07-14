<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'Administration';

    public static function shouldRegisterNavigation(): bool
{
    return auth()->user()?->can('manage users') ?? false;
}

public static function canViewAny(): bool
{
    return auth()->user()?->can('manage users') ?? false;
}

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\TextInput::make('name')
                ->required(),

            Forms\Components\TextInput::make('email')
                ->email()
                ->required()
                ->unique(ignoreRecord: true),

            Forms\Components\TextInput::make('phone'),

            Forms\Components\Select::make('role')
                ->options([
                    'admin' => 'Admin',
                    'sales' => 'Sales',
                    'content_writer' => 'Content Writer',
                    'site_supervisor' => 'Site Supervisor',
                    'customer' => 'Customer',
                ])
                ->required(),

            Forms\Components\TextInput::make('password')
                ->password()
                ->required(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\CreateRecord)
                ->dehydrateStateUsing(fn($state) => Hash::make($state))
                ->dehydrated(fn($state) => filled($state)),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('name')
                    ->searchable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable(),

                Tables\Columns\TextColumn::make('phone'),

                Tables\Columns\TextColumn::make('role')
                    ->badge(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y'),
            ])

            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'name',
        'email',
        'phone',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->name;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Email'=>$record->email,
        'Phone'=>$record->phone,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
