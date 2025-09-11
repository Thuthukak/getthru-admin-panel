<template>
  <div class="customer-management">
    <div class="header">
      <h1>Customer Management</h1>
      <button @click="openCreateModal" class="btn btn-primary">
        Add New Customer
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid" v-if="stats">
      <div class="stat-card">
        <div class="stat-value">{{ stats.total_customers }}</div>
        <div class="stat-label">Total Customers</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.customers_this_month }}</div>
        <div class="stat-label">This Month</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.customers_this_week }}</div>
        <div class="stat-label">This Week</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="search-box">
          <input 
            v-model="filters.search" 
            @input="debounceSearch"
            type="text" 
            placeholder="Search customers..."
            class="form-control"
          >
          <i class="icon-search"></i>
        </div>
        
        <select v-model="filters.location" @change="fetchCustomers" class="form-control">
          <option value="">All Locations</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>

        <input 
          v-model="filters.created_from" 
          @change="fetchCustomers"
          type="date" 
          class="form-control"
          placeholder="From Date"
        >

        <input 
          v-model="filters.created_to" 
          @change="fetchCustomers"
          type="date" 
          class="form-control"
          placeholder="To Date"
        >

        <button @click="clearFilters" class="btn btn-secondary">Clear Filters</button>
      </div>

      <div class="table-controls">
        <select v-model="pagination.per_page" @change="fetchCustomers" class="form-control small">
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading customers...</p>
    </div>

    <!-- Data Table -->
    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th @click="sort('name')" :class="getSortClass('name')">
              Name <i class="sort-icon"></i>
            </th>
            <th @click="sort('surname')" :class="getSortClass('surname')">
              Surname <i class="sort-icon"></i>
            </th>
            <th @click="sort('email')" :class="getSortClass('email')">
              Email <i class="sort-icon"></i>
            </th>
            <th @click="sort('phone')" :class="getSortClass('phone')">
              Phone <i class="sort-icon"></i>
            </th>
            <th @click="sort('location')" :class="getSortClass('location')">
              Location <i class="sort-icon"></i>
            </th>
            <th @click="sort('address')" :class="getSortClass('address')">
              Address <i class="sort-icon"></i>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customers.length === 0">
            <td colspan="7" class="no-data">
              <p>No customers found</p>
            </td>
          </tr>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.surname }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.location }}</td>
            <td>{{ customer.address }}</td>
            <td class="actions">
              <button @click="viewCustomer(customer)" class="btn-icon btn-view" title="View">
                <i class="icon-eye"></i>
              </button>
              <button @click="editCustomer(customer)" class="btn-icon btn-edit" title="Edit">
                <i class="icon-edit"></i>
              </button>
              <button @click="confirmDelete(customer)" class="btn-icon btn-delete" title="Delete">
                <i class="icon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination-wrapper" v-if="pagination.total > 0">
      <div class="pagination-info">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
      </div>
      <div class="pagination">
        <button 
          @click="goToPage(1)" 
          :disabled="pagination.current_page === 1"
          class="btn-page"
        >
          First
        </button>
        <button 
          @click="goToPage(pagination.current_page - 1)" 
          :disabled="pagination.current_page === 1"
          class="btn-page"
        >
          Previous
        </button>
        
        <span class="page-numbers">
          <button 
            v-for="page in getVisiblePages()" 
            :key="page"
            @click="goToPage(page)"
            :class="['btn-page', { active: page === pagination.current_page }]"
          >
            {{ page }}
          </button>
        </span>

        <button 
          @click="goToPage(pagination.current_page + 1)" 
          :disabled="pagination.current_page === pagination.last_page"
          class="btn-page"
        >
          Next
        </button>
        <button 
          @click="goToPage(pagination.last_page)" 
          :disabled="pagination.current_page === pagination.last_page"
          class="btn-page"
        >
          Last
        </button>
      </div>
    </div>

    <!-- Customer Modal Component -->
    <CustomerCreateModal
      :show="showModal"
      :mode="modalMode"
      :customer="selectedCustomer"
      :saving="saving"
      @close="closeModal"
      @save="saveCustomer"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal modal-small" @click.stop>
        <div class="modal-header">
          <h3>Confirm Delete</h3>
          <button @click="closeDeleteModal" class="btn-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete customer "{{ customerToDelete?.name }} {{ customerToDelete?.surname }}"?</p>
          <p class="warning">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeDeleteModal" class="btn btn-secondary">Cancel</button>
          <button @click="deleteCustomer" class="btn btn-danger" :disabled="deleting">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div v-if="toast.show" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import CustomerCreateModal from './CustomerCreateModal.vue'

// State
const customers = ref([])
const locations = ref([])
const stats = ref(null)
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showModal = ref(false)
const showDeleteModal = ref(false)
const modalMode = ref('create') // 'create', 'edit', 'view'
const selectedCustomer = ref(null)
const customerToDelete = ref(null)

// Filters and Pagination
const filters = reactive({
  search: '',
  location: '',
  created_from: '',
  created_to: ''
})

const sorting = reactive({
  field: 'created_at',
  direction: 'desc'
})

const pagination = reactive({
  current_page: 1,
  last_page: 1,
  per_page: 25,
  total: 0,
  from: 0,
  to: 0
})

// Toast
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

// Search debounce
let searchTimeout = null

