<?php

namespace App\Exports;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
 
class LeadsExport implements FromQuery, WithHeadings
{
    protected array $ids;

    public function __construct(array $ids = [])
    {
        $this->ids = $ids;
    }

    public function query(): Builder
    {
        return Lead::query()
            ->when(!empty($this->ids), function ($query) {
                $query->whereIn('id', $this->ids);
            })
            ->select([
                'id',
                'name',
                'phone',
                'email',
                'source',
                'service_interest',
                'plot_size_sqft',
                'estimated_budget',
                'locality',
                'finish_level',
                'status',
                'created_at',
            ]);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Phone',
            'Email',
            'Source',
            'Service Interest',
            'Plot Size Sqft',
            'Estimated Budget',
            'Locality',
            'Finish Level',
            'Status',
            'Created At',
        ];
    }
}