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
          <th class="actions-header">Actions</th>
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
          <td>
            {{ invoice.customer ? 
                `${invoice.customer.name} ${invoice.customer.surname}` : 
                invoice.customer_name 
            }}
          </td>
          <td>{{ formatServiceInfo(invoice) }}</td>
          <td>R{{ formatAmount(invoice.amount) }}</td>
          <td>{{ formatDate(invoice.billing_date) }}</td>
          <td>{{ formatDate(invoice.due_date) }}</td>
          <td>
            <span :class="`status-badge status-${invoice.status}`">
              {{ formatStatus(invoice.status) }}
            </span>
          </td>
          <td class="actions mt-5">
            <div class="dropdown" :class="{ 'open': openDropdown === invoice.id }">
              <button 
                @click.stop="toggleDropdown(invoice.id)"
                class="dropdown-toggle mb-5"
                type="button"
              >
                ⋮
              </button>
              <div class="dropdown-menu" v-show="openDropdown === invoice.id">
                <button 
                  @click.stop="handleAction('view-invoice', invoice)" 
                  class="dropdown-item"
                >
                  View
                </button>
                <button 
                  @click.stop="handleAction('send-invoice', invoice)" 
                  class="dropdown-item"
                  :disabled="invoice.status === 'paid'"
                >
                  Send Email
                </button>
                <button 
                  @click.stop="handleAction('edit-invoice', invoice)" 
                  class="dropdown-item"
                >
                  Edit
                </button>
                <button 
                  @click.stop="handleAction('mark-paid', invoice)" 
                  class="dropdown-item success"
                  v-if="invoice.status !== 'paid'"
                >
                  Mark As Paid
                </button>
                <div class="dropdown-divider"></div>
                <button 
                  @click.stop="handleAction('delete-invoice', invoice)" 
                  class="dropdown-item danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'

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
  setup(props, { emit }) {
    const openDropdown = ref(null)

    const isAllSelected = computed(() => {
      return props.invoices.length > 0 && props.selectedInvoices.length === props.invoices.length
    })

    const toggleDropdown = (invoiceId) => {
      console.log('Toggle dropdown clicked for invoice:', invoiceId) // Debug log
      console.log('Current openDropdown value:', openDropdown.value) // Debug log
      openDropdown.value = openDropdown.value === invoiceId ? null : invoiceId
      console.log('New openDropdown value:', openDropdown.value) // Debug log
    }

    const handleAction = (action, invoice) => {
      console.log('Action clicked:', action, invoice.id) // Debug log
      emit(action, invoice)
      openDropdown.value = null // Close dropdown after action
    }

    const closeDropdowns = () => {
      openDropdown.value = null
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        closeDropdowns()
      }
    }

    // Formatting functions
    const formatAmount = (amount) => {
      return parseFloat(amount || 0).toFixed(2)
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-ZA')
    }

    const formatStatus = (status) => {
      const statusMap = {
        pending: 'Pending',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
        cancelled: 'Cancelled'
      }
      return statusMap[status] || status
    }

    const formatServiceType = (serviceType) => {
      const typeMap = {
        homeInternet: 'Home Internet',
        businessInternet: 'Business Internet',
      }
      return typeMap[serviceType] || serviceType
    }

    const formatServiceInfo = (invoice) => {
      // Check if packagePrice relationship exists
      if (invoice.package_price && invoice.package_price.service_type) {
        const serviceType = formatServiceType(invoice.package_price.service_type)
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
        const serviceType = formatServiceType(invoice.service_type)
        const packageName = invoice.package || ''
        
        let serviceInfo = serviceType
        if (packageName) {
          serviceInfo += ` - ${packageName}`
        }
        
        return serviceInfo
      }
      
      return 'Service information not available'
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      // Reactive data
      openDropdown,
      
      // Computed
      isAllSelected,
      
      // Methods
      toggleDropdown,
      handleAction,
      closeDropdowns,
      formatAmount,
      formatDate,
      formatStatus,
      formatServiceType,
      formatServiceInfo
    }
  }
}
</script>

<style scoped>
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: visible;
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

/* Actions column */
.actions-header {
  width: 60px;
  text-align: center;
}

.actions {
  width: 60px;
  text-align: center;
  position: relative;
}

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 18px;
  font-weight: bold;
  color: #64748b;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 1;
  min-width: 32px;
}

.dropdown-toggle:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #475569;
}

.dropdown.open .dropdown-toggle {
  background: #e2e8f0;
  border-color: #94a3b8;
  color: #374151;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% - 18px);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  min-width: 150px;
  padding: 6px 0;
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.15s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  color: #374151;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover:not(:disabled) {
  background: #f9fafb;
}

.dropdown-item:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

.dropdown-item.success {
  color: #059669;
}

.dropdown-item.success:hover:not(:disabled) {
  background: #ecfdf5;
}

.dropdown-item.danger {
  color: #dc2626;
}

.dropdown-item.danger:hover {
  background: #fef2f2;
}

.dropdown-item .icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 6px 0;
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .invoice-table {
    font-size: 12px;
  }
  
  .invoice-table th,
  .invoice-table td {
    padding: 8px 6px;
  }

  .dropdown-menu {
    right: -20px;
    min-width: 130px;
  }

  .dropdown-item {
    padding: 8px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .actions-header {
    width: 50px;
  }
  
  .actions {
    width: 50px;
  }

  .dropdown-toggle {
    padding: 4px 8px;
    font-size: 16px;
    min-width: 28px;
  }

  .dropdown-menu {
    right: -30px;
    min-width: 120px;
  }
}
</style>