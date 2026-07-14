<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class LeadStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalLeads = Lead::count();

        $newLeads = Lead::where('status', 'new')->count();

        $convertedLeads = Lead::where('status', 'converted')->count();

        $conversionRate = $totalLeads > 0
            ? round(($convertedLeads / $totalLeads) * 100, 2)
            : 0;

        $pipelineValue = Lead::whereIn('status', [
                'new',
                'contacted',
                'qualified',
            ])
            ->sum('estimated_budget');

        return [
            Stat::make('Total Leads', $totalLeads)
                ->description('All Leads')
                ->color('primary'),

            Stat::make('New Leads', $newLeads)
                ->description('Pending Follow Up')
                ->color('warning'),

            Stat::make('Conversion Rate', $conversionRate . '%')
                ->description($convertedLeads . ' converted from ' . $totalLeads)
                ->color('success'),

            Stat::make('Pipeline Value', '₹' . number_format($pipelineValue))
                ->description('Potential project value')
                ->color('info'),
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->can('view dashboard') ?? false;
    }
}