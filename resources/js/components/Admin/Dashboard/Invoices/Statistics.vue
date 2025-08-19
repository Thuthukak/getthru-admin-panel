<template>
  <div class="statistics-section">
    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ stats.total_invoices || 0 }}</div>
        <div class="stat-label">Total Invoices</div>
      </div>
      <div class="stat-card pending">
        <div class="stat-value">{{ stats.pending_invoices || 0 }}</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="stat-card sent">
        <div class="stat-value">{{ stats.sent_invoices || 0 }}</div>
        <div class="stat-label">Sent</div>
      </div>
      <div class="stat-card paid">
        <div class="stat-value">{{ stats.paid_invoices || 0 }}</div>
        <div class="stat-label">Paid</div>
      </div>
      <div class="stat-card overdue">
        <div class="stat-value">{{ stats.overdue_invoices || 0 }}</div>
        <div class="stat-label">Overdue</div>
      </div>
    </div>

    <!-- Revenue Stats -->
    <div class="revenue-stats">
      <div class="revenue-card">
        <div class="revenue-value">R{{ formatAmount(stats.total_revenue) || '0.00' }}</div>
        <div class="revenue-label">Total Revenue</div>
      </div>
      <div class="revenue-card">
        <div class="revenue-value">R{{ formatAmount(stats.pending_revenue) || '0.00' }}</div>
        <div class="revenue-label">Pending Revenue</div>
      </div>
      <div class="revenue-card">
        <div class="revenue-value">R{{ formatAmount(stats.overdue_revenue) || '0.00' }}</div>
        <div class="revenue-label">Overdue Revenue</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    stats: {
      type: Object,
      default: () => ({
        total_invoices: 0,
        pending_invoices: 0,
        sent_invoices: 0,
        paid_invoices: 0,
        overdue_invoices: 0,
        total_revenue: 0,
        pending_revenue: 0,
        overdue_revenue: 0
      })
    }
  },
  methods: {
    formatAmount(amount) {
      return parseFloat(amount || 0).toFixed(2)
    }
  }
}
</script>

<style scoped>
.statistics-section {
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.revenue-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card, .revenue-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #6b7280;
}

.stat-card.pending {
  border-left-color: #f59e0b;
}

.stat-card.sent {
  border-left-color: #3b82f6;
}

.stat-card.paid {
  border-left-color: #10b981;
}

.stat-card.overdue {
  border-left-color: #ef4444;
}

.revenue-card {
  border-left-color: #8b5cf6;
}

.stat-value, .revenue-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label, .revenue-label {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .stats-grid,
  .revenue-stats {
    grid-template-columns: 1fr;
  }
}
</style>