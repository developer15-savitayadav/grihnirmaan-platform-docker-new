<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectMilestoneResource\Pages;
use App\Models\CustomerProject;
use App\Models\ProjectMilestone;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Get;
use Carbon\Carbon;

class ProjectMilestoneResource extends Resource
{
    protected static ?string $model = ProjectMilestone::class;

    protected static ?string $navigationIcon = 'heroicon-o-flag';

    protected static ?string $navigationGroup = 'Customer Portal';

    protected static ?string $navigationLabel = 'Project Milestones';

    protected static ?int $navigationSort = 2;

    public static function shouldRegisterNavigation(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'site_supervisor']);
    }

    public static function canViewAny(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'site_supervisor']);
    }

    public static function canCreate(): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'site_supervisor']);
    }

    public static function canEdit($record): bool
    {
        return in_array(auth()->user()?->role, ['admin', 'site_supervisor']);
    }

    public static function canDelete($record): bool
    {
        return auth()->user()?->role === 'admin';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Milestone Details')
                ->schema([
                    Forms\Components\Select::make('customer_project_id')
                        ->label('Project')
                        ->options(CustomerProject::pluck('project_code', 'id'))
                        ->searchable()
                        ->live()
                        ->required(),

                    Forms\Components\TextInput::make('milestone_name')
                        ->label('Milestone Name')
                        ->placeholder('Foundation Completed')
                        ->required()
                        ->maxLength(150),

                    Forms\Components\DatePicker::make('expected_date')
                        ->label('Expected Date')
                        ->required()
                        ->minDate(function (Get $get) {
                            $project = CustomerProject::find($get('customer_project_id'));

                            return $project?->start_date
                                ? Carbon::parse($project->start_date)
                                : null;
                        })
                        ->maxDate(function (Get $get) {
                            $project = CustomerProject::find($get('customer_project_id'));

                            return $project?->expected_completion
                                ? Carbon::parse($project->expected_completion)
                                : null;
                        }),

                    Forms\Components\DatePicker::make('completed_date')
                        ->label('Completed Date')
                        ->minDate(function (Get $get) {
                            $project = CustomerProject::find($get('customer_project_id'));

                            return $project?->start_date
                                ? Carbon::parse($project->start_date)
                                : null;
                        })
                        ->maxDate(function (Get $get) {
                            $project = CustomerProject::find($get('customer_project_id'));

                            return $project?->expected_completion
                                ? Carbon::parse($project->expected_completion)
                                : null;
                        }),
                    Forms\Components\TextInput::make('payment_due')
                        ->label('Payment Due')
                        ->numeric()
                        ->prefix('₹')
                        ->default(0)
                        ->required(),

                    Forms\Components\Textarea::make('notes')
                        ->label('Notes')
                        ->columnSpanFull(),
                ])
                ->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('project.project_code')
                    ->label('Project Code')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('project.customer.name')
                    ->label('Customer')
                    ->searchable(),

                Tables\Columns\TextColumn::make('milestone_name')
                    ->label('Milestone')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('expected_date')
                    ->label('Expected Date')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('completed_date')
                    ->label('Completed Date')
                    ->date('d M Y'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'gray' => 'pending',
                        'warning' => 'in_progress',
                        'success' => 'completed',
                        'info' => 'approved',
                    ]),

                Tables\Columns\TextColumn::make('payment_due')
                    ->label('Payment Due')
                    ->money('INR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('notes')
                    ->limit(30),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'approved' => 'Approved',
                    ]),
            ])
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
            'index' => Pages\ListProjectMilestones::route('/'),
            'create' => Pages\CreateProjectMilestone::route('/create'),
            'edit' => Pages\EditProjectMilestone::route('/{record}/edit'),
        ];
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'milestone_name',
        'status',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->milestone_name;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Status'=>$record->status,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit',['record'=>$record]);
}
}
