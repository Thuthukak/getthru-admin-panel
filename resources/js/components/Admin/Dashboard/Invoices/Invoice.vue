<template>
  <div class="invoice-manager">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="page-title">Invoice Management</h1>
        <button @click="showCreateModal = true" class="btn btn-primary">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Create Invoice
        </button>
      </div>
      
      <!-- Statistics Cards -->
      <div class="stats-grid" v-if="statistics">
        <div class="stat-card">
          <div class="stat-value">{{ statistics.total_invoices }}</div>
          <div class="stat-label">Total Invoices</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">R{{ formatCurrency(statistics.total_revenue) }}</div>
          <div class="stat-label">Total Revenue</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">R{{ formatCurrency(statistics.pending_revenue) }}</div>
          <div class="stat-label">Pending Revenue</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ statistics.overdue_invoices }}</div>
          <div class="stat-label">Overdue</div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-grid">
        <div class="filter-group">
          <label>Search</label>
          <input 
            v-model="filters.search" 
            type="text" 
            placeholder="Invoice number or client name..."
            class="form-input"
            @input="debouncedSearch"
          />
        </div>
        
        <div class="filter-group">
          <label>Status</label>
          <select v-model="filters.status" class="form-select" @change="loadInvoices">
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Client</label>
          <select v-model="filters.client_id" class="form-select" @change="loadInvoices">
            <option value="">All Clients</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.name }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Date From</label>
          <input 
            v-model="filters.date_from" 
            type="date" 
            class="form-input"
            @change="loadInvoices"
          />
        </div>
        
        <div class="filter-group">
          <label>Date To</label>
          <input 
            v-model="filters.date_to" 
            type="date" 
            class="form-input"
            @change="loadInvoices"
          />
        </div>
        
        <div class="filter-group">
          <label class="checkbox-label">
            <input 
              v-model="filters.overdue_only" 
              type="checkbox"
              @change="loadInvoices"
            />
            Overdue Only
          </label>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="table-section">
      <div class="table-header">
        <h3>Invoices</h3>
        <div class="table-controls">
          <select v-model="pagination.per_page" @change="loadInvoices" class="form-select-sm">
            <option value="15">15 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="invoice-table">
          <thead>
            <tr>
              <th @click="sort('invoice_number')" class="sortable">
                Invoice #
                <span class="sort-indicator" :class="getSortClass('invoice_number')"></span>
              </th>
              <th>Client</th>
              <th @click="sort('invoice_date')" class="sortable">
                Date
                <span class="sort-indicator" :class="getSortClass('invoice_date')"></span>
              </th>
              <th @click="sort('due_date')" class="sortable">
                Due Date
                <span class="sort-indicator" :class="getSortClass('due_date')"></span>
              </th>
              <th @click="sort('total')" class="sortable">
                Total
                <span class="sort-indicator" :class="getSortClass('total')"></span>
              </th>
              <th @click="sort('status')" class="sortable">
                Status
                <span class="sort-indicator" :class="getSortClass('status')"></span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="loading-row">Loading invoices...</td>
            </tr>
            <tr v-else-if="invoices.length === 0">
              <td colspan="7" class="empty-row">No invoices found</td>
            </tr>
            <tr v-else v-for="invoice in invoices" :key="invoice.id" class="invoice-row">
              <td class="invoice-number">{{ invoice.invoice_number }}</td>
              <td>{{ invoice.client?.name }}</td>
              <td>{{ formatDate(invoice.invoice_date) }}</td>
              <td>{{ formatDate(invoice.due_date) }}</td>
              <td class="amount">R{{ formatCurrency(invoice.total) }}</td>
              <td>
                <span class="status-badge" :class="'status-' + invoice.status">
                  {{ formatStatus(invoice.status) }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button @click="viewInvoice(invoice)" class="btn-icon" title="View">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button @click="editInvoice(invoice)" class="btn-icon" title="Edit">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="duplicateInvoice(invoice)" class="btn-icon" title="Duplicate">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <div class="invoice-dropdown">
                    <button @click.stop="toggleDropdown(invoice.id, $event)" class="btn-icon">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                      </svg>
                    </button>
                    <div v-show="showDropdown && dropdownInvoiceId === invoice.id" class="invoice-dropdown-menu">
                      <button v-if="invoice.status === 'draft'" @click.stop="markAsSent(invoice)" class="invoice-dropdown-item">
                        Mark as Sent
                      </button>
                      <button v-if="invoice.status !== 'paid'" @click.stop="showPaymentModal(invoice)" class="invoice-dropdown-item">
                        Record Payment
                      </button>
                      <button v-if="invoice.status !== 'paid'" @click.stop="deleteInvoice(invoice)" class="invoice-dropdown-item danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > 0" class="pagination">
        <div class="pagination-info">
          Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
        </div>
        <div class="pagination-controls">
          <button 
            @click="changePage(pagination.current_page - 1)" 
            :disabled="pagination.current_page <= 1"
            class="btn btn-secondary"
          >
            Previous
          </button>
          <span class="page-info">
            Page {{ pagination.current_page }} of {{ pagination.last_page }}
          </span>
          <button 
            @click="changePage(pagination.current_page + 1)" 
            :disabled="pagination.current_page >= pagination.last_page"
            class="btn btn-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Invoice Modal -->
    <InvoiceCreateEditModal 
      :show="showCreateModal || showEditModal"
      :is-editing="showEditModal"
      :invoice="selectedInvoice"
      :services="services"
      :clients="clients"
      :saving="saving"
      @close="closeModals"
      @save="handleSaveInvoice"
    />

    <!-- Invoice Payment Modal -->
   <InvoicePaymentModal 
      :show="showPaymentModalFlag"
      :invoice="selectedInvoice"
      @close="closePaymentModal"
    />

    <!-- Invoice View Modal -->
    <InvoiceViewModal 
      :show="showViewModal"
      :invoice="selectedInvoice"
      @close="closeModals"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted  ,watch } from 'vue'
