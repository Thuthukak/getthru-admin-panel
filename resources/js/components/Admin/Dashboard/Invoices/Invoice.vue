<template>
  <div class="invoice-management">
    <div class="page-header">
      <h1 class="page-title">Invoice Management</h1>
      <div class="header-actions">
        <button 
          @click="generateRecurring" 
          class="btn btn-outline"
          :disabled="loading"
        >
          Generate Recurring
        </button>
        <button 
          @click="sendAutomatic" 
          class="btn btn-outline"
          :disabled="loading"
        >
          Send Automatic
        </button>
        <button 
          @click="markOverdue" 
          class="btn btn-outline"
          :disabled="loading"
        >
          Mark Overdue
        </button>
        <button 
          @click="showCreateModal = true" 
          class="btn btn-primary"
        >
          Create Invoice
        </button>
      </div>
    </div>

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

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="filter-group">
          <input 
            v-model="filters.search" 
            placeholder="Search invoices..."
            class="input-field"
            @input="debouncedSearch"
          >
        </div>
        <div class="filter-group">
          <select v-model="filters.status" @change="applyFilters" class="select-field">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div class="filter-group">
          <select v-model="filters.service_type" @change="applyFilters" class="select-field">
            <option value="">All Services</option>
            <option value="fiber">Fiber</option>
            <option value="adsl">ADSL</option>
            <option value="wireless">Wireless</option>
          </select>
        </div>
        <div class="filter-group">
          <input 
            v-model="filters.date_from" 
            type="date"
            class="input-field"
            @change="applyFilters"
          >
        </div>
        <div class="filter-group">
          <input 
            v-model="filters.date_to" 
            type="date"
            class="input-field"
            @change="applyFilters"
          >
        </div>
        <div class="filter-group">
          <label class="checkbox-label">
            <input 
              v-model="filters.overdue" 
              type="checkbox"
              @change="applyFilters"
            >
            Overdue Only
          </label>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedInvoices.length > 0" class="bulk-actions">
      <span>{{ selectedInvoices.length }} selected</span>
      <button @click="sendBulkInvoices" class="btn btn-outline">Send Selected</button>
      <button @click="selectedInvoices = []" class="btn btn-outline">Clear Selection</button>
    </div>

    <!-- Invoice Table -->
    <div class="table-container">
      <table class="invoice-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                @change="toggleAllSelection"
                :checked="isAllSelected"
              >
            </th>
            <th @click="sort('invoice_number')" class="sortable">
              Invoice #
              <span v-if="sortField === 'invoice_number'" class="sort-arrow">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sort('customer_name')" class="sortable">
              Customer
              <span v-if="sortField === 'customer_name'" class="sort-arrow">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sort('service_type')" class="sortable">
              Service
              <span v-if="sortField === 'service_type'" class="sort-arrow">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sort('amount')" class="sortable">
              Amount
              <span v-if="sortField === 'amount'" class="sort-arrow">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sort('billing_date')" class="sortable">
              Billing Date
              <span v-if="sortField === 'billing_date'" class="sort-arrow">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sort('due_date')" class="sortable">
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
                @change="toggleSelection(invoice.id)"
              >
            </td>
            <td>{{ invoice.invoice_number }}</td>
            <td>{{ invoice.customer_name }}</td>
            <td>{{ formatServiceType(invoice.service_type) }} - {{ invoice.package }}</td>
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
                @click="viewInvoice(invoice)" 
                class="btn btn-sm btn-outline"
                title="View"
              >
                👁️
              </button>
              <button 
                @click="sendSingleInvoice(invoice)" 
                class="btn btn-sm btn-outline"
                :disabled="invoice.status === 'paid'"
                title="Send"
              >
                📧
              </button>
              <button 
                @click="editInvoice(invoice)" 
                class="btn btn-sm btn-outline"
                title="Edit"
              >
                ✏️
              </button>
              <button 
                @click="markAsPaid(invoice)" 
                class="btn btn-sm btn-success"
                v-if="invoice.status !== 'paid'"
                title="Mark as Paid"
              >
                ✓
              </button>
              <button 
                @click="deleteInvoice(invoice)" 
                class="btn btn-sm btn-danger"
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.total > pagination.per_page" class="pagination">
      <button 
        @click="changePage(pagination.current_page - 1)"
        :disabled="pagination.current_page <= 1"
        class="btn btn-outline btn-sm"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ pagination.current_page }} of {{ pagination.last_page }}
        ({{ pagination.total }} total)
      </span>
      <button 
        @click="changePage(pagination.current_page + 1)"
        :disabled="pagination.current_page >= pagination.last_page"
        class="btn btn-outline btn-sm"
      >
        Next
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showCreateModal ? 'Create Invoice' : 'Edit Invoice' }}</h3>
          <button @click="closeModals" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group" v-if="showCreateModal">
              <label>Customer</label>
              <select v-model="form.registration_id" class="select-field" required>
                <option value="">Select Customer</option>
                <option 
                  v-for="reg in registrations" 
                  :key="reg.id" 
                  :value="reg.id"
                >
                  {{ reg.name }} - {{ reg.email }}
                </option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Amount</label>
                <input 
                  v-model="form.amount" 
                  type="number" 
                  step="0.01" 
                  class="input-field" 
                  required
                >
              </div>
              <div class="form-group">
                <label>Billing Date</label>
                <input 
                  v-model="form.billing_date" 
                  type="date" 
                  class="input-field" 
                  required
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Due Date</label>
                <input 
                  v-model="form.due_date" 
                  type="date" 
                  class="input-field" 
                  required
                >
              </div>
              <div class="form-group" v-if="showEditModal">
                <label>Status</label>
                <select v-model="form.status" class="select-field">
                  <option value="pending">Pending</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Notes</label>
              <textarea v-model="form.notes" class="textarea-field" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="form.is_recurring" type="checkbox">
                Recurring Invoice
              </label>
            </div>
            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-outline">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ showCreateModal ? 'Create' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeModals">
      <div class="modal modal-lg" @click.stop>
        <div class="modal-header">
          <h3>Invoice Details</h3>
          <button @click="closeModals" class="modal-close">×</button>
        </div>
        <div class="modal-body" v-if="selectedInvoice">
          <div class="invoice-details">
            <div class="detail-section">
              <h4>Invoice Information</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Invoice Number:</label>
                  <span>{{ selectedInvoice.invoice_number }}</span>
                </div>
                <div class="detail-item">
                  <label>Amount:</label>
                  <span>R{{ formatAmount(selectedInvoice.amount) }}</span>
                </div>
                <div class="detail-item">
                  <label>Status:</label>
                  <span :class="`status-badge status-${selectedInvoice.status}`">
                    {{ formatStatus(selectedInvoice.status) }}
                  </span>
                </div>
                <div class="detail-item">
                  <label>Billing Date:</label>
                  <span>{{ formatDate(selectedInvoice.billing_date) }}</span>
                </div>
                <div class="detail-item">
                  <label>Due Date:</label>
                  <span>{{ formatDate(selectedInvoice.due_date) }}</span>
                </div>
                <div class="detail-item">
                  <label>Payment Period:</label>
                  <span>{{ selectedInvoice.payment_period }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h4>Customer Information</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Name:</label>
                  <span>{{ selectedInvoice.customer_name }}</span>
                </div>
                <div class="detail-item">
                  <label>Email:</label>
                  <span>{{ selectedInvoice.customer_email }}</span>
                </div>
                <div class="detail-item">
                  <label>Phone:</label>
                  <span>{{ selectedInvoice.customer_phone }}</span>
                </div>
                <div class="detail-item">
                  <label>Service:</label>
                  <span>{{ formatServiceType(selectedInvoice.service_type) }} - {{ selectedInvoice.package }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section" v-if="selectedInvoice.notes">
              <h4>Notes</h4>
              <p>{{ selectedInvoice.notes }}</p>
            </div>

            <div class="detail-section" v-if="selectedInvoice.email_logs && selectedInvoice.email_logs.length">
              <h4>Email History</h4>
              <div class="email-logs">
                <div 
                  v-for="log in selectedInvoice.email_logs" 
                  :key="log.id"
                  class="email-log-item"
                >
                  <div class="log-status" :class="log.status">{{ log.status }}</div>
                  <div class="log-date">{{ formatDateTime(log.sent_at) }}</div>
                  <div class="log-email">{{ log.email }}</div>
                  <div v-if="log.error_message" class="log-error">{{ log.error_message }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="toast-container">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="`toast toast-${toast.type}`"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue'

export default {
  name: 'InvoiceManagement',
  setup() {
    // Reactive data
    const loading = ref(false)
    const invoices = ref([])
    const registrations = ref([])
    const selectedInvoices = ref([])
    const selectedInvoice = ref(null)
    const toasts = ref([])
    let searchTimeout = null
    
    // Modal states
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const showViewModal = ref(false)
    
    // Statistics
    const stats = reactive({
      total_invoices: 0,
      pending_invoices: 0,
      sent_invoices: 0,
      paid_invoices: 0,
      overdue_invoices: 0,
      total_revenue: 0,
      pending_revenue: 0,
      overdue_revenue: 0
    })
    
    // Filters
    const filters = reactive({
      search: '',
      status: '',
      service_type: '',
      date_from: '',
      date_to: '',
      overdue: false
    })
    
    // Pagination
    const pagination = reactive({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0
    })
    
    // Sorting
    const sortField = ref('created_at')
    const sortDirection = ref('desc')
    
    // Form data
    const form = reactive({
      registration_id: '',
      amount: '',
      billing_date: '',
      due_date: '',
      status: 'pending',
      notes: '',
      is_recurring: true
    })
    
    // Computed properties
    const isAllSelected = computed(() => {
      return invoices.value.length > 0 && selectedInvoices.value.length === invoices.value.length
    })
    
    // API methods
    const fetchInvoices = async (page = 1) => {
      loading.value = true
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: pagination.per_page.toString(),
          sort_field: sortField.value,
          sort_direction: sortDirection.value,
          ...filters
        })
        
        const response = await fetch(`/api/invoices?${params}`)
        const data = await response.json()
        
        if (data.success) {
          invoices.value = data.data.data
          pagination.current_page = data.data.current_page
          pagination.last_page = data.data.last_page
          pagination.total = data.data.total
        } else {
          showToast('Failed to fetch invoices', 'error')
        }
      } catch (error) {
        showToast('Error fetching invoices', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/invoices/stats')
        const data = await response.json()
        
        if (data.success) {
          Object.assign(stats, data.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/invoices/registrations')
        const data = await response.json()
        
        if (data.success) {
          registrations.value = data.data
        }
      } catch (error) {
        console.error('Error fetching registrations:', error)
      }
    }
    
    // CRUD operations
    const createInvoice = async () => {
      loading.value = true
      try {
        const response = await fetch('/api/invoices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify(form)
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast('Invoice created successfully', 'success')
          closeModals()
          resetForm()
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to create invoice', 'error')
        }
      } catch (error) {
        showToast('Error creating invoice', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const updateInvoice = async () => {
      loading.value = true
      try {
        const response = await fetch(`/api/invoices/${selectedInvoice.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify(form)
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast('Invoice updated successfully', 'success')
          closeModals()
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to update invoice', 'error')
        }
      } catch (error) {
        showToast('Error updating invoice', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const deleteInvoice = async (invoice) => {
      if (!confirm(`Are you sure you want to delete invoice ${invoice.invoice_number}?`)) {
        return
      }
      
      loading.value = true
      try {
        const response = await fetch(`/api/invoices/${invoice.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast('Invoice deleted successfully', 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to delete invoice', 'error')
        }
      } catch (error) {
        showToast('Error deleting invoice', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const sendSingleInvoice = async (invoice) => {
      loading.value = true
      try {
        const response = await fetch(`/api/invoices/${invoice.id}/send`, {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast('Invoice sent successfully', 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to send invoice', 'error')
        }
      } catch (error) {
        showToast('Error sending invoice', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const sendBulkInvoices = async () => {
      loading.value = true
      try {
        const response = await fetch('/api/invoices/send-bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ invoice_ids: selectedInvoices.value })
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast(data.message, 'success')
          selectedInvoices.value = []
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to send invoices', 'error')
        }
      } catch (error) {
        showToast('Error sending bulk invoices', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const generateRecurring = async () => {
      loading.value = true
      try {
        const response = await fetch('/api/invoices/generate-recurring', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast(data.message, 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to generate recurring invoices', 'error')
        }
      } catch (error) {
        showToast('Error generating recurring invoices', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const sendAutomatic = async () => {
      loading.value = true
      try {
        const response = await fetch('/api/invoices/send-automatic', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast(data.message, 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to send automatic invoices', 'error')
        }
      } catch (error) {
        showToast('Error sending automatic invoices', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const markOverdue = async () => {
      loading.value = true
      try {
        const response = await fetch('/api/invoices/mark-overdue', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast(data.message, 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to mark overdue invoices', 'error')
        }
      } catch (error) {
        showToast('Error marking overdue invoices', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const markAsPaid = async (invoice) => {
      loading.value = true
      try {
        const response = await fetch(`/api/invoices/${invoice.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ status: 'paid' })
        })
        
        const data = await response.json()
        
        if (data.success) {
          showToast('Invoice marked as paid', 'success')
          fetchInvoices()
          fetchStats()
        } else {
          showToast(data.message || 'Failed to update invoice', 'error')
        }
      } catch (error) {
        showToast('Error updating invoice', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    // UI helper methods
    const viewInvoice = async (invoice) => {
      loading.value = true
      try {
        const response = await fetch(`/api/invoices/${invoice.id}`)
        const data = await response.json()
        
        if (data.success) {
          selectedInvoice.value = data.data
          showViewModal.value = true
        } else {
          showToast('Failed to load invoice details', 'error')
        }
      } catch (error) {
        showToast('Error loading invoice details', 'error')
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
    
    const editInvoice = (invoice) => {
      selectedInvoice.value = invoice
      form.registration_id = invoice.registration_id
      form.amount = invoice.amount
      form.billing_date = invoice.billing_date
      form.due_date = invoice.due_date
      form.status = invoice.status
      form.notes = invoice.notes || ''
      form.is_recurring = invoice.is_recurring
      showEditModal.value = true
    }
    
    const submitForm = () => {
      if (showCreateModal.value) {
        createInvoice()
      } else if (showEditModal.value) {
        updateInvoice()
      }
    }
    
    const closeModals = () => {
      showCreateModal.value = false
      showEditModal.value = false
      showViewModal.value = false
      selectedInvoice.value = null
      resetForm()
    }
    
    const resetForm = () => {
      form.registration_id = ''
      form.amount = ''
      form.billing_date = ''
      form.due_date = ''
      form.status = 'pending'
      form.notes = ''
      form.is_recurring = true
    }
    
    // Filter and search methods
    const applyFilters = () => {
      pagination.current_page = 1
      fetchInvoices(1)
    }
    
    const debouncedSearch = () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        applyFilters()
      }, 500)
    }
    
    // Sorting methods
    const sort = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortField.value = field
        sortDirection.value = 'asc'
      }
      fetchInvoices(1)
    }
    
    // Pagination methods
    const changePage = (page) => {
      if (page >= 1 && page <= pagination.last_page) {
        fetchInvoices(page)
      }
    }
    
    // Selection methods
    const toggleSelection = (invoiceId) => {
      const index = selectedInvoices.value.indexOf(invoiceId)
      if (index > -1) {
        selectedInvoices.value.splice(index, 1)
      } else {
        selectedInvoices.value.push(invoiceId)
      }
    }
    
    const toggleAllSelection = () => {
      if (isAllSelected.value) {
        selectedInvoices.value = []
      } else {
        selectedInvoices.value = invoices.value.map(invoice => invoice.id)
      }
    }
    
    // Formatting methods
    const formatAmount = (amount) => {
      return parseFloat(amount || 0).toFixed(2)
    }
    
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-ZA')
    }
    
    const formatDateTime = (datetime) => {
      if (!datetime) return ''
      return new Date(datetime).toLocaleString('en-ZA')
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
        fiber: 'Fiber',
        adsl: 'ADSL',
        wireless: 'Wireless'
      }
      return typeMap[serviceType] || serviceType
    }
    
    // Toast notification methods
    const showToast = (message, type = 'info') => {
      const toast = {
        id: Date.now(),
        message,
        type
      }
      toasts.value.push(toast)
      
      setTimeout(() => {
        const index = toasts.value.findIndex(t => t.id === toast.id)
        if (index > -1) {
          toasts.value.splice(index, 1)
        }
      }, 5000)
    }
    
    // Watchers
    watch(() => showCreateModal.value, (newVal) => {
      if (newVal && registrations.value.length === 0) {
        fetchRegistrations()
      }
    })
    
    // Lifecycle hooks
    onMounted(() => {
      fetchInvoices()
      fetchStats()
    })
    
    onUnmounted(() => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    })
    
    return {
      // Reactive data
      loading,
      invoices,
      registrations,
      selectedInvoices,
      selectedInvoice,
      toasts,
      
      // Modal states
      showCreateModal,
      showEditModal,
      showViewModal,
      
      // Statistics and pagination
      stats,
      pagination,
      
      // Filters and sorting
      filters,
      sortField,
      sortDirection,
      
      // Form
      form,
      
      // Computed
      isAllSelected,
      
      // Methods
      fetchInvoices,
      fetchStats,
      fetchRegistrations,
      createInvoice,
      updateInvoice,
      deleteInvoice,
      sendSingleInvoice,
      sendBulkInvoices,
      generateRecurring,
      sendAutomatic,
      markOverdue,
      markAsPaid,
      viewInvoice,
      editInvoice,
      submitForm,
      closeModals,
      resetForm,
      applyFilters,
      debouncedSearch,
      sort,
      changePage,
      toggleSelection,
      toggleAllSelection,
      formatAmount,
      formatDate,
      formatDateTime,
      formatStatus,
      formatServiceType,
      showToast
    }
  }
}
</script>

<style scoped>
.invoice-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Statistics Cards */
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
  margin-bottom: 30px;
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

/* Filters */
.filters-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: end;
}

.filter-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 5px;
}

/* Bulk Actions */
.bulk-actions {
  background: #f3f4f6;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

/* Table */
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px;
}

.page-info {
  color: #6b7280;
  font-size: 14px;
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

.btn-primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  border-color: #2563eb;
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

/* Form Elements */
.input-field,
.select-field,
.textarea-field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.input-field:focus,
.select-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

/* Modals */
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
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-lg {
  max-width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 24px;
}

.modal-actions {
  display: flex;
  justify-content: end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

/* Form Layout */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 5px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* Invoice Details */
.invoice-details {
  space-y: 20px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-item label {
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}

.detail-item span {
  color: #1f2937;
}

/* Email Logs */
.email-logs {
  space-y: 8px;
}

.email-log-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 4px;
  font-size: 14px;
}

.log-status {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.log-status.sent {
  background: #d1fae5;
  color: #065f46;
}

.log-status.failed {
  background: #fee2e2;
  color: #dc2626;
}

.log-date {
  color: #6b7280;
}

.log-email {
  color: #374151;
}

.log-error {
  grid-column: 1 / -1;
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  animation: slideIn 0.3s ease;
}

.toast-success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.toast-error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.toast-info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .invoice-management {
    padding: 10px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .stats-grid,
  .revenue-stats {
    grid-template-columns: 1fr;
  }
  
  .filters-row {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: start;
    gap: 4px;
  }
  
  .bulk-actions {
    flex-direction: column;
    gap: 10px;
    align-items: start;
  }
  
  .actions {
    flex-wrap: wrap;
  }
  
  .modal {
    width: 95%;
    margin: 10px;
  }
  
  .toast-container {
    left: 10px;
    right: 10px;
  }
  
  .toast {
    max-width: none;
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