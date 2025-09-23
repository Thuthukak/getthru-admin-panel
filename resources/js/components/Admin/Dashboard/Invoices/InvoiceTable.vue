<template>
  <div class="table-container">
    <table class="invoice-table">
      <thead>
        <tr>
          <th>
            <input 
              type="checkbox" 
              @change="$emit('toggle-all-selection')"
              :checked="isAllSelected"
            >
          </th>
          <th @click="$emit('sort', 'invoice_number')" class="sortable">
            Invoice #
            <span v-if="sortField === 'invoice_number'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="$emit('sort', 'customer_name')" class="sortable">
            Customer
            <span v-if="sortField === 'customer_name'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="$emit('sort', 'service_type')" class="sortable">
            Service
            <span v-if="sortField === 'service_type'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="$emit('sort', 'amount')" class="sortable">
            Amount
            <span v-if="sortField === 'amount'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="$emit('sort', 'billing_date')" class="sortable">
            Billing Date
            <span v-if="sortField === 'billing_date'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="$emit('sort', 'due_date')" class="sortable">
            Due Date
            <span v-if="sortField === 'due_date'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading && invoices.length === 0">
          <td colspan="9" class="text-center">Loading...</td>
        </tr>
        <tr v-else-if="invoices.length === 0">
          <td colspan="9" class="text-center">No invoices found</td>
        </tr>
        <tr 
          v-for="invoice in invoices" 
          :key="invoice.id"
          :class="{ 'selected': selectedInvoices.includes(invoice.id) }"
        >
          <td>
            <input 
              type="checkbox" 
              :checked="selectedInvoices.includes(invoice.id)"
              @change="$emit('toggle-selection', invoice.id)"
            >
          </td>
          <td>{{ invoice.invoice_number }}</td>
          <td>{{ invoice.customer_name }}</td>
          <td>{{ formatServiceInfo(invoice) }}</td>
          <td>R{{ formatAmount(invoice.amount) }}</td>
          <td>{{ formatDate(invoice.billing_date) }}</td>
          <td>{{ formatDate(invoice.due_date) }}</td>
          <td>
            <span :class="`status-badge status-${invoice.status}`">
              {{ formatStatus(invoice.status) }}
            </span>
          </td>
          <td class="actions">
            <button 
              @click="$emit('view-invoice', invoice)" 
              class="btn btn-sm btn-outline"
              title="View"
            >
            <font-awesome-icon :icon="['fas', 'eye']" />
            </button>
            <button 
              @click="$emit('send-invoice', invoice)" 
              class="btn btn-sm btn-outline"
              :disabled="invoice.status === 'paid'"
              title="Send"
            >
            <font-awesome-icon :icon="['fas', 'envelope']" />
            </button>
            <button 
              @click="$emit('edit-invoice', invoice)" 
              class="btn btn-sm btn-outline"
              title="Edit"
            >
             ✎
            </button>
            <button 
              @click="$emit('mark-paid', invoice)" 
              class="btn btn-sm btn-success"
              v-if="invoice.status !== 'paid'"
              title="Mark as Paid"
            >
             ✓
            </button>
            <button 
              @click="$emit('delete-invoice', invoice)" 
              class="btn btn-sm btn-danger"
              title="Delete"
            >
            <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'InvoiceTable',
  props: {
    invoices: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedInvoices: {
      type: Array,
      default: () => []
    },
    sortField: {
      type: String,
      default: 'created_at'
    },
    sortDirection: {
      type: String,
      default: 'desc'
    }
  },
  emits: [
    'toggle-selection',
    'toggle-all-selection',
    'sort',
    'view-invoice',
    'send-invoice',
    'edit-invoice',
    'mark-paid',
    'delete-invoice'
  ],
  setup(props) {
    const isAllSelected = computed(() => {
      return props.invoices.length > 0 && props.selectedInvoices.length === props.invoices.length
    })

    return {
      isAllSelected
    }
  },
  methods: {
    formatAmount(amount) {
      return parseFloat(amount || 0).toFixed(2)
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-ZA')
    },
    formatStatus(status) {
      const statusMap = {
        pending: 'Pending',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
        cancelled: 'Cancelled'
      }
      return statusMap[status] || status
    },
    formatServiceType(serviceType) {
      const typeMap = {
        homeInternet: 'Home Internet',
        businessInternet: 'Business Internet',
      }
      return typeMap[serviceType] || serviceType
    },
    formatServiceInfo(invoice) {
      // Check if packagePrice relationship exists
      if (invoice.package_price && invoice.package_price.service_type) {
        const serviceType = this.formatServiceType(invoice.package_price.service_type)
        const packageName = invoice.package_price.package || ''
        const description = invoice.package_price.description || ''
        
        // Build the service info string
        let serviceInfo = serviceType
        if (packageName) {
          serviceInfo += ` - ${packageName}`
        }
        if (description && description !== packageName) {
          serviceInfo += ` (${description})`
        }
        
        return serviceInfo
      }
      
      // Fallback to direct fields if relationship not loaded
      if (invoice.service_type) {
        const serviceType = this.formatServiceType(invoice.service_type)
        const packageName = invoice.package || ''
        
        let serviceInfo = serviceType
        if (packageName) {
          serviceInfo += ` - ${packageName}`
        }
        
        return serviceInfo
      }
      
      return 'Service information not available'
    }
  }
}
</script>

<style scoped>
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table th {
  background: #f9fafb;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  user-select: none;
}

.invoice-table th.sortable {
  cursor: pointer;
  position: relative;
}

.invoice-table th.sortable:hover {
  background: #f3f4f6;
}

.sort-arrow {
  margin-left: 5px;
  font-size: 12px;
}

.invoice-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.invoice-table tbody tr:hover {
  background: #f9fafb;
}

.invoice-table tbody tr.selected {
  background: #eff6ff;
}

.text-center {
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background: #fef3c7;
  color: #d97706;
}

.status-sent {
  background: #dbeafe;
  color: #2563eb;
}

.status-paid {
  background: #d1fae5;
  color: #065f46;
}

.status-overdue {
  background: #fee2e2;
  color: #dc2626;
}

.status-cancelled {
  background: #f3f4f6;
  color: #6b7280;
}

/* Actions */
.actions {
  display: flex;
  gap: 8px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-outline:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-success {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
  border-color: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .actions {
    flex-wrap: wrap;
  }
  
  .invoice-table {
    font-size: 12px;
  }
  
  .invoice-table th,
  .invoice-table td {
    padding: 8px 6px;
  }
}

@media (max-width: 480px) {
  .btn {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .btn-sm {
    padding: 4px 6px;
    font-size: 10px;
  }
}
</style>