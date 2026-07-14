<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Construction Estimate</title>

    <style>
        @page { margin: 24px; }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #1C1C1C;
            font-size: 12px;
            line-height: 1.5;
        }

        .header {
            background: #1F4E79;
            color: #ffffff;
            padding: 22px;
            border-radius: 10px;
            margin-bottom: 16px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 13px;
        }

        .meta {
            margin-top: 8px;
            font-size: 11px;
            color: #D9E2F3;
        }

        .section {
            border: 1px solid #E5E7EB;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            page-break-inside: avoid;
        }

        .section h2 {
            margin: 0 0 10px;
            color: #1F4E79;
            font-size: 16px;
        }

        .estimate-box {
            background: #D9E2F3;
            color: #1F4E79;
            padding: 18px;
            border-radius: 10px;
            margin-bottom: 16px;
            page-break-inside: avoid;
        }

        .estimate-box p {
            margin: 0;
            font-size: 12px;
            font-weight: bold;
        }

        .estimate-box h2 {
            margin: 8px 0 0;
            font-size: 22px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            width: 45%;
            text-align: left;
            background: #FDFAF5;
            font-weight: bold;
        }

        th, td {
            border: 1px solid #E5E7EB;
            padding: 8px;
            vertical-align: top;
        }

        .amount {
            text-align: right;
            font-weight: bold;
        }

        .note {
            background: #FFF7ED;
            border: 1px solid #FED7AA;
            color: #9A3412;
            padding: 10px;
            border-radius: 8px;
            font-size: 11px;
            margin-top: 10px;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #6B6560;
            font-size: 10px;
        }
    </style>
</head>
<body>

@php
    $payload = $lead->raw_payload ?? [];

    $input = $input ?? ($payload['input'] ?? []);
    $result = $result ?? ($payload['calculation'] ?? []);

    $addons = $result['addons_breakdown'] ?? [];
    $breakdown = $result['breakdown'] ?? [];
@endphp

<div class="header">
    <h1>GrihNirmaan Construction Estimate</h1>
    <p>From Bhumi Poojan to Grih Pravesh, your dream home built right.</p>
    <div class="meta">
        Quote ID: #{{ $lead->id }} |
        Date: {{ now()->format('d M Y') }}
    </div>
</div>

<div class="section">
    <h2>Customer Details</h2>

    <table>
        <tr>
            <th>Name</th>
            <td>{{ $lead->name ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td>{{ $lead->phone ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $lead->email ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Locality</th>
            <td>{{ $lead->locality ?? ($result['locality_name'] ?? 'N/A') }}</td>
        </tr>
        <tr>
            <th>Finish Level</th>
            <td>{{ ucfirst($lead->finish_level ?? ($result['finish_level'] ?? 'standard')) }}</td>
        </tr>
    </table>
</div>

<div class="estimate-box">
    <p>Estimated Project Cost</p>
    <h2>
        ₹{{ number_format($result['estimated_low'] ?? 0) }}
        -
        ₹{{ number_format($result['estimated_high'] ?? 0) }}
    </h2>

    <p style="margin-top: 8px;">
        Approx Budget: ₹{{ number_format($result['estimated_budget'] ?? 0) }}
    </p>
</div>

<div class="section">
    <h2>Project Summary</h2>

    <table>
        <tr>
            <th>Input Area</th>
            <td>
                {{ number_format($result['input_area'] ?? 0) }}
                {{ $result['area_unit'] ?? 'sqft' }}
            </td>
        </tr>
        <tr>
            <th>Plot Size</th>
            <td>{{ number_format($result['plot_size_sqft'] ?? 0) }} sq ft</td>
        </tr>
        <tr>
            <th>Built-up Area</th>
            <td>{{ number_format($result['built_up_area_sqft'] ?? 0) }} sq ft</td>
        </tr>
        <tr>
            <th>Floors</th>
            <td>{{ $result['floors'] ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Base Rate</th>
            <td>₹{{ number_format($result['base_rate'] ?? 0) }} / sq ft</td>
        </tr>
        <tr>
            <th>Final Rate</th>
            <td>₹{{ number_format($result['per_sqft_rate'] ?? 0) }} / sq ft</td>
        </tr>
        <tr>
            <th>Timeline</th>
            <td>{{ $result['timeline'] ?? 'N/A' }}</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>Cost Summary</h2>

    <table>
        <tr>
            <th>Base Construction Cost</th>
            <td class="amount">₹{{ number_format($result['base_construction_cost'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Add-ons Total</th>
            <td class="amount">₹{{ number_format($result['addons_total'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Subtotal</th>
            <td class="amount">₹{{ number_format($result['subtotal'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>GST 18%</th>
            <td class="amount">₹{{ number_format($result['gst'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Total Estimated Budget</th>
            <td class="amount">₹{{ number_format($result['estimated_budget'] ?? 0) }}</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>Itemized Cost Breakdown</h2>

    @if(count($breakdown))
        <table>
            <tr>
                <th>Category</th>
                <th>Percentage</th>
                <th>Amount</th>
            </tr>

            @foreach($breakdown as $item)
                <tr>
                    <td>{{ $item['title'] ?? 'N/A' }}</td>
                    <td>{{ $item['percentage'] ?? 0 }}% of total estimate</td>
                    <td class="amount">₹{{ number_format($item['amount'] ?? 0) }}</td>
                </tr>
            @endforeach
        </table>
    @else
        <p>No itemized breakdown available.</p>
    @endif
</div>

<div class="section">
    <h2>Selected Add-ons</h2>

    @if(count($addons))
        <table>
            @foreach($addons as $addon)
                <tr>
                    <th>{{ $addon['name'] ?? 'Add-on' }}</th>
                    <td class="amount">₹{{ number_format($addon['price'] ?? 0) }}</td>
                </tr>
            @endforeach
        </table>
    @else
        <p>No add-ons selected.</p>
    @endif
</div>

<div class="section">
    <h2>Market Comparison</h2>

    <table>
        <tr>
            <th>Industry Avg Rate</th>
            <td>₹{{ number_format($result['industry_average_rate'] ?? 0) }} / sq ft</td>
        </tr>
        <tr>
            <th>Industry Avg Cost</th>
            <td class="amount">₹{{ number_format($result['industry_average'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Your Estimated Budget</th>
            <td class="amount">₹{{ number_format($result['estimated_budget'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Savings vs Market</th>
            <td class="amount">₹{{ number_format($result['savings_vs_market'] ?? 0) }}</td>
        </tr>
        <tr>
            <th>Comparison</th>
            <td>{{ $result['comparison_percent'] ?? 0 }}%</td>
        </tr>
    </table>

    <div class="note">
        This comparison is indicative. Final cost may vary based on design,
        approvals, material brands, soil condition, site location, and detailed consultation.
    </div>
</div>

<div class="footer">
    This is an estimated quote. Final cost may vary after site visit and detailed consultation.
    <br>
    © {{ date('Y') }} GrihNirmaan. All rights reserved.
</div>

</body>
</html>
