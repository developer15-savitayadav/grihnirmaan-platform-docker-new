<?php

namespace App\Filament\Pages;

use App\Models\Lead;
use Filament\Pages\Page;
use Illuminate\Support\Facades\DB;
use App\Models\Locality;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Concerns\InteractsWithTable;

class Dashboard extends Page implements HasTable
{
    use InteractsWithTable;
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.dashboard';
    protected static ?string $title = 'Dashboard';
    protected static ?string $navigationLabel = 'Dashboard';
    protected static ?int $navigationSort = 1;
    private function formatAmount($amount): string
    {
        if ($amount >= 10000000) { // 1 Crore
            return '₹' . round($amount / 10000000, 2) . ' Cr';
        }

        if ($amount >= 100000) { // 1 Lakh
            return '₹' . round($amount / 100000, 2) . ' L';
        }

        if ($amount >= 1000) { // 1 Thousand
            return '₹' . round($amount / 1000, 2) . ' K';
        }

        return '₹' . number_format($amount);
    }
    public function getViewData(): array
    {
        $totalLeads = Lead::count();
        $newLeads = Lead::where('status', 'new')->count();
        $qualifiedLeads = Lead::where('status', 'qualified')->count();
        $convertedLeads = Lead::where('status', 'converted')->count();
        $lostLeads = Lead::where('status', 'lost')->count();
        $todayLeads = Lead::whereDate('created_at', today())->count();
        $conversionRate = $totalLeads > 0
            ? round(($convertedLeads / $totalLeads) * 100, 2)
            : 0;

       $pipelineValue = $this->formatAmount(
    Lead::sum('estimated_budget')
);

        $monthlyLeadsRaw = Lead::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total')
        )
            ->whereYear('created_at', now()->year)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('total', 'month')
            ->toArray();

        $monthlyLabels = [];
        $monthlyValues = [];

        foreach (range(1, 12) as $month) {
            $monthlyLabels[] = date('M', mktime(0, 0, 0, $month, 1));
            $monthlyValues[] = $monthlyLeadsRaw[$month] ?? 0;
        }

        $sourceData = Lead::select('source', DB::raw('COUNT(*) as total'))
            ->groupBy('source')
            ->orderByDesc('total')
            ->limit(6)
            ->get();

        $latestLeads = Lead::latest()
            ->limit(5)
            ->get(['name', 'phone', 'source', 'status', 'estimated_budget', 'created_at']);

        return [
            'totalLeads' => $totalLeads,
            'newLeads' => $newLeads,
            'qualifiedLeads' => $qualifiedLeads,
            'convertedLeads' => $convertedLeads,
            'lostLeads' => $lostLeads,
            'conversionRate' => $conversionRate,
            'pipelineValue' => $pipelineValue,

            'monthlyLabels' => $monthlyLabels,
            'monthlyValues' => $monthlyValues,

            'sourceLabels' => $sourceData->pluck('source')->map(fn($v) => $v ?: 'Unknown')->toArray(),
            'sourceValues' => $sourceData->pluck('total')->toArray(),

            'statusLabels' => ['New', 'Qualified', 'Converted', 'Lost'],
            'statusValues' => [$newLeads, $qualifiedLeads, $convertedLeads, $lostLeads],

            'latestLeads' => $latestLeads,
            'todayLeads' => $todayLeads,
        ];
    }
    public function table(Table $table): Table
    {
        return $table
            ->query(
                Lead::query()->latest()
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable(),

                Tables\Columns\TextColumn::make('source')
                    ->label('Source')
                    ->default('Unknown'),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'gray' => 'new',
                        'warning' => 'contacted',
                        'info' => 'qualified',
                        'success' => 'converted',
                        'danger' => 'lost',
                    ]),

                Tables\Columns\TextColumn::make('estimated_budget')
                    ->label('Budget')
                    ->money('INR'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->date('d M Y'),
            ])
            ->defaultPaginationPageOption(5);
    }
}