import InvoiceCreateEditModal from './InvoiceCreateEditModal.vue'
import InvoiceViewModal from './InvoiceViewModal.vue'
import InvoicePaymentModal from './InvoicePaymentModal.vue'

export default {
  name: 'Invoice',
  components: {
    InvoiceCreateEditModal,
    InvoiceViewModal,
    InvoicePaymentModal,
  },
  setup() {
    // Reactive data
    const invoices = ref([])
    const clients = ref([])
    const statistics = ref(null)
    const loading = ref(false)
    const saving = ref(false)
    const services = ref([])
    
    // Modal states
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const showViewModal = ref(false)
    const showPaymentModalFlag = ref(false)
    const selectedInvoice = ref(null)
    const activeDropdown = ref(null)
    const showDropdown = ref(false)
    const dropdownInvoiceId = ref(null)

    // Filters and pagination
    const filters = reactive({
      search: '',
      status: '',
      client_id: '',
      date_from: '',
      date_to: '',
      overdue_only: false
    })

    const sorting = reactive({
      sort_by: 'created_at',
      sort_order: 'desc'
    })

    const pagination = reactive({
      current_page: 1,
      per_page: 15,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0
    })

    // Forms
    const invoiceForm = reactive({
      client_id: '',
      invoice_date: '',
      due_date: '',
      notes: '',
      items: [
        { description: '', quantity: 1, unit_price: 0 }
      ]
    })

    const paymentForm = reactive({
      amount: 0,
      payment_method: '',
      payment_notes: ''
    })

    // API functions
    const api = {
      async get(url, params = {}) {
        const query = new URLSearchParams(params).toString()
        const response = await fetch(`/api/invoices${url}${query ? '?' + query : ''}`)
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      },

      async post(url, data) {
        const response = await fetch(`/api/invoices${url}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      },

      async put(url, data) {
        const response = await fetch(`/api/invoices${url}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      },

      async delete(url) {
        const response = await fetch(`/api/invoices${url}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      }
    }

    // Methods
    const loadInvoices = async () => {
      loading.value = true
      try {
        const params = {
          ...filters,
          ...sorting,
          page: pagination.current_page,
          per_page: pagination.per_page
        }
        
        const response = await api.get('', params)
        invoices.value = response.data
        
        // Update pagination
        Object.assign(pagination, {
          current_page: response.current_page,
          total: response.total,
          last_page: response.last_page,
          from: response.from,
          to: response.to
        })
      } catch (error) {
        console.error('Error loading invoices:', error)
      } finally {
        loading.value = false
      }
    }

    const loadClients = async () => {
      try {
        const response = await api.get('/clients')
        clients.value = response
      } catch (error) {
        console.error('Error loading clients:', error)
      }
    }

    const loadStatistics = async () => {
      try {
        const response = await api.get('/') //api/invoices/statistics
        statistics.value = response.statistics
      } catch (error) {
        console.error('Error loading statistics:', error)
      }
    }

    const loadServices = async () => {
      try {
        const response = await api.get('/api/services')
        services.value = response
      } catch (error) {
        console.error('Error loading services:', error)
      }
    }


    const handleSaveInvoice = async (formData) => {
      saving.value = true
      try {
        if (showCreateModal.value) {
          await api.post('', formData)
        } else {
          await api.put(`/${selectedInvoice.value.id}`, formData)
        }
        closeModals()
        loadInvoices()
        loadStatistics()
      } catch (error) {
        console.error('Error saving invoice:', error)
      } finally {
        saving.value = false
      }
    }

    const viewInvoice = async (invoice) => {
      try {
        const response = await api.get(`/${invoice.id}`)
        selectedInvoice.value = response.invoice
        showViewModal.value = true
      } catch (error) {
        console.error('Error loading invoice:', error)
      }
    }

    const editInvoice = (invoice) => {
      selectedInvoice.value = invoice
      Object.assign(invoiceForm, {
        client_id: invoice.client_id,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date,
        notes: invoice.notes || '',
        items: invoice.items?.length ? invoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price
        })) : [{ description: '', quantity: 1, unit_price: 0 }]
      })
      showEditModal.value = true
    }

    const duplicateInvoice = async (invoice) => {
      try {
        await api.post(`/${invoice.id}/duplicate`)
        loadInvoices()
        loadStatistics()
      } catch (error) {
        console.error('Error duplicating invoice:', error)
      }
    }

    const markAsSent = async (invoice) => {
      try {
        await api.post(`/${invoice.id}/mark-as-sent`)
        loadInvoices()
        loadStatistics()
        activeDropdown.value = null
      } catch (error) {
        console.error('Error marking invoice as sent:', error)
      }
    }

    const showPaymentModal = (invoice) => {
      selectedInvoice.value = invoice
      paymentForm.amount = invoice.balance
      showPaymentModalFlag.value = true
      activeDropdown.value = null
    }

    const recordPayment = async () => {
      saving.value = true
      try {
        await api.post(`/${selectedInvoice.value.id}/record-payment`, paymentForm)
        closePaymentModal()
        loadInvoices()
        loadStatistics()
      } catch (error) {
        console.error('Error recording payment:', error)
      } finally {
        saving.value = false
      }
    }

    const deleteInvoice = async (invoice) => {
      if (confirm('Are you sure you want to delete this invoice?')) {
        try {
          await api.delete(`/${invoice.id}`)
          loadInvoices()
          loadStatistics()
          activeDropdown.value = null
        } catch (error) {
          console.error('Error deleting invoice:', error)
        }
      }
    }

    const sort = (field) => {
      if (sorting.sort_by === field) {
        sorting.sort_order = sorting.sort_order === 'asc' ? 'desc' : 'asc'
      } else {
        sorting.sort_by = field
        sorting.sort_order = 'asc'
      }
      loadInvoices()
    }

    const changePage = (page) => {
      pagination.current_page = page
      loadInvoices()
    }


    const closeModals = () => {
      showCreateModal.value = false
      showEditModal.value = false
      showViewModal.value = false
      selectedInvoice.value = null
    }

    const closePaymentModal = () => {
      showPaymentModalFlag.value = false
      selectedInvoice.value = null
      Object.assign(paymentForm, { amount: 0, payment_method: '', payment_notes: '' })
    }

    const toggleDropdown = (invoiceId, event) => {
      event.preventDefault()
      event.stopPropagation()
      console.log('Toggle called for invoice:', invoiceId)
      
      if (showDropdown.value && dropdownInvoiceId.value === invoiceId) {
        showDropdown.value = false
        dropdownInvoiceId.value = null
      } else {
        showDropdown.value = true
        dropdownInvoiceId.value = invoiceId
      }
      
      console.log('showDropdown:', showDropdown.value)
      console.log('dropdownInvoiceId:', dropdownInvoiceId.value)
    }

    // Utility functions
    const formatCurrency = (amount) => {
      return parseFloat(amount || 0).toFixed(2)
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const formatStatus = (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const getSortClass = (field) => {
      if (sorting.sort_by !== field) return ''
      return sorting.sort_order === 'asc' ? 'asc' : 'desc'
    }

    const debouncedSearch = (() => {
      let timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          loadInvoices()
        }, 300)
      }
    })()

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        showDropdown.value = false
        dropdownInvoiceId.value = null
      }
    }

    // Lifecycle
    onMounted(() => {
      loadInvoices()
      loadClients()
      loadStatistics()
      loadServices()
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      // Data
      invoices,
      clients,
      statistics,
      loading,
      saving,
      services,
      filters,
      sorting,
      pagination,
      paymentForm,
      
      // Modal states
      showCreateModal,
      showEditModal,
      showPaymentModalFlag,
      selectedInvoice,
      activeDropdown,
      showViewModal,
      showDropdown,
  dropdownInvoiceId,
      
      // Methods
      loadInvoices,
      viewInvoice,
      editInvoice,
      duplicateInvoice,
      markAsSent,
      showPaymentModal,
      recordPayment,
      deleteInvoice,
      sort,
      changePage,
      handleSaveInvoice,
      closeModals,
      closePaymentModal,
      toggleDropdown,
      debouncedSearch,
      handleClickOutside,
      
      // Utilities
      formatCurrency,
      formatDate,
      formatStatus,
      getSortClass
    }
  }
}
</script>

<style scoped>
.invoice-manager {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header Section */
.header-section {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3b82f6;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Filters Section */
.filters-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.checkbox-label {
  flex-direction: row !important;
  align-items: center;
  gap: 8px;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

/* Table Section */
.table-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.table-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.table-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-container {
  overflow-x: auto;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table th {
  background: #f9fafb;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.invoice-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.invoice-table th.sortable:hover {
  background: #f3f4f6;
}

.sort-indicator {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.sort-indicator.asc {
  border-bottom: 6px solid #6b7280;
}

.sort-indicator.desc {
  border-top: 6px solid #6b7280;
}

.invoice-table td {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.invoice-row:hover {
  background: #f9fafb;
}

.invoice-number {
  font-weight: 600;
  color: #1f2937;
}

.amount {
  font-weight: 600;
  text-align: right;
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

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.invoice-dropdown {
  position: relative !important;
}

.invoice-dropdown-menu {
  position: relative !important;
  top: 100% !important;
  right: 0 !important;
  background: white !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
  z-index: 9999 !important;
  min-width: 150px !important;
}

.invoice-dropdown-item {
  display: block !important;
  width: 100% !important;
  padding: 12px 16px !important;
  text-align: left !important;
  border: none !important;
  background: none !important;
  cursor: pointer !important;
  color: #374151 !important;
  font-size: 14px !important;
}

.invoice-dropdown-item:hover {
  background: #f9fafb !important;
}

.invoice-dropdown-item.danger {
  color: #dc2626 !important;
}

.invoice-dropdown-item.danger:hover {
  background: #fef2f2 !important;
}

.loading-row,
.empty-row {
  text-align: center;
  padding: 48px 16px;
  color: #6b7280;
  font-style: italic;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}

.pagination-info {
  color: #6b7280;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.page-info {
  color: #374151;
  font-weight: 500;
}


/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #e5e7eb;
  color: #374151;
}


.btn-close:hover {
  color: #374151;
}

.icon {
  width: 18px;
  height: 18px;
}


.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-group small {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

/* Invoice Items */


.items-section h4 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
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

/* Responsive Design */
@media (max-width: 768px) {
  .invoice-manager {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .item-grid {
    grid-template-columns: 1fr;
  }
  
  .invoice-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 16px;
  }
  
  
  .table-container {
    overflow-x: scroll;
  }
  
  .invoice-table {
    min-width: 800px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>