<?php

namespace App\Services;

class CostCalculationService
{
    private const SQYARD_TO_SQFT = 9;
    private const GST_RATE = 0.18;

    private const BASE_RATES = [
        'budget' => 1550,
        'standard' => 1900,
        'premium' => 2600,
    ];

    private const ADDON_PRICES = [
        'modular_kitchen' => ['name' => 'Modular Kitchen', 'price' => 350000],
        'false_ceiling' => ['name' => 'False Ceiling', 'price' => 180000],
        'smart_home' => ['name' => 'Smart Home', 'price' => 250000],
        'solar' => ['name' => 'Solar System', 'price' => 220000],
        'home_theater' => ['name' => 'Home Theater', 'price' => 400000],
    ];

    public function calculate(array $data): array
    {
        $inputArea = (float) ($data['plot_size_sqft'] ?? 0);
        $areaUnit = $data['area_unit'] ?? 'sqft';

        $plotSizeSqft = $areaUnit === 'sqyard'
            ? $inputArea * self::SQYARD_TO_SQFT
            : $inputArea;

        $floors = max(1, min(10, (int) ($data['floors'] ?? 1)));
        $builtUpAreaSqft = $plotSizeSqft * $floors;

        $finishLevel = $data['finish_level'] ?? 'standard';
        $baseRate = self::BASE_RATES[$finishLevel] ?? self::BASE_RATES['standard'];

        $localityMultiplier = (float) ($data['locality_multiplier'] ?? 1);
        $localityMultiplier = $localityMultiplier > 0 ? $localityMultiplier : 1;

        $perSqftRate = round($baseRate * $localityMultiplier);
        $baseConstructionCost = $builtUpAreaSqft * $perSqftRate;

        $addonsBreakdown = $this->addonsBreakdown($data['addons'] ?? []);
        $addonsTotal = array_sum(array_column($addonsBreakdown, 'price'));

        $subTotal = $baseConstructionCost + $addonsTotal;
        $gst = round($subTotal * self::GST_RATE);
        $estimatedBudget = round($subTotal + $gst);

        $estimatedLow = round($estimatedBudget * 0.95);
        $estimatedHigh = round($estimatedBudget * 1.08);

        $industryAverageRate = $this->industryAverageRate($finishLevel);
        $industryAverage = round($builtUpAreaSqft * $industryAverageRate);

        return [
            'input_area' => round($inputArea, 2),
            'area_unit' => $areaUnit,

            'plot_size_sqft' => round($plotSizeSqft),
            'built_up_area_sqft' => round($builtUpAreaSqft),
            'floors' => $floors,

            'finish_level' => $finishLevel,
            'locality' => $data['locality'] ?? null,
            'locality_name' => $data['locality_name'] ?? ($data['locality'] ?? null),
            'locality_multiplier' => $localityMultiplier,

            'base_rate' => $baseRate,
            'per_sqft_rate' => $perSqftRate,

            'base_construction_cost' => round($baseConstructionCost),
            'addons_total' => round($addonsTotal),
            'addons_breakdown' => $addonsBreakdown,

            'subtotal' => round($subTotal),
            'gst_rate' => self::GST_RATE,
            'gst' => $gst,

            'estimated_low' => $estimatedLow,
            'estimated_high' => $estimatedHigh,
            'estimated_budget' => $estimatedBudget,

            'timeline' => $this->estimateTimeline($builtUpAreaSqft, $floors),

            'industry_average_rate' => $industryAverageRate,
            'industry_average' => $industryAverage,
            'savings_vs_market' => max($industryAverage - $estimatedBudget, 0),
            'comparison_percent' => $industryAverage > 0
                ? round((($industryAverage - $estimatedBudget) / $industryAverage) * 100, 1)
                : 0,

            'breakdown' => $this->breakdown($estimatedBudget),
        ];
    }

    private function addonsBreakdown(array $selectedAddons): array
    {
        $selectedAddons = array_values(array_unique($selectedAddons));
        $addons = [];

        foreach ($selectedAddons as $addonKey) {
            if (! isset(self::ADDON_PRICES[$addonKey])) {
                continue;
            }

            $addons[] = [
                'key' => $addonKey,
                'name' => self::ADDON_PRICES[$addonKey]['name'],
                'price' => self::ADDON_PRICES[$addonKey]['price'],
            ];
        }

        return $addons;
    }

    private function estimateTimeline(float $builtUpAreaSqft, int $floors): string
    {
        $months = match (true) {
            $builtUpAreaSqft <= 1000 => [5, 7],
            $builtUpAreaSqft <= 2000 => [8, 10],
            $builtUpAreaSqft <= 3500 => [10, 14],
            default => [14, 18],
        };

        if ($floors >= 4) {
            $months[0] += 1;
            $months[1] += 2;
        }

        return $months[0] . ' - ' . $months[1] . ' Months';
    }

    private function industryAverageRate(string $finishLevel): int
    {
        return match ($finishLevel) {
            'budget' => 2100,
            'premium' => 3400,
            default => 2700,
        };
    }

    private function breakdown(int $estimatedBudget): array
    {
        return [
            [
                'key' => 'civil_construction',
                'title' => 'Civil Construction',
                'percentage' => 45,
                'amount' => round($estimatedBudget * 0.45),
            ],
            [
                'key' => 'electrical_works',
                'title' => 'Electrical Works',
                'percentage' => 10,
                'amount' => round($estimatedBudget * 0.10),
            ],
            [
                'key' => 'plumbing_bath',
                'title' => 'Plumbing & Bath',
                'percentage' => 10,
                'amount' => round($estimatedBudget * 0.10),
            ],
            [
                'key' => 'flooring_finishing',
                'title' => 'Flooring & Finishing',
                'percentage' => 20,
                'amount' => round($estimatedBudget * 0.20),
            ],
            [
                'key' => 'paint_exterior',
                'title' => 'Paint & Exterior',
                'percentage' => 7,
                'amount' => round($estimatedBudget * 0.07),
            ],
            [
                'key' => 'project_management',
                'title' => 'Project Management',
                'percentage' => 8,
                'amount' => round($estimatedBudget * 0.08),
            ],
        ];
    }
}
