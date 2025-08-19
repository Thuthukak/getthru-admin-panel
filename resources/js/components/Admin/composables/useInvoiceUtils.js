// composables/useInvoiceUtils.js
import { ref } from 'vue'

export function useInvoiceUtils() {
  const toasts = ref([])

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

  // Form validation
  const validateForm = (form, isCreate = false) => {
    const errors = []

    if (isCreate && !form.registration_id) {
      errors.push('Customer is required')
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      errors.push('Amount must be greater than 0')
    }

    if (!form.billing_date) {
      errors.push('Billing date is required')
    }

    if (!form.due_date) {
      errors.push('Due date is required')
    }

    if (form.billing_date && form.due_date && new Date(form.due_date) < new Date(form.billing_date)) {
      errors.push('Due date must be after billing date')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Date utilities
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const addDaysToDate = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString().split('T')[0]
  }

  // Default form values
  const getDefaultFormValues = () => {
    const today = getTodayDate()
    const dueDate = addDaysToDate(today, 30) // Default 30 days payment term

    return {
      registration_id: '',
      amount: '',
      billing_date: today,
      due_date: dueDate,
      status: 'pending',
      notes: '',
      is_recurring: true
    }
  }

  // Filter utilities
  const getDefaultFilters = () => {
    return {
      search: '',
      status: '',
      service_type: '',
      date_from: '',
      date_to: '',
      overdue: false
    }
  }

  // Export utilities
  const exportToCSV = (invoices, filename = 'invoices.csv') => {
    const headers = [
      'Invoice Number',
      'Customer Name',
      'Service Type',
      'Package',
      'Amount',
      'Billing Date',
      'Due Date',
      'Status',
      'Notes'
    ]

    const csvContent = [
      headers.join(','),
      ...invoices.map(invoice => [
        `"${invoice.invoice_number}"`,
        `"${invoice.customer_name}"`,
        `"${formatServiceType(invoice.service_type)}"`,
        `"${invoice.package || ''}"`,
        formatAmount(invoice.amount),
        formatDate(invoice.billing_date),
        formatDate(invoice.due_date),
        formatStatus(invoice.status),
        `"${invoice.notes || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Debounce utility
  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return {
    toasts,
    formatAmount,
    formatDate,
    formatDateTime,
    formatStatus,
    formatServiceType,
    showToast,
    validateForm,
    getTodayDate,
    addDaysToDate,
    getDefaultFormValues,
    getDefaultFilters,
    exportToCSV,
    debounce
  }
}