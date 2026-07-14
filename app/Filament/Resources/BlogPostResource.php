<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Website Content';
    protected static ?string $navigationLabel = 'Blog Posts';

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\Section::make('Blog Details')
                ->schema([

                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, callable $set) {
                            $set('slug', Str::slug($state));
                        }),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\Textarea::make('excerpt')
                        ->rows(3)
                        ->maxLength(500)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('content')
                        ->required()
                        ->columnSpanFull(),

                    Forms\Components\FileUpload::make('featured_image_path')
                        ->label('Featured Image')
                        ->image()
                        ->disk('public')
                        ->directory('blog')
                        ->visibility('public'),

                    Forms\Components\Select::make('author_id')
                        ->label('Author')
                        ->options(User::pluck('name', 'id'))
                        ->searchable()
                        ->required(),

                    Forms\Components\TextInput::make('category')
                        ->required()
                        ->maxLength(50),

                    Forms\Components\TagsInput::make('tags')
                        ->separator(','),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->label('Publish Date'),

                    Forms\Components\TextInput::make('read_time_minutes')
                        ->label('Read Time Minutes')
                        ->numeric()
                        ->default(5),

                    Forms\Components\Toggle::make('is_featured')
                        ->default(false),
                ])
                ->columns(2),

            Forms\Components\Section::make('SEO')
                ->schema([

                    Forms\Components\TextInput::make('meta_title')
                        ->maxLength(255),

                    Forms\Components\Textarea::make('meta_description')
                        ->rows(3)
                        ->maxLength(500)
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\ImageColumn::make('featured_image_path')
                    ->label('Image')
                    ->getStateUsing(function ($record) {
                        $path = $record->featured_image_path;

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
                    ->height(50)
                    ->width(80)
                    ->extraImgAttributes([
                        'style' => 'object-fit: cover; object-position: center;',
                    ]),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('author.name')
                    ->label('Author')
                    ->sortable(),

                Tables\Columns\TextColumn::make('read_time_minutes')
                    ->label('Read Time')
                    ->suffix(' min'),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Published At')
                    ->dateTime('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])

            ->filters([

                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'Home Design' => 'Home Design',
                        'Interior Design' => 'Interior Design',
                        'Construction Trends' => 'Construction Trends',
                        'Modern Architecture' => 'Modern Architecture',
                        'Luxury Homes' => 'Luxury Homes',
                        'Smart Homes' => 'Smart Homes',
                    ]),

                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured Posts'),
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

            ->defaultSort('published_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->can('manage blogs') ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->can('manage blogs') ?? false;
    }
    public static function getGloballySearchableAttributes(): array
{
    return [
        'title',
        'slug',
        'category',
    ];
}

public static function getGlobalSearchResultTitle($record): string
{
    return $record->title;
}

public static function getGlobalSearchResultDetails($record): array
{
    return [
        'Slug' => $record->slug,
        'Category' => $record->category,
    ];
}

public static function getGlobalSearchResultUrl($record): string
{
    return static::getUrl('edit', ['record' => $record]);
}
}
