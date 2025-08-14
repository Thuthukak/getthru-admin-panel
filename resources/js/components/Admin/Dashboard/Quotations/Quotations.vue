<template>
  <div class="admin-estimates">
    <div class="header">
      <div class="row">
        <div class="col-md-6">
        <h1>Quotation Management</h1>
        </div>
        <div class="col-md-6">
          <button @click.prevent="openQuoteModal" class="btn-primary float-right">Add Quotation</button>
        </div>
      
    <div class="col-md-12">
      <div class="stats">
        <div class="stat-card">
          <span class="stat-label">Total Estimates</span>
          <span class="stat-value">{{ estimates.length }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Pending</span>
          <span class="stat-value">{{ getEstimatesByStatus('pending').length }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Email Failed</span>
          <span class="stat-value">{{ getEstimatesByStatus('email_failed').length }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Completed</span>
          <span class="stat-value">{{ getEstimatesByStatus('completed').length }}</span>
        </div>
      </div>
    </div>
    </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <label for="statusFilter">Status:</label>
        <select id="statusFilter" v-model="filters.status">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="emailed">Emailed</option>
          <option value="email_failed">Email Failed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="searchFilter">Search:</label>
        <input 
          id="searchFilter"
          type="text" 
          v-model="filters.search" 
          placeholder="Search by name or email..."
        >
      </div>
      
      <div class="filter-group">
        <label for="dateFilter">Date Range:</label>
        <input 
          id="dateFilter"
          type="date" 
          v-model="filters.dateFrom"
          placeholder="From"
        >
        <input 
          type="date" 
          v-model="filters.dateTo"
          placeholder="To"
        >
      </div>
      
      <button @click="resetFilters" class="btn-secondary">Reset Filters</button>
    </div>

    <!-- Bulk Actions -->
    <div class="bulk-actions" v-if="selectedEstimates.length > 0">
      <span>{{ selectedEstimates.length }} selected</span>
      <button @click="bulkUpdateStatus('completed')" class="btn-success">Mark Completed</button>
      <button @click="bulkUpdateStatus('cancelled')" class="btn-danger">Mark Cancelled</button>
      <button @click="bulkSendEmails" class="btn-primary">Send Emails</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading quotations...</p>
    </div>

    <!-- Estimates Table -->
    <div v-else class="table-container">
      <table class="estimates-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                @change="toggleSelectAll"
                :checked="isAllSelected"
              >
            </th>
            <th @click="sortBy('id')" class="sortable">
              ID 
              <span class="sort-icon" :class="getSortClass('id')">↕</span>
            </th>
            <th @click="sortBy('name')" class="sortable">
              Name
              <span class="sort-icon" :class="getSortClass('name')">↕</span>
            </th>
            <th @click="sortBy('email')" class="sortable">
              Email
              <span class="sort-icon" :class="getSortClass('email')">↕</span>
            </th>
            <th @click="sortBy('total_amount')" class="sortable">
              Amount
              <span class="sort-icon" :class="getSortClass('total_amount')">↕</span>
            </th>
            <th @click="sortBy('status')" class="sortable">
              Status
              <span class="sort-icon" :class="getSortClass('status')">↕</span>
            </th>
            <th @click="sortBy('created_at')" class="sortable">
              Date
              <span class="sort-icon" :class="getSortClass('created_at')">↕</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estimate in filteredEstimates" :key="estimate.id" :class="getRowClass(estimate)">
            <td>
              <input 
                type="checkbox" 
                :value="estimate.id"
                v-model="selectedEstimates"
              >
            </td>
            <td>#{{ estimate.id }}</td>
            <td>{{ estimate.name }}</td>
            <td>
              <a :href="`mailto:${estimate.email}`">{{ estimate.email }}</a>
            </td>
            <td>R{{ formatCurrency(estimate.total_amount) }}</td>
            <td>
              <select 
                :value="estimate.status" 
                @change="updateEstimateStatus(estimate.id, $event.target.value)"
                class="status-select"
                :class="estimate.status"
              >
                <option value="pending">Pending</option>
                <option value="emailed">Emailed</option>
                <option value="email_failed">Email Failed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td>{{ formatDate(estimate.created_at) }}</td>
            <td class="actions">
              <button 
                @click="viewEstimate(estimate)" 
                class="btn-icon" 
                title="View Details"
                :disabled="sendingEmail === estimate.id"
              >
                <font-awesome-icon icon="eye" />
              </button>
              <button 
                @click="resendEmail(estimate.id)" 
                class="btn-icon"
                :disabled="sendingEmail === estimate.id"
                title="Send/Resend Email"
              >
                <font-awesome-icon 
                v-if="sendingEmail === estimate.id" 
                :icon="['fas', 'spinner']" 
                spin 
                />
                <font-awesome-icon 
                v-else 
                :icon="['fas', 'envelope']" 
                />
              </button>
              <button 
                @click="downloadPDF(estimate.id)" 
                class="btn-icon"
                title="Download PDF"
              >
                <font-awesome-icon icon="file-pdf" />
              </button>
              <button 
                @click="deleteEstimate(estimate.id)" 
                class="btn-icon btn-danger"
                title="Delete"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredEstimates.length === 0" class="no-results">
        <p>No quotations found matching your criteria.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        @click="currentPage = 1" 
        :disabled="currentPage === 1"
        class="btn-secondary"
      >
        First
      </button>
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="btn-secondary"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        @click="currentPage++" 
        :disabled="currentPage === totalPages"
        class="btn-secondary"
      >
        Next
      </button>
      <button 
        @click="currentPage = totalPages" 
        :disabled="currentPage === totalPages"
        class="btn-secondary"
      >
        Last
      </button>
    </div>

    <!-- Replace your existing modal section with this -->
<Teleport to="body">
  <div v-if="selectedEstimate" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>Quote Details #{{ selectedEstimate.id }}</h2>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      <div class="modal-body">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Name:</label>
            <span>{{ selectedEstimate.name }}</span>
          </div>
          <div class="detail-item">
            <label>Email:</label>
            <span>{{ selectedEstimate.email }}</span>
          </div>
          <div class="detail-item">
            <label>Total Amount:</label>
            <span>R{{ formatCurrency(selectedEstimate.total_amount) }}</span>
          </div>
          <div class="detail-item">
            <label>Status:</label>
            <span class="status-badge" :class="selectedEstimate.status">
              {{ selectedEstimate.status.replace('_', ' ').toUpperCase() }}
            </span>
          </div>
          <div class="detail-item">
            <label>Created:</label>
            <span>{{ formatDate(selectedEstimate.created_at) }}</span>
          </div>
          <div class="detail-item">
            <label>Updated:</label>
            <span>{{ formatDate(selectedEstimate.updated_at) }}</span>
          </div>
        </div>
        
        <div v-if="selectedEstimate.notes" class="notes-section">
          <h3>Additional Details:</h3>
          <p>{{ selectedEstimate.notes }}</p>
        </div>
        
        <div class="services-section">
          <h3>Selected Services:</h3>
          <div class="services-list">
            <div 
              v-for="service in selectedEstimate.services" 
              :key="service.id"
              class="service-item"
            >
              <span class="service-name">{{ service.name }}</span>
              <span class="service-price">R{{ formatCurrency(service.price) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="resendEmail(selectedEstimate.id)" class="btn-primary">
          Send Email
        </button>
        <button @click="downloadPDF(selectedEstimate.id)" class="btn-secondary">
          Download PDF
        </button>
        <button @click="closeModal" class="btn-secondary">
          Close
        </button>
      </div>
    </div>
  </div>
</Teleport>

    <!-- Toast Notifications -->
    <div class="toast-container">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>

  <QuoteCreateModal :isOpen="isModalOpen" @close="closeQuoteModal" />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import QuoteCreateModal from './QuoteCreateModal.vue'
console.log('Available icons:', Object.keys(library.definitions.fas))


// Reactive data
const estimates = ref([])
const selectedEstimates = ref([])
const selectedEstimate = ref(null)
const loading = ref(true)
const sendingEmail = ref(null)
const toasts = ref([])
const isModalOpen = ref(false)

// Filters
const filters = ref({
  status: '',
  search: '',
  dateFrom: '',
  dateTo: ''
})

// Sorting
const sortColumn = ref('created_at')
const sortDirection = ref('desc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(25)

// Computed properties
const filteredEstimates = computed(() => {
  let filtered = estimates.value

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(e => e.status === filters.value.status)
  }

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(e => 
      e.name.toLowerCase().includes(search) || 
      e.email.toLowerCase().includes(search)
    )
  }

  // Date filter
  if (filters.value.dateFrom) {
    filtered = filtered.filter(e => 
      new Date(e.created_at) >= new Date(filters.value.dateFrom)
    )
  }
  if (filters.value.dateTo) {
    filtered = filtered.filter(e => 
      new Date(e.created_at) <= new Date(filters.value.dateTo)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    let aVal = a[sortColumn.value]
    let bVal = b[sortColumn.value]

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  const totalFiltered = estimates.value.filter(e => {
    // Apply same filters as filteredEstimates but without pagination
    let include = true
    
    if (filters.value.status && e.status !== filters.value.status) include = false
    
    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      if (!e.name.toLowerCase().includes(search) && !e.email.toLowerCase().includes(search)) {
        include = false
      }
    }
    
    if (filters.value.dateFrom && new Date(e.created_at) < new Date(filters.value.dateFrom)) {
      include = false
    }
    
    if (filters.value.dateTo && new Date(e.created_at) > new Date(filters.value.dateTo)) {
      include = false
    }
    
    return include
  }).length
  
  return Math.ceil(totalFiltered / itemsPerPage.value)
})

const isAllSelected = computed(() => {
  return filteredEstimates.value.length > 0 && 
         selectedEstimates.value.length === filteredEstimates.value.length
})

// Methods
const fetchEstimates = async () => {
  try {
    loading.value = true
    // Replace with your actual API endpoint
    const response = await fetch('/api/estimates')
    const data = await response.json()
    estimates.value = data
  } catch (error) {
    showToast('Error fetching estimates', 'error')
    console.error('Error fetching estimates:', error)
  } finally {
    loading.value = false
  }
}

const openQuoteModal = () => {
  isModalOpen.value = true
}
const closeQuoteModal = () => {
  isModalOpen.value = false
}
const getEstimatesByStatus = (status) => {
  return estimates.value.filter(e => e.status === status)
}

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const getSortClass = (column) => {
  if (sortColumn.value !== column) return ''
  return sortDirection.value === 'asc' ? 'asc' : 'desc'
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedEstimates.value = []
  } else {
    selectedEstimates.value = filteredEstimates.value.map(e => e.id)
  }
}

const updateEstimateStatus = async (id, status) => {
  try {
    const response = await fetch(`/api/estimates/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ status })
    })

    if (response.ok) {
      const estimate = estimates.value.find(e => e.id === id)
      if (estimate) {
        estimate.status = status
        estimate.updated_at = new Date().toISOString()
      }
      showToast('Status updated successfully', 'success')
    } else {
      throw new Error('Failed to update status')
    }
  } catch (error) {
    showToast('Error updating status', 'error')
    console.error('Error updating status:', error)
  }
}

const bulkUpdateStatus = async (status) => {
  try {
    const response = await fetch('/api/estimates/bulk-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ 
        ids: selectedEstimates.value,
        status 
      })
    })

    if (response.ok) {
      selectedEstimates.value.forEach(id => {
        const estimate = estimates.value.find(e => e.id === id)
        if (estimate) {
          estimate.status = status
          estimate.updated_at = new Date().toISOString()
        }
      })
      selectedEstimates.value = []
      showToast(`${selectedEstimates.value.length} estimates updated`, 'success')
    } else {
      throw new Error('Failed to bulk update')
    }
  } catch (error) {
    showToast('Error bulk updating estimates', 'error')
    console.error('Error bulk updating:', error)
  }
}

const resendEmail = async (id) => {
  try {
    sendingEmail.value = id
    const response = await fetch(`/api/estimates/${id}/resend-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      }
    })

    if (response.ok) {
      const estimate = estimates.value.find(e => e.id === id)
      if (estimate && estimate.status === 'email_failed') {
        estimate.status = 'emailed'
        estimate.updated_at = new Date().toISOString()
      }
      showToast('Email sent successfully', 'success')
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    showToast('Error sending email', 'error')
    console.error('Error sending email:', error)
  } finally {
    sendingEmail.value = null
  }
}

const bulkSendEmails = async () => {
  try {
    const response = await fetch('/api/estimates/bulk-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ ids: selectedEstimates.value })
    })

    if (response.ok) {
      const result = await response.json()
      showToast(`${result.sent} emails sent successfully`, 'success')
      selectedEstimates.value = []
      fetchEstimates() // Refresh data
    } else {
      throw new Error('Failed to send bulk emails')
    }
  } catch (error) {
    showToast('Error sending bulk emails', 'error')
    console.error('Error sending bulk emails:', error)
  }
}

const viewEstimate = (estimate) => {
   console.log('viewEstimate called with:', estimate); // Debug log
  selectedEstimate.value = estimate
  console.log('selectedEstimate set to:', selectedEstimate.value);
  document.body.classList.add('modal-open');
}

const closeModal = () => {
  console.log('closeModal called');
  selectedEstimate.value = null
  document.body.classList.remove('modal-open');
}

const downloadPDF = async (id) => {
  try {
    const response = await fetch(`/api/estimates/${id}/pdf`)
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `estimate-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } else {
      throw new Error('Failed to download PDF')
    }
  } catch (error) {
    showToast('Error downloading PDF', 'error')
    console.error('Error downloading PDF:', error)
  }
}

const deleteEstimate = async (id) => {
  if (!confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
    return
  }

  try {
    const response = await fetch(`/api/estimates/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      }
    })

    if (response.ok) {
      estimates.value = estimates.value.filter(e => e.id !== id)
      selectedEstimates.value = selectedEstimates.value.filter(selectedId => selectedId !== id)
      showToast('Quote deleted successfully', 'success')
    } else {
      throw new Error('Failed to delete quote')
    }
  } catch (error) {
    showToast('Error deleting quote', 'error')
    console.error('Error deleting quote:', error)
  }
}

