<x-filament-panels::page>
<div class="gn-dashboard">
<div class="gn-dashboard-overview">
    {{-- Welcome Card --}}
    <div class="gn-welcome-card">

        <div class="gn-user-info">
            <div>


                <h2>{{ auth()->user()->name }}</h2>

                <p>
                    {{ ucfirst(auth()->user()->role) }}
                    •
                    {{ now()->format('l, d M Y') }}
                </p>
            </div>

        </div>

        <div class="gn-user-actions">

            <div class="gn-mini-card">
                <span>Today's Leads</span>
                <strong>{{ $todayLeads }}</strong>
            </div>

            <div class="gn-mini-card">
                <span>Last Login</span>
                <strong>
                    {{ optional(auth()->user()->last_login_at)->diffForHumans() ?? 'Today' }}
                </strong>
            </div>

        </div>

    </div>

        {{-- Stat cards --}}
     <div class="gn-card-grid">

    <div class="gn-card">
        <div class="gn-card-content">
            <p>Total Leads</p>
            <h2>{{ number_format($totalLeads) }}</h2>
            <span>All customer inquiries</span>
        </div>

        <div class="gn-card-icon icon-navy">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        </div>
    </div>

    <div class="gn-card">
        <div class="gn-card-content">
            <p>New Leads</p>
            <h2>{{ number_format($newLeads) }}</h2>
            <span>Pending follow up</span>
        </div>

        <div class="gn-card-icon icon-green">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 6v6l4 2"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>
        </div>
    </div>

    <div class="gn-card">
        <div class="gn-card-content">
            <p>Pipeline Value</p>
         <h2>{{ $pipelineValue }}</h2>
            <span>Potential project value</span>
        </div>

        <div class="gn-card-icon icon-orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        </div>
    </div>

    <div class="gn-card">
        <div class="gn-card-content">
            <p>Conversion Rate</p>
            <h2>{{ $conversionRate }}%</h2>
            <span>Average conversion</span>
        </div>

        <div class="gn-card-icon icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </svg>
        </div>
    </div>

</div>
</div>


        {{-- Charts --}}
        <div class="gn-graph-grid">
            <div class="gn-graph-card">
                <div class="gn-graph-head">
                    <div>
                        <h3>Monthly Leads</h3>
                        <p>Lead generation this year</p>
                    </div>
                </div>

                <div class="gn-chart-wrap">
                    <canvas id="monthlyLeadsChart"></canvas>
                </div>
            </div>

            <div class="gn-graph-card">
                <div class="gn-graph-head">
                    <div>
                        <h3>Leads by Source</h3>
                        <p>Top marketing channels</p>
                    </div>
                </div>

                <div class="gn-chart-wrap">
                    <canvas id="sourceChart"></canvas>
                </div>
            </div>
        </div>
{{-- Recent Leads --}}
<div class="gn-filament-table-card">
    {{ $this->table }}
</div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
        const monthlyLabels = @json($monthlyLabels);
        const monthlyValues = @json($monthlyValues);

        const sourceLabels = @json($sourceLabels);
        const sourceValues = @json($sourceValues);

        const monthlyCtx = document.getElementById('monthlyLeadsChart').getContext('2d');
        const monthlyGradient = monthlyCtx.createLinearGradient(0, 0, 0, 280);
        monthlyGradient.addColorStop(0, 'rgba(31, 78, 121, 0.25)');
        monthlyGradient.addColorStop(1, 'rgba(31, 78, 121, 0.02)');

        new Chart(monthlyCtx, {
            type: 'line',
            data: {
                labels: monthlyLabels,
                datasets: [{
                    label: 'Leads',
                    data: monthlyValues,
                    borderColor: '#1F4E79',
                    backgroundColor: monthlyGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.45,
                    pointBackgroundColor: '#D4A853',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1F2A37',
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#F1F1EF' },
                        ticks: { precision: 0 }
                    }
                }
            }
        });

        new Chart(document.getElementById('sourceChart'), {
            type: 'doughnut',
            data: {
                labels: sourceLabels,
                datasets: [{
                    data: sourceValues,
                    backgroundColor: [
                        '#1F4E79',
                        '#2E75B6',
                        '#D4A853',
                        '#C4623A',
                        '#2E7D32',
                        '#6B6560'
                    ],
                    borderWidth: 4,
                    borderColor: '#fff',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 16,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    </script>
</x-filament-panels::page>
