<template>
  <teleport to="body">
    <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button @click="$emit('close')" class="btn-close">&times;</button>
        </div>
        <div class="modal-body">
          <form v-if="mode !== 'view'" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label>Name *</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="form-control" 
                  required
                  :disabled="saving"
                >
              </div>
              <div class="form-group">
                <label>Surname *</label>
                <input 
                  v-model="form.surname" 
                  type="text" 
                  class="form-control" 
                  required
                  :disabled="saving"
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="form-control" 
                  required
                  :disabled="saving"
                >
              </div>
              <div class="form-group">
                <label>Phone *</label>
                <input 
                  v-model="form.phone" 
                  type="text" 
                  class="form-control" 
                  required
                  :disabled="saving"
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Alternative Phone</label>
                <input 
                  v-model="form.alternative_phone" 
                  type="text" 
                  class="form-control"
                  :disabled="saving"
                >
              </div>
              <div class="form-group">
                <label>Location *</label>
                <input 
                  v-model="form.location" 
                  type="text" 
                  class="form-control" 
                  required
                  :disabled="saving"
                >
              </div>
            </div>
            <div class="form-group">
              <label>Address *</label>
              <textarea 
                v-model="form.address" 
                class="form-control" 
                rows="3" 
                required
                :disabled="saving"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="$emit('close')" class="btn btn-secondary" :disabled="saving">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : (mode === 'create' ? 'Create Customer' : 'Update Customer') }}
              </button>
            </div>
          </form>
          
          <!-- View Mode -->
          <div v-else class="customer-details">
            <div class="detail-row">
              <strong>Name:</strong> {{ customer.name }} {{ customer.surname }}
            </div>
            <div class="detail-row">
              <strong>Email:</strong> {{ customer.email }}
            </div>
            <div class="detail-row">
              <strong>Phone:</strong> {{ customer.phone }}
            </div>
            <div class="detail-row" v-if="customer.alternative_phone">
              <strong>Alternative Phone:</strong> {{ customer.alternative_phone }}
            </div>
            <div class="detail-row">
              <strong>Location:</strong> {{ customer.location }}
            </div>
            <div class="detail-row">
              <strong>Address:</strong> {{ customer.address }}
            </div>
            <div class="detail-row">
              <strong>Created:</strong> {{ formatDate(customer.created_at) }}
            </div>
            <div class="detail-row">
              <strong>Updated:</strong> {{ formatDate(customer.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, watch, reactive } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit', 'view'].includes(value)
  },
  customer: {
    type: Object,
    default: () => ({})
  },
  saving: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// Form state
const form = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  alternative_phone: '',
  location: '',
  address: ''
})

// Computed
const modalTitle = computed(() => {
  switch (props.mode) {
    case 'create':
      return 'Add New Customer'
    case 'edit':
      return 'Edit Customer'
    case 'view':
      return 'Customer Details'
    default:
      return 'Customer'
  }
})

// Methods
const handleOverlayClick = () => {
  if (!props.saving) {
    emit('close')
  }
}

const handleSubmit = () => {
  emit('save', { ...form })
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

const populateForm = (customer) => {
  Object.keys(form).forEach(key => {
    form[key] = customer[key] || ''
  })
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watchers
watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.mode === 'edit' && props.customer) {
      populateForm(props.customer)
    } else if (props.mode === 'create') {
      resetForm()
    }
  }
})

watch(() => props.customer, (newCustomer) => {
  if (newCustomer && props.mode === 'edit') {
    populateForm(newCustomer)
  }
}, { deep: true })
</script>

<style scoped>
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-control:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #545b62;
}

.customer-details .detail-row {
  display: flex;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.customer-details .detail-row strong {
  min-width: 140px;
  color: #333;
}

@media (max-width: 768px) {
  .modal {
    width: 95%;
    margin: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>