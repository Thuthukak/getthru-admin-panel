<template>
  <!-- Create/Edit Invoice Modal -->
  <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3>{{ isEditing ? 'Edit Invoice' : 'Create Invoice' }}</h3>
        <button @click="handleClose" class="btn-close">×</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSave">
          <div class="form-grid">
            <div class="form-group">
              <label>Client *</label>
              <div class="client-selection">
                <select v-model="localForm.client_id" required class="form-select" @change="handleClientChange">
                  <option value="">Select Client</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                  <option value="custom">+ Add New Client</option>
                </select>
                <div v-if="showCustomClient" class="custom-client-form">
                  <div class="row">
                    <div class="col-md-12">
                      <input v-model="customClient.name" type="text" placeholder="Client Name *" required class="form-input" />
                      <input v-model="customClient.email" type="email" placeholder="Client Email" class="form-input" />
                      <input v-model="customClient.phone" type="tel" placeholder="Client Phone" class="form-input" />
                      <input v-model="customClient.address" type="text" placeholder="Client Address" class="form-input" />
                      <input v-model="customClient.city" type="text" placeholder="Client City" class="form-input" />
                      <input v-model="customClient.state" type="text" placeholder="Client Province" class="form-input" />
                      <input v-model="customClient.postal_code" type="text" placeholder="Client Postal Code" class="form-input" />
                      <input v-model="customClient.country" type="text" placeholder="Client Country" class="form-input" />
                      <input v-model="customClient.tax_number" type="text" placeholder="Client Tax Number" class="form-input" />
                    </div>
                  </div>
                  <button @click="cancelCustomClient" type="button" class="btn btn-sm btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Invoice Date *</label>
              <input v-model="localForm.invoice_date" type="date" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Due Date *</label>
              <input v-model="localForm.due_date" type="date" required class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Notes</label>
              <textarea v-model="localForm.notes" class="form-textarea" rows="3"></textarea>
            </div>
          </div>

          <!-- Invoice Items -->
          <div class="items-section">
            <div class="items-header">
              <h4>Invoice Items</h4>
              <div class="items-actions">
                <button @click="addItem" type="button" class="btn btn-secondary">Add Item</button>
                <button @click="showCustomService = true" type="button" class="btn btn-primary">Custom Service</button>
              </div>
            </div>
            
            <div v-for="(item, index) in localForm.items" :key="index" class="item-row">
              <div class="item-grid">
                <div class="form-group" v-if="!item.is_custom">
                  <label>Service</label>
                  <select v-model="item.service_id" class="form-select" @change="handleServiceChange(index)">
                    <option value="">Select Service</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">
                      {{ service.name }} - R{{ service.price }}
                    </option>
                  </select>
                </div>
                
                <div class="form-group" :class="{ 'full-width': item.is_custom }">
                  <label>Description *</label>
                  <input 
                    v-model="item.description" 
                    type="text" 
                    required 
                    class="form-input"
                    :readonly="item.service_id && !item.is_custom"
                  />
                </div>
                
                <div class="form-group">
                  <label>Quantity *</label>
                  <input v-model="item.quantity" type="number" min="1" required class="form-input" @input="calculateItemTotal(index)" />
                </div>
                
                <div class="form-group">
                  <label>Unit Price *</label>
                  <input 
                    v-model="item.unit_price" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    required 
                    class="form-input"
                    :readonly="item.service_id && !item.is_custom"
                    @input="calculateItemTotal(index)"
                  />
                </div>
                
                <div class="form-group">
                  <label>Total</label>
                  <input :value="item.total?.toFixed(2) || '0.00'" readonly class="form-input readonly" />
                </div>
                
                <div class="form-group">
                  <button @click="removeItem(index)" type="button" class="btn btn-danger btn-sm">Remove</button>
                </div>
              </div>
            </div>
            
            <!-- Custom Service Modal -->
            <div v-if="showCustomService" class="custom-service-modal">
              <div class="custom-service-form">
                <h5>Add Custom Service</h5>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Service Name *</label>
                    <input v-model="customService.name" type="text" required class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="customService.description" class="form-textarea" rows="2"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Price *</label>
                    <input v-model="customService.price" type="number" step="0.01" min="0" required class="form-input" />
                  </div>
                  <div class="form-group">
                    <input v-model="customService.is_active" hidden  type="text" class="form-input" />
                  </div>
                </div>
                <div class="custom-service-actions">
                  <button @click="cancelCustomService" type="button" class="btn btn-secondary">Cancel</button>
                  <button @click="addCustomService" type="button" class="btn btn-primary">Add Service</button>
                </div>
              </div>
            </div>
            
            <!-- Invoice Total -->
            <div class="invoice-total">
              <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-value">R{{ invoiceSubtotal.toFixed(2) }}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Tax (if applicable):</span>
                <span class="total-value">R0.00</span>
              </div>
              <div class="total-row total-final">
                <span class="total-label">Total:</span>
                <span class="total-value">R{{ invoiceSubtotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="handleClose" class="btn btn-secondary">Cancel</button>
        <button type="submit" @click="handleSave" class="btn btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : (isEditing ? 'Update Invoice' : 'Create Invoice') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'

export default {
  name: 'InvoiceCreateEditModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    invoice: {
      type: Object,
      default: null
    },
    clients: {
      type: Array,
      default: () => []
    },
    services: {
      type: Array,
      default: () => []
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    // Local form state
    const localForm = reactive({
      client_id: '',
      invoice_date: '',
      due_date: '',
      notes: '',
      items: [
        { service_id: '', description: '', quantity: 1, unit_price: 0, total: 0, is_custom: false }
      ]
    })

    // Services state
    const services = ref([])
    const loadingServices = ref(false)

    // Custom client handling
    const showCustomClient = ref(false)
    const customClient = reactive({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      tax_number: ''
    })

    // Custom service handling
    const showCustomService = ref(false)
    const customService = reactive({
      name: '',
      description: '',
      price: 0,
      is_active: 1
    })

    // Computed properties
    const invoiceSubtotal = computed(() => {
      return localForm.items.reduce((sum, item) => sum + (item.total || 0), 0)
    })

    // API functions
    const api = {
      async get(url) {
        const response = await fetch(url)
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      },

      async post(url, data) {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      }
    }

    // Load services
    const loadServices = async () => {
      loadingServices.value = true
      try {
        const response = await api.get('/api/services')
        services.value = response
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        loadingServices.value = false
      }
    }

    // Methods
    const resetForm = () => {
      Object.assign(localForm, {
        client_id: '',
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
        items: [{ service_id: '', description: '', quantity: 1, unit_price: 0, total: 0, is_custom: false }]
      })
      showCustomClient.value = false
      showCustomService.value = false
      Object.assign(customClient, { name: '', email: '', phone: '', address: '', city: '', state: '', postal_code: '', country: '', tax_number: '' })
      Object.assign(customService, { name: '', description: '', price: 0, is_active: 1 })
    }

    const populateForm = (invoice) => {
      if (invoice) {
        Object.assign(localForm, {
          client_id: invoice.client_id,
          invoice_date: invoice.invoice_date,
          due_date: invoice.due_date,
          notes: invoice.notes || '',
          items: invoice.items?.length ? invoice.items.map(item => ({
            service_id: item.service_id || '',
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total: item.quantity * item.unit_price,
            is_custom: !item.service_id
          })) : [{ service_id: '', description: '', quantity: 1, unit_price: 0, total: 0, is_custom: false }]
        })
      }
    }

    const handleClientChange = () => {
      if (localForm.client_id === 'custom') {
        showCustomClient.value = true
        localForm.client_id = ''
      } else {
        showCustomClient.value = false
      }
    }

    const cancelCustomClient = () => {
      showCustomClient.value = false
      localForm.client_id = ''
      Object.assign(customClient, { name: '', email: '', phone: '', address: '', city: '', state: '', postal_code: '', country: '', tax_number: '' })
    }

    const handleServiceChange = (itemIndex) => {
      const item = localForm.items[itemIndex]
      const selectedService = services.value.find(service => service.id == item.service_id)
      
      if (selectedService) {
        item.description = selectedService.name
        item.unit_price = parseFloat(selectedService.price)
        item.is_custom = false
        calculateItemTotal(itemIndex)
      } else if (item.service_id === '') {
        // Clear fields when no service selected
        item.description = ''
        item.unit_price = 0
        item.is_custom = false
        calculateItemTotal(itemIndex)
      }
    }

    const addCustomService = async () => {
      try {
        // Save custom service to backend
        const newService = await api.post('/api/services/custom', customService)
        
        // Add to local services list
        services.value.push(newService)
        
        // Add item with custom service
        const newItem = {
          service_id: '',
          description: customService.name,
          quantity: 1,
          unit_price: parseFloat(customService.price),
          total: parseFloat(customService.price),
          is_custom: true
        }
        
        localForm.items.push(newItem)
        
        // Reset and close custom service form
        Object.assign(customService, { name: '', description: '', price: 0, is_active: 1 })
        showCustomService.value = false
      } catch (error) {
        console.error('Error adding custom service:', error)
        // If API fails, still add as custom item
        const newItem = {
          service_id: '',
          description: customService.name,
          quantity: 1,
          unit_price: parseFloat(customService.price),
          total: parseFloat(customService.price),
          is_custom: true
        }
        
        localForm.items.push(newItem)
        Object.assign(customService, { name: '', description: '', price: 0, is_active: 1 })
        showCustomService.value = false
      }
    }

    const cancelCustomService = () => {
      showCustomService.value = false
      Object.assign(customService, { name: '', description: '', price: 0, is_active: 1 })
    }

    const calculateItemTotal = (itemIndex) => {
      const item = localForm.items[itemIndex]
      const quantity = parseFloat(item.quantity) || 0
      const unitPrice = parseFloat(item.unit_price) || 0
      item.total = quantity * unitPrice
    }

    const addItem = () => {
      localForm.items.push({ service_id: '', description: '', quantity: 1, unit_price: 0, total: 0, is_custom: false })
    }

    const removeItem = (index) => {
      if (localForm.items.length > 1) {
        localForm.items.splice(index, 1)
      }
    }

    const handleClose = () => {
      emit('close')
    }

    const handleOverlayClick = () => {
      emit('close')
    }

    const handleSave = () => {
      const formData = { ...localForm }
      
      // Handle custom client
      if (showCustomClient.value && customClient.name) {
        formData.custom_client = { ...customClient }
      }

      // Clean up items - remove service_id if it's empty or custom
      formData.items = formData.items.map(item => ({
        service_id: (item.service_id && !item.is_custom) ? item.service_id : null,
        description: item.description,
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.unit_price)
      }))

      emit('save', formData)
    }

    // Watchers
    watch(() => props.show, (newValue) => {
      if (newValue) {
        loadServices() // Load services when modal opens
        if (props.isEditing && props.invoice) {
          populateForm(props.invoice)
        } else {
          resetForm()
        }
      }
    })

    watch(() => props.invoice, (newInvoice) => {
      if (props.isEditing && newInvoice) {
        populateForm(newInvoice)
      }
    })

    // Lifecycle
    onMounted(() => {
      loadServices()
    })

    return {
      localForm,
      services,
      loadingServices,
      showCustomClient,
      customClient,
      showCustomService,
      customService,
      invoiceSubtotal,
      addItem,
      removeItem,
      handleClose,
      handleOverlayClick,
      handleSave,
      handleClientChange,
      cancelCustomClient,
      handleServiceChange,
      addCustomService,
      cancelCustomService,
      calculateItemTotal
    }
  }
}
</script>

