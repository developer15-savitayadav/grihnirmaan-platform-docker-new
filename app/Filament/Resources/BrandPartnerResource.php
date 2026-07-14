<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BrandPartnerResource\Pages;
use App\Models\BrandPartner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BrandPartnerResource extends Resource
{
    protected static ?string $model = BrandPartner::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';

    protected static ?string $navigationGroup = 'Website Content';

    protected static ?string $navigationLabel = 'Brand Partners';

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\Section::make('Brand Partner Details')
                ->schema([

                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\FileUpload::make('logo_path')
                        ->label('Brand Logo')
                        ->image()
                        ->disk('public')
                        ->directory('brand-partners')
                        ->visibility('public'),

                    Forms\Components\TextInput::make('website_url')
                        ->label('Website URL')
                        ->url()
                        ->maxLength(255),

                    Forms\Components\Textarea::make('description')
                        ->rows(4)
                        ->columnSpanFull(),

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

                Tables\Columns\ImageColumn::make('logo_path')
                    ->label('Logo')
                    ->getStateUsing(function ($record) {
                        $path = $record->logo_path;

                        if (blank($path)) {
                            return null;
                        }

                        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
                            return $path;
                        }

                        if (str_starts_with($path, '/storage/')) {
                            return asset(ltrim($path, '/'));
                        }

                        if (str_starts_with($path, 'storage/')) {
                            return asset($path);
                        }

                        if (str_starts_with($path, 'public/storage/')) {
                            return asset(str_replace('public/', '', $path));
                        }

                        return asset('storage/' . ltrim($path, '/'));
                    })
                    ->height(45)
                    ->width(120)
                    ->extraImgAttributes([
                        'style' => 'object-fit: contain; object-position: center;',
                    ]),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('website_url')
                    ->label('Website')
                    ->url(fn($record) => $record->website_url)
                    ->openUrlInNewTab()
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

            ->defaultSort('name', 'asc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBrandPartners::route('/'),
            'create' => Pages\CreateBrandPartner::route('/create'),
            'edit' => Pages\EditBrandPartner::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage brand partners') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage brand partners') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'name',
        'slug',
        'website_url',
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
        'website_url' => $record->website,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
}
