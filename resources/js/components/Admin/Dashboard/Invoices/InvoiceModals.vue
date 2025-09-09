<template>
  <div>
    <!-- Create/Edit Modal -->
    <div v-if="showCreate || showEdit" class="modal-overlay" @click="$emit('close')">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showCreate ? 'Create Invoice' : 'Edit Invoice' }}</h3>
          <button @click="$emit('close')" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="$emit('submit')">
            <div class="form-group" v-if="showCreate">
              <label>Customer</label>
              <select :value="form.registration_id" @input="updateForm('registration_id', $event.target.value)" class="select-field" required>
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
            
            <div class="form-group">
              <label>Package</label>
              <select :value="form.package_price_id" @input="updateForm('package_price_id', $event.target.value)" class="select-field">
                <option value="">Select Package</option>
                <optgroup 
                  v-for="(groupPackages, serviceType) in groupedPackages" 
                  :key="serviceType" 
                  :label="formatServiceType(serviceType)"
                >
                  <option 
                    v-for="pkg in groupPackages" 
                    :key="pkg.id" 
                    :value="pkg.id"
                  >
                    {{ pkg.package }} - R{{ formatAmount(pkg.price) }}/{{ pkg.description || 'No description' }}
                  </option>
                </optgroup>
              </select>
              <small class="help-text">
                Leave empty to use the customer's registered package and price
              </small>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Amount</label>
                <input 
                  :value="form.amount"
                  @input="updateForm('amount', $event.target.value)"
                  type="number" 
                  step="0.01" 
                  class="input-field" 
                  required
                >
                <small class="help-text" v-if="selectedPackagePrice">
                  Package price: R{{ formatAmount(selectedPackagePrice.price) }}
                </small>
              </div>
              <div class="form-group">
                <label>Billing Date</label>
                <input 
                  :value="form.billing_date"
                  @input="updateForm('billing_date', $event.target.value)"
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
                  :value="form.due_date"
                  @input="updateForm('due_date', $event.target.value)"
                  type="date" 
                  class="input-field" 
                  required
                >
              </div>
              <div class="form-group" v-if="showEdit">
                <label>Status</label>
                <select :value="form.status" @change="updateForm('status', $event.target.value)" class="select-field">
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
              <textarea :value="form.notes" @input="updateForm('notes', $event.target.value)" class="textarea-field" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input :checked="form.is_recurring" @change="updateForm('is_recurring', $event.target.checked)" type="checkbox">
                Recurring Invoice
              </label>
            </div>
            <div class="modal-actions">
              <button type="button" @click="$emit('close')" class="btn btn-outline">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ showCreate ? 'Create' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showView" class="modal-overlay" @click="$emit('close')">
      <div class="modal modal-lg" @click.stop>
        <div class="modal-header">
          <h3>Invoice Details</h3>
          <button @click="$emit('close')" class="modal-close">×</button>
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
              <h4>Package Information</h4>
              <div class="detail-grid">
                <div class="detail-item" v-if="selectedInvoice.package_price">
                  <label>Package:</label>
                  <span>{{ selectedInvoice.package_price.package }}</span>
                </div>
                <div class="detail-item" v-if="selectedInvoice.package_price">
                  <label>Service Type:</label>
                  <span>{{ formatServiceType(selectedInvoice.package_price.service_type) }}</span>
                </div>
                <div class="detail-item" v-if="selectedInvoice.package_price">
                  <label>Package Price:</label>
                  <span>R{{ formatAmount(selectedInvoice.package_price.price) }}/{{ selectedInvoice.package_price.billing_cycle }}</span>
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
                <div class="detail-item" v-if="selectedInvoice.service_type">
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
  </div>
</template>

<script>
export default {
  name: 'InvoiceModals',
  props: {
    showCreate: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    showView: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true
    },
    selectedInvoice: {
      type: Object,
      default: null
    },
    registrations: {
      type: Array,
      default: () => []
    },
    packages: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit', 'update:form'],
  computed: {
    groupedPackages() {
      if (!this.packages || !this.packages.length) return {}
      
      return this.packages.reduce((groups, pkg) => {
        const serviceType = pkg.service_type
        if (!groups[serviceType]) {
          groups[serviceType] = []
        }
        groups[serviceType].push(pkg)
        return groups
      }, {})
    },
    selectedPackagePrice() {
      if (!this.form.package_price_id || !this.packages.length) return null
      return this.packages.find(pkg => pkg.id == this.form.package_price_id)
    }
  },
  methods: {
    updateForm(key, value) {
      const updatedForm = { ...this.form, [key]: value }
      
      // If package is selected, auto-fill the amount with package price
      if (key === 'package_price_id' && value) {
        const selectedPackage = this.packages.find(pkg => pkg.id == value)
        if (selectedPackage) {
          updatedForm.amount = selectedPackage.price
        }
      }
      
      this.$emit('update:form', updatedForm)
    },
    formatAmount(amount) {
      return parseFloat(amount || 0).toFixed(2)
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-ZA')
    },
    formatDateTime(datetime) {
      if (!datetime) return ''
      return new Date(datetime).toLocaleString('en-ZA')
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
    }
  }
}
</script>

<style scoped>
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

.help-text {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.4;
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

@media (max-width: 768px) {
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
  
  .modal {
    width: 95%;
    margin: 10px;
  }
}
</style>