const resetFilters = () => {
  filters.value = {
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  }
  currentPage.value = 1
}

const getRowClass = (estimate) => {
  return {
    'row-email-failed': estimate.status === 'email_failed',
    'row-completed': estimate.status === 'completed',
    'row-cancelled': estimate.status === 'cancelled'
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showToast = (message, type = 'info') => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 5000)
}

// Lifecycle
onMounted(() => {
  fetchEstimates()
})
</script>

<style>
.admin-estimates {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin: 0 0 20px 0;
  color: #2d3748;
  font-size: 28px;
  font-weight: 600;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 14px;
  color: #718096;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.filter-group input,
.filter-group select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.bulk-actions {
  background: #edf2f7;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.bulk-actions span {
  font-weight: 500;
  color: #2d3748;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4299e1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.estimates-table {
  width: 100%;
  border-collapse: collapse;
}

.estimates-table th,
.estimates-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.estimates-table th {
  background: #f7fafc;
  font-weight: 600;
  color: #2d3748;
  position: sticky;
  top: 0;
  z-index: 10;
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.sortable:hover {
  background: #edf2f7;
}

.sort-icon {
  margin-left: 5px;
  opacity: 0.5;
  font-size: 12px;
}

.sort-icon.asc::before {
  content: '↑';
  opacity: 1;
}

.sort-icon.desc::before {
  content: '↓';
  opacity: 1;
}

.status-select {
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 12px;
  background: white;
}

.status-select.pending { border-color: #f6ad55; background: #fffaf0; }
.status-select.emailed { border-color: #68d391; background: #f0fff4; }
.status-select.email_failed { border-color: #fc8181; background: #fff5f5; }
.status-select.completed { border-color: #4299e1; background: #ebf8ff; }
.status-select.cancelled { border-color: #a0aec0; background: #f7fafc; }

.actions {
  display: flex;
  gap: 5px;
}

.btn-icon {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.btn-icon:hover {
  background: #edf2f7;
}

.btn-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon.btn-danger:hover {
  background: #fed7d7;
}

.row-email-failed {
  background: #fff5f5;
}

.row-completed {
  background: #f0fff4;
}

.row-cancelled {
  background: #f7fafc;
  opacity: 0.7;
}

.no-results {
  padding: 40px;
  text-align: center;
  color: #718096;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 20px;
}

.page-info {
  margin: 0 15px;
  font-weight: 500;
  color: #4a5568;
}

.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(31, 31, 31, 0.8) !important; 
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 999999 !important;
}

.modal {
  background: rgb(255, 255, 255) !important; 
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative !important;
  z-index: 1000000 !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2d3748;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 20px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-item label {
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.detail-item span {
  color: #2d3748;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #fffaf0;
  color: #c05621;
  border: 1px solid #f6ad55;
}

.status-badge.emailed {
  background: #f0fff4;
  color: #22543d;
  border: 1px solid #68d391;
}

.status-badge.email_failed {
  background: #fff5f5;
  color: #c53030;
  border: 1px solid #fc8181;
}

.status-badge.completed {
  background: #ebf8ff;
  color: #2b6cb0;
  border: 1px solid #4299e1;
}

.status-badge.cancelled {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #a0aec0;
}

.notes-section {
  margin-bottom: 20px;
}

.notes-section h3 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 16px;
}

.notes-section p {
  background: #f7fafc;
  padding: 15px;
  border-radius: 6px;
  margin: 0;
  color: #4a5568;
  line-height: 1.5;
}

.services-section h3 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 16px;
}

.services-list {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #e2e8f0;
}

.service-item:last-child {
  border-bottom: none;
}

.service-name {
  color: #2d3748;
  font-weight: 500;
}

.service-price {
  color: #4a5568;
  font-weight: 600;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
}

.toast {
  background: white;
  padding: 15px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin-bottom: 10px;
  border-left: 4px solid #4299e1;
  max-width: 300px;
  animation: slideIn 0.3s ease-out;
}

.toast.success {
  border-left-color: #48bb78;
}

.toast.error {
  border-left-color: #f56565;
}

.toast.warning {
  border-left-color: #ed8936;
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

/* Button Styles */
.btn-primary {
  background: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #3182ce;
}

.btn-secondary {
  background: #edf2f7;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success {
  background: #48bb78;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-success:hover {
  background: #38a169;
}

.btn-danger {
  background: #f56565;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-danger:hover {
  background: #e53e3e;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-estimates {
    padding: 10px;
  }
  
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .estimates-table {
    min-width: 800px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
  }
}

</style>