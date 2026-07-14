<?php

namespace App\Filament\Resources;

use App\Exports\LeadsExport;
use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Facades\Excel;
use App\Jobs\SendWhatsAppMessage;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationLabel = 'Leads';

    protected static ?string $navigationGroup = 'Lead Management';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Lead Details')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('phone')
                        ->required()
                        ->maxLength(20),

                    Forms\Components\TextInput::make('email')
                        ->email()
                        ->nullable(),

                    Forms\Components\Select::make('source')
                        ->options([
                            'homepage' => 'Homepage',
                            'calculator' => 'Cost Calculator',
                            'quote' => 'Get Free Quote',
                            'contact' => 'Contact',
                            'service-page' => 'Service Page',
                        ])
                        ->default('calculator')
                        ->required(),

                    Forms\Components\TextInput::make('service_interest')
                        ->nullable(),

                    Forms\Components\Select::make('status')
                        ->options([
                            'new' => 'New',
                            'contacted' => 'Contacted',
                            'qualified' => 'Qualified',
                            'converted' => 'Converted',
                            'lost' => 'Lost',
                        ])
                        ->default('new')
                        ->required(),

                    Forms\Components\Select::make('assigned_to')
                        ->label('Assign Sales Person')
                        ->options(
                            User::whereIn('role', ['sales', 'admin'])
                                ->pluck('name', 'id')
                                ->toArray()
                        )
                        ->searchable()
                        ->preload()
                        ->nullable(),
                ])
                ->columns(2),

            Forms\Components\Section::make('Calculator Details')
                ->schema([
                    Forms\Components\TextInput::make('plot_size_sqft')
                        ->numeric()
                        ->label('Plot Size Sqft'),

                    Forms\Components\TextInput::make('estimated_budget')
                        ->numeric()
                        ->prefix('₹'),

                    Forms\Components\TextInput::make('locality')
                        ->maxLength(100),

                    Forms\Components\Select::make('finish_level')
                        ->options([
                            'budget' => 'Budget',
                            'standard' => 'Standard',
                            'premium' => 'Premium',
                        ]),
                ])
                ->columns(2),

            Forms\Components\Section::make('Communication / Follow-up')
                ->schema([
                    Forms\Components\DateTimePicker::make('whatsapp_sent_at')
                        ->label('WhatsApp Sent At'),

                    Forms\Components\TextInput::make('pdf_quote_path')
                        ->label('PDF Quote Path')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('notes')
                        ->label('Follow-up Notes / History')
                        ->rows(5)
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

                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->copyable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('source')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('locality')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('estimated_budget')
                    ->money('INR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('finish_level')
                    ->badge()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'new' => 'gray',
                        'contacted' => 'warning',
                        'qualified' => 'info',
                        'converted' => 'success',
                        'lost' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('assigned_to')
                    ->label('Assigned To')
                    ->formatStateUsing(function ($state, $record) {
                        return $record->assignedUser?->name ?? 'Not assigned';
                    })
                    ->sortable(false)
                    ->searchable(false)
                    ->toggleable(),

                Tables\Columns\TextColumn::make('notes')
                    ->label('Notes')
                    ->limit(35)
                    ->toggleable(),

                Tables\Columns\TextColumn::make('whatsapp_sent_at')
                    ->label('WhatsApp Sent')
                    ->dateTime('d M Y, h:i A')
                    ->toggleable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y, h:i A')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('source')
                    ->options([
                        'homepage' => 'Homepage',
                        'calculator' => 'Cost Calculator',
                        'quote' => 'Get Free Quote',
                        'contact' => 'Contact',
                        'service-page' => 'Service Page',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'qualified' => 'Qualified',
                        'converted' => 'Converted',
                        'lost' => 'Lost',
                    ]),

                Tables\Filters\SelectFilter::make('finish_level')
                    ->options([
                        'budget' => 'Budget',
                        'standard' => 'Standard',
                        'premium' => 'Premium',
                    ]),

                Tables\Filters\SelectFilter::make('assigned_to')
                    ->label('Assigned Sales Person')
                    ->options(function () {
                        return User::query()
                            ->whereIn('role', ['sales', 'admin'])
                            ->pluck('name', 'id');
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),

                Tables\Actions\EditAction::make(),

                Tables\Actions\Action::make('mark_contacted')
                    ->label('Mark Contacted')
                    ->icon('heroicon-o-phone')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->action(function (Lead $record) {
                        $record->update([
                            'status' => 'contacted',
                            'notes' => trim(($record->notes ?? '') . "\n\n" . now()->format('d M Y h:i A') . ' - Customer contacted by ' . auth()->user()->name),
                        ]);

                        Notification::make()
                            ->title('Lead marked as contacted')
                            ->success()
                            ->send();
                    }),

                Tables\Actions\Action::make('send_whatsapp')
                    ->label('WhatsApp')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('success')
                    ->form([
                        Forms\Components\Textarea::make('message')
                            ->label('Message')
                            ->default('Hello, thanks for your interest in GrihNirmaan. Our home advisor will contact you soon.')
                            ->required(),
                    ])
                    ->action(function (Lead $record, array $data) {
                        $record->update([
                            'whatsapp_sent_at' => now(),
                            'notes' => trim(($record->notes ?? '') . "\n\n" . now()->format('d M Y h:i A') . ' - WhatsApp message recorded: ' . $data['message']),
                        ]);

                        Notification::make()
                            ->title('WhatsApp action recorded')
                            ->body('Message has been added to lead notes.')
                            ->success()
                            ->send();
                    }),

                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('assign_sales_person')
                        ->label('Assign Sales Person')
                        ->icon('heroicon-o-user-plus')
                        ->color('info')
                        ->form([
                            Forms\Components\Select::make('assigned_to')
                                ->label('Sales Person')
                                ->options(function () {
                                    return User::query()
                                        ->whereIn('role', ['sales', 'admin'])
                                        ->pluck('name', 'id');
                                })
                                ->searchable()
                                ->preload()
                                ->required(),
                        ])
                        ->action(function (Collection $records, array $data) {
                            $records->each(function (Lead $lead) use ($data) {
                                $lead->update([
                                    'assigned_to' => $data['assigned_to'],
                                    'notes' => trim(($lead->notes ?? '') . "\n\n" . now()->format('d M Y h:i A') . ' - Assigned to sales person by ' . auth()->user()->name),
                                ]);
                            });

                            Notification::make()
                                ->title('Leads assigned successfully')
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),

                    Tables\Actions\BulkAction::make('bulk_whatsapp')
                        ->label('Bulk WhatsApp')
                        ->icon('heroicon-o-chat-bubble-left-right')
                        ->color('success')
                        ->requiresConfirmation()
                        ->form([
                            Forms\Components\Textarea::make('message')
                                ->label('WhatsApp Message')
                                ->default('Hello, thanks for your interest in GrihNirmaan. Our home advisor will contact you soon.')
                                ->rows(5)
                                ->required(),
                        ])
                        ->action(function (Collection $records, array $data) {
                            $queued = 0;
                            $skipped = 0;

                            $records->each(function (Lead $lead) use ($data, &$queued, &$skipped) {
                                if (!$lead->phone) {
                                    $skipped++;
                                    return;
                                }

                                SendWhatsAppMessage::dispatch($lead, $data['message']);

                                $lead->update([
                                    'notes' => trim(($lead->notes ?? '') . "\n\n" . now()->format('d M Y h:i A') . ' - Bulk WhatsApp queued: ' . $data['message']),
                                ]);

                                $queued++;
                            });

                            Notification::make()
                                ->title("Bulk WhatsApp queued")
                                ->body("Queued: {$queued}, Skipped: {$skipped}")
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),

                    Tables\Actions\BulkAction::make('export_excel')
                        ->label('Export Selected to Excel')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->color('success')
                        ->action(function (Collection $records) {
                            return Excel::download(
                                new LeadsExport($records->pluck('id')->toArray()),
                                'leads-' . now()->format('Y-m-d-H-i-s') . '.xlsx'
                            );
                        })
                        ->deselectRecordsAfterCompletion(),

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
            'index' => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit' => Pages\EditLead::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage leads') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage leads') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'name',
        'phone',
        'email',
        'status',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->name;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Phone' => $record->phone,
        'Email' => $record->email,
        'Status' => $record->status,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
}