// Methods
const fetchCustomers = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      per_page: pagination.per_page,
      sort_field: sorting.field,
      sort_direction: sorting.direction,
      ...filters
    }
    
    const response = await axios.get('/api/customers', { params })
    const data = response.data
    
    customers.value = data.data
    pagination.current_page = data.current_page
    pagination.last_page = data.last_page
    pagination.total = data.total
    pagination.from = data.from
    pagination.to = data.to
  } catch (error) {
    showToast('Error fetching customers', 'error')
  }
  loading.value = false
}

const fetchLocations = async () => {
  try {
    const response = await axios.get('/api/customers/locations')
    locations.value = response.data.data
  } catch (error) {
    console.error('Error fetching locations:', error)
  }
}

const fetchStats = async () => {
  try {
    const response = await axios.get('/api/customers/stats')
    stats.value = response.data.data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchCustomers(1)
  }, 300)
}

const sort = (field) => {
  if (sorting.field === field) {
    sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sorting.field = field
    sorting.direction = 'asc'
  }
  fetchCustomers(1)
}

const getSortClass = (field) => {
  if (sorting.field !== field) return 'sortable'
  return `sortable sorted-${sorting.direction}`
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.last_page) {
    fetchCustomers(page)
  }
}

const getVisiblePages = () => {
  const current = pagination.current_page
  const last = pagination.last_page
  const delta = 2
  const range = []
  
  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i)
  }
  
  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < last - 1) {
    range.push('...')
  }
  
  range.unshift(1)
  if (last !== 1) {
    range.push(last)
  }
  
  return range
}

const clearFilters = () => {
  filters.search = ''
  filters.location = ''
  filters.created_from = ''
  filters.created_to = ''
  fetchCustomers(1)
}

// Modal Methods
const openCreateModal = () => {
  modalMode.value = 'create'
  selectedCustomer.value = null
  showModal.value = true
}

const viewCustomer = (customer) => {
  selectedCustomer.value = customer
  modalMode.value = 'view'
  showModal.value = true
}

const editCustomer = (customer) => {
  selectedCustomer.value = customer
  modalMode.value = 'edit'
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCustomer.value = null
}

const saveCustomer = async (customerData) => {
  saving.value = true
  try {
    if (modalMode.value === 'create') {
      await axios.post('/api/customers', customerData)
      showToast('Customer created successfully')
    } else {
      await axios.put(`/api/customers/${selectedCustomer.value.id}`, customerData)
      showToast('Customer updated successfully')
    }
    
    closeModal()
    fetchCustomers(pagination.current_page)
    fetchStats()
  } catch (error) {
    const message = error.response?.data?.message || 'An error occurred'
    showToast(message, 'error')
  }
  saving.value = false
}

const confirmDelete = (customer) => {
  customerToDelete.value = customer
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  customerToDelete.value = null
}

const deleteCustomer = async () => {
  deleting.value = true
  try {
    await axios.delete(`/api/customers/${customerToDelete.value.id}`)
    showToast('Customer deleted successfully')
    closeDeleteModal()
    fetchCustomers(pagination.current_page)
    fetchStats()
  } catch (error) {
    showToast('Error deleting customer', 'error')
  }
  deleting.value = false
}

const showToast = (message, type = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

// Lifecycle
onMounted(() => {
  fetchCustomers()
  fetchLocations()
  fetchStats()
})

// Watchers
watch(() => [filters.location, filters.created_from, filters.created_to], () => {
  fetchCustomers(1)
})
</script>

<style scoped>
.customer-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  font-size: 28px;
  margin: 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}

.filters-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.filters-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
}

.search-box {
  position: relative;
}

.search-box input {
  padding-left: 40px;
}

.search-box .icon-search {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-box .icon-search:before {
  content: "🔍";
}

.table-controls {
  display: flex;
  justify-content: flex-end;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-control.small {
  width: auto;
  min-width: 120px;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: #f8f9fa;
  font-weight: 600;
  position: sticky;
  top: 0;
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable .sort-icon:before {
  content: "↕";
  opacity: 0.3;
}

.sort-icon {
  margin-left: 8px;
  font-size: 12px;
}

.data-table tr:hover {
  background: #f8f9fa;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-view {
  background: #17a2b8;
  color: white;
}

.btn-view:hover {
  background: #138496;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.icon-eye:before { content: "👁"; }
.icon-edit:before { content: "✏️"; }
.icon-trash:before { content: "🗑"; }
.icon-plus:before { content: "+"; }

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.pagination-info {
  color: #666;
  font-size: 14px;
}

.pagination {
  display: flex;
  gap: 5px;
  align-items: center;
}

.page-numbers {
  display: flex;
  gap: 2px;
}

.btn-page {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-page:hover:not(:disabled) {
  background: #e9ecef;
}

.btn-page.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-page:disabled {
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.5;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.btn-close:hover {
  background: #f8f9fa;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.warning {
  color: #dc3545;
  font-size: 14px;
  margin: 10px 0;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;
}

.toast.success {
  background: #28a745;
}

.toast.error {
  background: #dc3545;
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

@media (max-width: 768px) {
  .customer-management {
    padding: 15px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .data-table {
    min-width: 800px;
  }
  
  .pagination-wrapper {
    flex-direction: column;
    gap: 15px;
  }
}
.table:hover {
  background: #e9ecef;
}

.data-table th.sorted-asc .sort-icon:before {
  content: "↑";
}

.data-table th.sorted-desc .sort-icon:before {
  content: "↓";
}

.data-table th.sortable:hover {
  background: #f8f9fa;
}

</style>