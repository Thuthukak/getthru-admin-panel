<template>
  <div class="statistics-section">
    <!-- Primary Stats Row -->
    <div class="primary-stats">
      <div class="stat-card primary">
        <div class="stat-value">{{ stats.total_invoices || 0 }}</div>
        <div class="stat-label">Total Invoices</div>
      </div>
      <div class="revenue-card primary">
        <div class="revenue-value">R{{ formatAmount(stats.total_revenue) || '0.00' }}</div>
        <div class="revenue-label">Total Revenue</div>
      </div>
    </div>

    <!-- Status Stats Grid -->
    <div class="status-stats">
      <div class="stat-card pending">
        <div class="stat-value">{{ stats.pending_invoices || 0 }}</div>
        <div class="stat-label">Pending</div>
        <div class="stat-revenue">R{{ formatAmount(stats.pending_revenue) || '0.00' }}</div>
      </div>
      <div class="stat-card sent">
        <div class="stat-value">{{ stats.sent_invoices || 0 }}</div>
        <div class="stat-label">Sent</div>
        <div class="stat-revenue">R{{ formatAmount(stats.sent_revenue) || '0.00' }}</div>
      </div>
      <div class="stat-card paid">
        <div class="stat-value">{{ stats.paid_invoices || 0 }}</div>
        <div class="stat-label">Paid</div>
        <div class="stat-revenue">R{{ formatAmount(stats.paid_revenue) || '0.00' }}</div>
      </div>
      <div class="stat-card overdue">
        <div class="stat-value">{{ stats.overdue_invoices || 0 }}</div>
        <div class="stat-label">Overdue</div>
        <div class="stat-revenue">R{{ formatAmount(stats.overdue_revenue) || '0.00' }}</div>
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
        sent_revenue: 0,
        paid_revenue: 0,
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

/* Primary Stats - Two prominent cards */
.primary-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.stat-card.primary,
.revenue-card.primary {
  background: linear-gradient(135deg, #2688e0 0%, #53d826 100%);
  color: white;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  text-align: center;
  border: none;
}

.stat-card.primary .stat-value,
.revenue-card.primary .revenue-value {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
  color: white;
}

.stat-card.primary .stat-label,
.revenue-card.primary .revenue-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Status Stats - 4 cards in a row */
.status-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 24px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #6b7280;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
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

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-revenue {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .status-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .primary-stats {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .status-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-card.primary,
  .revenue-card.primary {
    padding: 24px 20px;
  }
  
  .stat-card.primary .stat-value,
  .revenue-card.primary .revenue-value {
    font-size: 28px;
  }
  
  .stat-card {
    padding: 20px 16px;
  }
  
  .stat-value {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .statistics-section {
    margin-bottom: 20px;
  }
  
  .stat-card.primary .stat-value,
  .revenue-card.primary .revenue-value {
    font-size: 24px;
  }
  
  .stat-value {
    font-size: 20px;
  }
}
</style>