<template>
  <div class="invoice-management">
    <PageHeader
      :loading="loading"
      @generate-recurring="generateRecurring"
      @send-automatic="sendAutomatic"
      @mark-overdue="markOverdue"
      @create-invoice="showCreateModal = true"
    />

    <StatisticsSection :stats="stats" />

    <FiltersSection
      v-model:filters="filters"
      @apply-filters="applyFilters"
      @search="debouncedSearch"
    />

    <BulkActions
      v-if="selectedInvoices.length > 0"
      :selected-count="selectedInvoices.length"
      @send-bulk="sendBulkInvoices"
      @clear-selection="selectedInvoices = []"
    />

    <InvoiceTable
      :invoices="invoices"
      :loading="loading"
      :selected-invoices="selectedInvoices"
      :sort-field="sortField"
      :sort-direction="sortDirection"
      @toggle-selection="toggleSelection"
      @toggle-all-selection="toggleAllSelection"
      @sort="sort"
      @view-invoice="viewInvoice"
      @send-invoice="sendSingleInvoice"
      @edit-invoice="editInvoice"
      @mark-paid="markAsPaid"
      @delete-invoice="deleteInvoice"
    />

    <Pagination
      v-if="pagination.total > pagination.per_page"
      :pagination="pagination"
      @change-page="changePage"
    />

    <InvoiceModals
      :show-create="showCreateModal"
      :show-edit="showEditModal"
      :show-view="showViewModal"
      :form="form"
      :selected-invoice="selectedInvoice"
      :registrations="registrations"
      :packages="packages"
      :loading="loading"
      @customer-created="refreshCustomerList"
      @close="closeModals"
      @submit="submitForm"
      @update:form="updateForm"
    />

    <ToastNotifications :toasts="toasts" />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue'
import PageHeader from './PageHeader.vue'
import StatisticsSection from './Statistics.vue'
import FiltersSection from './Filters.vue'
import BulkActions from './BulkActions.vue'
import InvoiceTable from './InvoiceTable.vue'
import Pagination from './Pagination.vue'
import InvoiceModals from './InvoiceModals.vue'
import ToastNotifications from './ToastNotifications.vue'

export default {
  name: 'InvoiceManagement',
  components: {
    PageHeader,
    StatisticsSection,
    FiltersSection,
    BulkActions,
    InvoiceTable,
    Pagination,
    InvoiceModals,
    ToastNotifications
  },
  setup() {
    // Reactive data
    const loading = ref(false)
    const invoices = ref([])
    const registrations = ref([])
    const packages = ref([])
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
      overdue_revenue: 0,
      sent_revenue: 0,    // Add this
      paid_revenue: 0
    })
    
    // Filters
    const filters = reactive({
      search: '',
      status: '',
      service_type: '',
      date_from: '',
      date_to: '',
      overdue: false,
      customer_name: '',
      customer_email: ''
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
      package_price_id: '',
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

    const refreshCustomerList = () => {
      fetchRegistrations()
      // Optionally auto-select the new customer
      if (registrations.value.length > 0) {
        form.registration_id = registrations.value[0].id
      }
    }
    
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
    
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages')
        const data = await response.json()
        
        // Handle both direct array response and wrapped response
        if (Array.isArray(data)) {
          packages.value = data
        } else if (data.success && data.data) {
          packages.value = data.data
        } else if (data.data) {
          packages.value = data.data
        } else {
          packages.value = data
        }
      } catch (error) {
        console.error('Error fetching packages:', error)
        showToast('Failed to load packages', 'error')
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
      form.package_price_id = invoice.package_price_id || ''
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
      form.package_price_id = ''
      form.amount = ''
      form.billing_date = ''
      form.due_date = ''
      form.status = 'pending'
      form.notes = ''
      form.is_recurring = true
    }
    
    // Form update handler
    const updateForm = (updatedForm) => {
      Object.assign(form, updatedForm)
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
        homeInternet: 'Home Internet',
        businessInternet: 'Business Internet',
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
      if (newVal) {
        if (registrations.value.length === 0) {
          fetchRegistrations()
        }
        if (packages.value.length === 0) {
          fetchPackages()
        }
      }
    })
    
    watch(() => showEditModal.value, (newVal) => {
      if (newVal && packages.value.length === 0) {
        fetchPackages()
      }
    })
    
    // Lifecycle hooks
    onMounted(() => {
      fetchInvoices()
      fetchStats()
      fetchPackages() // Load packages on component mount
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
      packages,
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
      fetchPackages,
      refreshCustomerList,
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
      updateForm,
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

/* Responsive Design */
@media (max-width: 768px) {
  .invoice-management {
    padding: 10px;
  }
}
</style>