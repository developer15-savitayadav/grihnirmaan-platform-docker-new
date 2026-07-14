<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Str;

class LeadsBySourceChart extends ChartWidget
{
    protected static ?string $heading = 'Leads by Source';

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $data = Lead::query()
            ->selectRaw("COALESCE(NULLIF(source, ''), 'unknown') as source, COUNT(*) as total")
            ->groupBy('source')
            ->orderByDesc('total')
            ->pluck('total', 'source')
            ->toArray();

        return [
            'datasets' => [
                [
                    'label' => 'Leads',
                    'data' => array_values($data),
                ],
            ],
            'labels' => collect(array_keys($data))
                ->map(fn ($source) => Str::headline($source))
                ->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public static function canView(): bool
    {
        return auth()->user()?->can('view dashboard') ?? false;
    }
}