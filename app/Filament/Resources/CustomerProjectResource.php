<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerProjectResource\Pages;
use App\Models\CustomerProject;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomerProjectResource extends Resource
{
    protected static ?string $model = CustomerProject::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationGroup = 'Customer Portal';

    protected static ?string $navigationLabel = 'Customer Projects';

    protected static ?int $navigationSort = 1;

    public static function shouldRegisterNavigation(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'sales']);
    }

    public static function canViewAny(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'sales']);
    }

    public static function canCreate(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'sales']);
    }

    public static function canEdit($record): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'sales']);
    }

    public static function canDelete($record): bool
    {
        return auth()->user()?->role === 'admin';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Project Details')
                ->schema([
                    Forms\Components\Select::make('customer_user_id')
                        ->label('Customer')
                        ->options(
                            User::where('role', 'customer')->pluck('name', 'id')
                        )
                        ->searchable()
                        ->required(),

                    Forms\Components\TextInput::make('project_code')
                        ->label('Project Code')
                        ->placeholder('GN-2026-001')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(20),

                    Forms\Components\Textarea::make('plot_address')
                        ->label('Plot Address')
                        ->required()
                        ->columnSpanFull(),

                    Forms\Components\DatePicker::make('start_date')
                        ->label('Start Date')
                        ->required(),

                    Forms\Components\DatePicker::make('expected_completion')
                        ->label('Expected Completion')
                        ->required(),

                    Forms\Components\TextInput::make('current_phase')
                        ->label('Current Phase')
                        ->placeholder('Foundation')
                        ->required()
                        ->maxLength(100),

                    Forms\Components\TextInput::make('overall_progress_percent')
                        ->label('Progress %')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(100)
                        ->default(0)
                        ->required(),

                    Forms\Components\Select::make('assigned_supervisor_id')
                        ->label('Site Supervisor')
                        ->options(
                            User::where('role', 'site_supervisor')->pluck('name', 'id')
                        )
                        ->searchable()
                        ->required(),
                ])
                ->columns(2),

            Forms\Components\Section::make('Payment Details')
                ->schema([
                    Forms\Components\TextInput::make('total_value')
                        ->label('Total Project Value')
                        ->numeric()
                        ->prefix('₹')
                        ->required(),

                    Forms\Components\TextInput::make('amount_paid')
                        ->label('Amount Paid')
                        ->numeric()
                        ->prefix('₹')
                        ->default(0)
                        ->required(),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('project_code')
                    ->label('Project Code')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('customer.name')
                    ->label('Customer')
                    ->searchable(),

                Tables\Columns\TextColumn::make('supervisor.name')
                    ->label('Supervisor')
                    ->searchable(),

                Tables\Columns\TextColumn::make('current_phase')
                    ->label('Current Phase')
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('overall_progress_percent')
                    ->label('Progress')
                    ->suffix('%')
                    ->sortable(),

                Tables\Columns\TextColumn::make('total_value')
                    ->label('Total')
                    ->money('INR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('amount_paid')
                    ->label('Paid')
                    ->money('INR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('balance_amount')
                    ->label('Balance')
                    ->money('INR'),

                Tables\Columns\TextColumn::make('expected_completion')
                    ->label('Expected Completion')
                    ->date('d M Y'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),

                Tables\Actions\DeleteAction::make()
                    ->visible(fn() => auth()->user()?->role === 'admin'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->visible(fn() => auth()->user()?->role === 'admin'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCustomerProjects::route('/'),
            'create' => Pages\CreateCustomerProject::route('/create'),
            'edit' => Pages\EditCustomerProject::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'project_code',
        'plot_address',
        'current_phase',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->project_code;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Phase' => $record->current_phase,
        'Progress' => $record->overall_progress_percent.'%',
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record'=>$record]);
}

}
