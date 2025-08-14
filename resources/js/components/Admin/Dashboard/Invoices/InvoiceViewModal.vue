<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="modal modal-large" @click.stop>
      <div class="modal-header">
        <h3>Invoice {{ invoice?.invoice_number }}</h3>
        <button @click="$emit('close')" class="btn-close">×</button>
      </div>
      <div class="modal-body" v-if="invoice">
        <div class="invoice-view">
          <div class="invoice-header">
            <div class="invoice-info">
              <h4>{{ invoice.client?.name }}</h4>
              <p>{{ invoice.client?.email }}</p>
            </div>
            <div class="invoice-meta">
              <div><strong>Date:</strong> {{ formatDate(invoice.invoice_date) }}</div>
              <div><strong>Due:</strong> {{ formatDate(invoice.due_date) }}</div>
              <div><strong>Status:</strong> 
                <span class="status-badge" :class="'status-' + invoice.status">
                  {{ formatStatus(invoice.status) }}
                </span>
              </div>
            </div>
          </div>

          <div class="invoice-items">
            <table class="items-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in invoice.items" :key="item.id">
                  <td>{{ item.service?.name ?? 'Service Not Found' }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>R{{ formatCurrency(item.unit_price) }}</td>
                  <td>R{{ formatCurrency(item.quantity * item.unit_price) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="invoice-totals">
            <div class="total-line">
              <strong>Total: R{{ formatCurrency(invoice.total) }}</strong>
            </div>
            <div v-if="invoice.paid_amount > 0" class="total-line">
              Paid: R{{ formatCurrency(invoice.paid_amount) }}
            </div>
            <div v-if="invoice.balance > 0" class="total-line">
              Balance: R{{ formatCurrency(invoice.balance) }}
            </div>
          </div>

          <div v-if="invoice.notes" class="invoice-notes">
            <h5>Notes:</h5>
            <p>{{ invoice.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceViewModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    invoice: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  methods: {
    formatCurrency(amount) {
      return parseFloat(amount || 0).toFixed(2)
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  max-width: 600px;
  margin: 20px;
}

.modal-large {
  max-width: 900px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-close:hover {
  color: #374151;
  background: #f3f4f6;
}

.modal-body {
  padding: 24px;
}

/* Invoice View Styles */
.invoice-view {
  max-width: 100%;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.invoice-info h4 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.invoice-info p {
  margin: 0;
  color: #6b7280;
}

.invoice-meta div {
  margin-bottom: 8px;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
}

.items-table th,
.items-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.items-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.items-table td:last-child,
.items-table th:last-child {
  text-align: right;
}

.invoice-totals {
  text-align: right;
  margin-bottom: 24px;
}

.total-line {
  margin-bottom: 8px;
  font-size: 16px;
}

.invoice-notes {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.invoice-notes h5 {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #374151;
}

.invoice-notes p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-draft {
  background: #fef3c7;
  color: #92400e;
}

.status-sent {
  background: #dbeafe;
  color: #1e40af;
}

.status-paid {
  background: #d1fae5;
  color: #047857;
}

.status-overdue {
  background: #fee2e2;
  color: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal {
    margin: 10px;
    max-height: 95vh;
  }
  
  .invoice-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }
}
</style>