<style scoped>
/* Form Elements */
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.readonly {
  background: #f9fafb;
  color: #6b7280;
}

/* Custom Client Form */
.custom-client-form {
  margin-top: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.custom-client-form .form-input {
  margin-bottom: 0;
}

/* Custom Service Modal */
.custom-service-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.custom-service-form {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 500px;
  margin: 20px;
}

.custom-service-form h5 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.custom-service-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* Items Section */
.items-section {
  margin-top: 32px;
}

.items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.items-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.items-actions {
  display: flex;
  gap: 12px;
}

.item-row {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #f9fafb;
}

.item-grid {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr auto;
  gap: 16px;
  align-items: end;
}

.item-grid .full-width {
  grid-column: 1 / 3;
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

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  color: #374151;
}

/* Modals - Updated for better scrolling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 50;
  padding: 20px;
  overflow-y: auto;
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 900px;
  min-height: min-content;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-radius: 12px 12px 0 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.modal-body {
  padding: 24px;
  flex: 1;
  overflow-y: visible;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  position: sticky;
  bottom: 0;
  z-index: 10;
  border-radius: 0 0 12px 12px;
}

/* Form Layouts */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

/* Invoice Total */
.invoice-total {
  margin-top: 24px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  max-width: 300px;
  margin-left: auto;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.total-row:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
}

.total-final {
  font-weight: 600;
  font-size: 16px;
  border-top: 2px solid #e5e7eb !important;
  margin-top: 8px;
  padding-top: 12px;
}

.total-label {
  color: #6b7280;
}

.total-value {
  font-weight: 500;
  color: #1f2937;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal {
    margin: 10px auto;
    max-width: none;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
  
  .item-grid {
    grid-template-columns: 1fr;
  }
  
  .item-grid .full-width {
    grid-column: 1;
  }
  
  .invoice-total {
    max-width: none;
    margin-left: 0;
  }
  
  .items-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .items-actions {
    width: 100%;
  }
}

/* Ensure proper scrolling on all devices */
@media (max-height: 600px) {
  .modal-overlay {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  .modal {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>