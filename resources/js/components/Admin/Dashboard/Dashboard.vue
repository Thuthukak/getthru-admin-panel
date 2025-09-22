<template>
  <div class="container mt-4">
    <h1 class="mb-4 fw-bold">Dashboard</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Overview Cards Row -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="card bg-registration text-white h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">Total Registrations</h5>
                  <h2 class="mb-0">{{ formatNumber(installationStats.total) }}</h2>
                  <small class="opacity-75">
                    <i class="bi bi-calendar-month"></i> {{ installationStats.this_month }} this month
                  </small>
                </div>
                <div class="fs-1 opacity-50">
                  <i class="bi bi-people"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card bg-revenue text-white h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">Total Revenue</h5>
                  <h2 class="mb-0">{{ formatCurrency(invoiceStats.total_revenue) }}</h2>
                  <small class="opacity-75">
                    <i class="bi bi-calendar-day"></i> {{ installationStats.today }} registrations today
                  </small>
                </div>
                <div class="fs-1 opacity-50">
                  <i class="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Status & Invoice Status Row -->
      <div class="row mb-4">
        <!-- Registration Status Chart -->
        <div class="col-lg-6 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">Registration Status Distribution</h5>
              <span class="badge bg-secondary">{{ installationStats.total }} Total</span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <canvas ref="registrationChart" width="200" height="200"></canvas>
                </div>
                <div class="col-6">
                  <div class="status-legend">
                    <div v-for="(status, index) in registrationStatusData" :key="status.label" 
                         class="d-flex align-items-center mb-2">
                      <div class="status-color me-2" 
                           :style="{ backgroundColor: status.color }"></div>
                      <div class="flex-grow-1">
                        <div class="fw-semibold">{{ status.label }}</div>
                        <div class="text-muted small">{{ status.count }} ({{ status.percentage }}%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice Status Chart -->
        <div class="col-lg-6 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">Invoice Status Distribution</h5>
              <span class="badge bg-secondary">{{ invoiceStats.total_invoices }} Total</span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <canvas ref="invoiceChart" width="200" height="200"></canvas>
                </div>
                <div class="col-6">
                  <div class="status-legend">
                    <div v-for="(status, index) in invoiceStatusData" :key="status.label" 
                         class="d-flex align-items-center mb-2">
                      <div class="status-color me-2" 
                           :style="{ backgroundColor: status.color }"></div>
                      <div class="flex-grow-1">
                        <div class="fw-semibold">{{ status.label }}</div>
                        <div class="text-muted small">{{ status.count }} ({{ status.percentage }}%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Overview Cards -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="card border-success h-100">
            <div class="card-body text-center">
              <div class="text-success fs-1 mb-2">
                <i class="bi bi-check-circle"></i>
              </div>
              <h5 class="card-title text-success">Paid Revenue</h5>
              <h3 class="mb-0">{{ formatCurrency(invoiceStats.total_revenue) }}</h3>
              <small class="text-muted">{{ invoiceStats.paid_invoices }} invoices</small>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card border-warning h-100">
            <div class="card-body text-center">
              <div class="text-warning fs-1 mb-2">
                <i class="bi bi-clock"></i>
              </div>
              <h5 class="card-title text-warning">Pending Revenue</h5>
              <h3 class="mb-0">{{ formatCurrency(invoiceStats.pending_revenue) }}</h3>
              <small class="text-muted">{{ invoiceStats.pending_invoices + invoiceStats.sent_invoices }} invoices</small>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card border-danger h-100">
            <div class="card-body text-center">
              <div class="text-danger fs-1 mb-2">
                <i class="bi bi-exclamation-triangle"></i>
              </div>
              <h5 class="card-title text-danger">Overdue Revenue</h5>
              <h3 class="mb-0">{{ formatCurrency(invoiceStats.overdue_revenue) }}</h3>
              <small class="text-muted">{{ invoiceStats.overdue_invoices }} invoices</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Statistics Table -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Detailed Statistics</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="fw-bold mb-3">Registration Statistics</h6>
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <tbody>
                        <tr>
                          <td>Total Registrations</td>
                          <td class="text-end fw-bold">{{ formatNumber(installationStats.total) }}</td>
                        </tr>
                        <tr>
                          <td>Pending</td>
                          <td class="text-end">{{ formatNumber(installationStats.pending) }}</td>
                        </tr>
                        <tr>
                          <td>Confirmed</td>
                          <td class="text-end">{{ formatNumber(installationStats.confirmed) }}</td>
                        </tr>
                        <tr>
                          <td>In Progress</td>
                          <td class="text-end">{{ formatNumber(installationStats.in_progress) }}</td>
                        </tr>
                        <tr>
                          <td>Processed</td>
                          <td class="text-end">{{ formatNumber(installationStats.processed) }}</td>
                        </tr>
                        <tr>
                          <td>Cancelled</td>
                          <td class="text-end">{{ formatNumber(installationStats.cancelled) }}</td>
                        </tr>
                        <tr class="table-info">
                          <td><strong>This Month</strong></td>
                          <td class="text-end fw-bold">{{ formatNumber(installationStats.this_month) }}</td>
                        </tr>
                        <tr class="table-success">
                          <td><strong>Today</strong></td>
                          <td class="text-end fw-bold">{{ formatNumber(installationStats.today) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <h6 class="fw-bold mb-3">Invoice Statistics</h6>
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <tbody>
                        <tr>
                          <td>Total Invoices</td>
                          <td class="text-end fw-bold">{{ formatNumber(invoiceStats.total_invoices) }}</td>
                        </tr>
                        <tr>
                          <td>Pending</td>
                          <td class="text-end">{{ formatNumber(invoiceStats.pending_invoices) }}</td>
                        </tr>
                        <tr>
                          <td>Sent</td>
                          <td class="text-end">{{ formatNumber(invoiceStats.sent_invoices) }}</td>
                        </tr>
                        <tr class="table-success">
                          <td>Paid</td>
                          <td class="text-end">{{ formatNumber(invoiceStats.paid_invoices) }}</td>
                        </tr>
                        <tr class="table-danger">
                          <td>Overdue</td>
                          <td class="text-end">{{ formatNumber(invoiceStats.overdue_invoices) }}</td>
                        </tr>
                        <tr class="border-top">
                          <td><strong>Total Revenue</strong></td>
                          <td class="text-end fw-bold">{{ formatCurrency(invoiceStats.total_revenue) }}</td>
                        </tr>
                        <tr>
                          <td><strong>Pending Revenue</strong></td>
                          <td class="text-end fw-bold">{{ formatCurrency(invoiceStats.pending_revenue) }}</td>
                        </tr>
                        <tr class="table-danger">
                          <td><strong>Overdue Revenue</strong></td>
                          <td class="text-end fw-bold">{{ formatCurrency(invoiceStats.overdue_revenue) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  name: 'Dashboard',
  data() {
    return {
      loading: true,
      installationStats: {
        total: 0,
        pending: 0,
        confirmed: 0,
        in_progress: 0,
        processed: 0,
        cancelled: 0,
        this_month: 0,
        today: 0
      },
      invoiceStats: {
        total_invoices: 0,
        pending_invoices: 0,
        sent_invoices: 0,
        paid_invoices: 0,
        overdue_invoices: 0,
        total_revenue: 0,
        pending_revenue: 0,
        overdue_revenue: 0
      },
      registrationChart: null,
      invoiceChart: null
    }
  },
  computed: {
    registrationStatusData() {
      const total = this.installationStats.total || 1; // Avoid division by zero
      const colors = ['#6c757d', '#0d6efd', '#ffc107', '#53d826', '#dc3545'];
      
      return [
        {
          label: 'Pending',
          count: this.installationStats.pending,
          percentage: Math.round((this.installationStats.pending / total) * 100),
          color: colors[0]
        },
        {
          label: 'Confirmed',
          count: this.installationStats.confirmed,
          percentage: Math.round((this.installationStats.confirmed / total) * 100),
          color: colors[1]
        },
        {
          label: 'In Progress',
          count: this.installationStats.in_progress,
          percentage: Math.round((this.installationStats.in_progress / total) * 100),
          color: colors[2]
        },
        {
          label: 'Processed',
          count: this.installationStats.processed,
          percentage: Math.round((this.installationStats.processed / total) * 100),
          color: colors[3]
        },
        {
          label: 'Cancelled',
          count: this.installationStats.cancelled,
          percentage: Math.round((this.installationStats.cancelled / total) * 100),
          color: colors[4]
        }
      ].filter(item => item.count > 0); // Only show statuses with data
    },
    
    invoiceStatusData() {
      const total = this.invoiceStats.total_invoices || 1; // Avoid division by zero
      const colors = ['#6c757d', '#0d6efd', '#53d826', '#dc3545'];
      
      return [
        {
          label: 'Pending',
          count: this.invoiceStats.pending_invoices,
          percentage: Math.round((this.invoiceStats.pending_invoices / total) * 100),
          color: colors[0]
        },
        {
          label: 'Sent',
          count: this.invoiceStats.sent_invoices,
          percentage: Math.round((this.invoiceStats.sent_invoices / total) * 100),
          color: colors[1]
        },
        {
          label: 'Paid',
          count: this.invoiceStats.paid_invoices,
          percentage: Math.round((this.invoiceStats.paid_invoices / total) * 100),
          color: colors[2]
        },
        {
          label: 'Overdue',
          count: this.invoiceStats.overdue_invoices,
          percentage: Math.round((this.invoiceStats.overdue_invoices / total) * 100),
          color: colors[3]
        }
      ].filter(item => item.count > 0); // Only show statuses with data
    }
  },
  async mounted() {
    await this.fetchDashboardData();
    this.$nextTick(() => {
      this.createCharts();
    });
  },
  methods: {
    async fetchDashboardData() {
      try {
        this.loading = true;
        
        // Fetch installation stats
        const installationResponse = await fetch('/api/installations/stats');
        if (installationResponse.ok) {
          this.installationStats = await installationResponse.json();
        }
        
        // Fetch invoice stats
        const invoiceResponse = await fetch('/api/invoices/stats');
        if (invoiceResponse.ok) {
          const invoiceData = await invoiceResponse.json();
          this.invoiceStats = invoiceData.success ? invoiceData.data : invoiceData;
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // You could add a toast notification here
      } finally {
        this.loading = false;
      }
    },
    
    createCharts() {
      this.createRegistrationChart();
      this.createInvoiceChart();
    },
    
    createRegistrationChart() {
      const ctx = this.$refs.registrationChart;
      if (!ctx) return;
      
      // Destroy existing chart if it exists
      if (this.registrationChart) {
        this.registrationChart.destroy();
      }
      
      const data = this.registrationStatusData;
      if (data.length === 0) return;
      
      this.registrationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(item => item.label),
          datasets: [{
            data: data.map(item => item.count),
            backgroundColor: data.map(item => item.color),
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const item = data[context.dataIndex];
                  return `${item.label}: ${item.count} (${item.percentage}%)`;
                }
              }
            }
          }
        }
      });
    },
    
    createInvoiceChart() {
      const ctx = this.$refs.invoiceChart;
      if (!ctx) return;
      
      // Destroy existing chart if it exists
      if (this.invoiceChart) {
        this.invoiceChart.destroy();
      }
      
      const data = this.invoiceStatusData;
      if (data.length === 0) return;
      
      this.invoiceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(item => item.label),
          datasets: [{
            data: data.map(item => item.count),
            backgroundColor: data.map(item => item.color),
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const item = data[context.dataIndex];
                  return `${item.label}: ${item.count} (${item.percentage}%)`;
                }
              }
            }
          }
        }
      });
    },
    
    formatNumber(number) {
      return new Intl.NumberFormat().format(number || 0);
    },
    
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR'
      }).format(amount || 0);
    }
  },
  
  beforeUnmount() {
    // Clean up charts
    if (this.registrationChart) {
      this.registrationChart.destroy();
    }
    if (this.invoiceChart) {
      this.invoiceChart.destroy();
    }
  }
}
</script>

<style scoped>
.bg-registration {
  background: #2688e0;
}
.bg-revenue {
  background: #53d826;
}
.status-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.status-legend {
  max-height: 200px;
  overflow-y: auto;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header {
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.table th, .table td {
  padding: 0.5rem;
  vertical-align: middle;
}

.fs-1 {
  font-size: 2.5rem !important;
}

.border-success {
  border-color: #198754 !important;
}

.border-warning {
  border-color: #ffc107 !important;
}

.border-danger {
  border-color: #dc3545 !important;
}
</style>