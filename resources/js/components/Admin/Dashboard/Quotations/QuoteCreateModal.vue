<template>
  <div>
    <!-- Teleport Modal to body -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <!-- Modal Content -->
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="modal-header-color text-white px-6 py-4 flex justify-between items-center">
            <h3 class="text-xl fw-bold font-bold">Create Quotation</h3>
            <button @click="closeModal" class="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto flex-1">
            <div v-if="!submitted">
              <!-- Loading state -->
              <div v-if="loading" class="flex justify-center items-center py-12">
                <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>

              <!-- Submitting state -->
              <div v-else-if="submitting" class="flex justify-center items-center py-12">
                <div class="text-center">
                  <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p class="text-gray-600">Submitting your request...</p>
                </div>
              </div>

              <div v-else>
                <!-- Services Selection -->
                <div class="mb-4">
                  <h4 class="text-lg font-semibold mb-2 text-gray-800">Select Services That Customer is Interested In</h4>
                  <p class="text-sm text-gray-600 mb-3">Choose the services you'd like us to include in their quotation.</p>
                  <div class="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                    <div 
                      v-for="service in services" 
                      :key="service.id"
                      @click="toggleService(service.id)"
                      :class="[
                        'border rounded-lg p-3 cursor-pointer transition-all',
                        service.selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                      ]"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div :class="[
                            'w-5 h-5 rounded border-2 mr-3 flex items-center justify-center',
                            service.selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                          ]">
                            <svg v-if="service.selected" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <span class="font-medium text-gray-800">{{ service.name }}</span>
                        </div>
                      </div>
                      <p v-if="service.description" class="text-sm text-gray-600 mt-1 ml-8">{{ service.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Quote Info -->
                <div class="p-3 mb-4">
                </div>

                <!-- Contact Info -->
                <div class="mb-4">
                  <h4 class="text-lg font-semibold mb-2 text-gray-800">Customer Contact Details</h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text" 
                        v-model="name"
                        placeholder="Enter your full name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                      <input 
                        type="email" 
                        v-model="email"
                        placeholder="Enter your email address"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-1">Additional Details (Optional)</label>
                      <textarea 
                        v-model="additionalDetails"
                        placeholder="Tell us more about your project requirements..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-16 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button 
                  @click="handleSubmit"
                  :disabled="!hasSelectedServices || !name || !email || submitting"
                  :class="[
                    'w-full py-3 px-6 rounded font-bold text-white transition-colors',
                    (hasSelectedServices && name && email && !submitting) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                  ]"
                >
                  <span v-if="submitting">Sending Qoute...</span>
                  <span v-else-if="!hasSelectedServices && (!name || !email)">Select Services & Fill Contact Details</span>
                  <span v-else-if="!hasSelectedServices">Please Select At Least One Service</span>
                  <span v-else-if="!name || !email">Please Fill In Contact Details</span>
                  <span v-else>Send Estimate Request</span>
                </button>
              </div>
            </div>
            
            <!-- Success/Warning State -->
            <div v-else class="text-center py-6">
              <div class="flex justify-center mb-4">
                <div :class="[
                  'p-3 rounded-full inline-flex',
                  emailWarning ? 'bg-yellow-100' : 'bg-green-100'
                ]">
                  <svg v-if="!emailWarning" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <path d="M12 9v4"/>
                    <path d="m12 17 .01 0"/>
                  </svg>
                </div>
              </div>
              
              <h4 :class="[
                'text-xl font-bold mb-2',
                emailWarning ? 'text-yellow-800' : 'text-gray-800'
              ]">
                {{ emailWarning ? 'Request Received!' : 'Request Sent Successfully!' }}
              </h4>
              
              <div v-if="emailWarning" class="mb-4">
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p class="text-yellow-800 text-sm font-medium mb-2">⚠️ Email Delivery Issue</p>
                  <p class="text-yellow-700 text-sm">{{ emailWarning }}</p>
                </div>
                <p class="text-gray-600">
                  Your request has been saved to our system. We will contact you directly at <strong>{{ email }}</strong> within 24 hours with your detailed quote.
                </p>
              </div>
              
              <div v-else>
                <p class="text-gray-600 mb-6">
                  The Quote has been generated successfully and customer will receive a detailed quote at <strong>{{ email }}</strong> within 24 hours.
                </p>
              </div>
              
              <button 
                @click="closeModal"
                :class="[
                  'font-bold py-2 px-6 rounded text-white',
                  emailWarning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'
                ]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuoteCreateModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      services: [],
      name: '',
      email: '',
      additionalDetails: '',
      submitted: false,
      submitting: false,
      loading: true,
      error: null,
      emailWarning: null
    };
  },
  computed: {
    hasSelectedServices() {
      return this.services.some(service => service.selected);
    },
    totalEstimate() {
      return this.services.reduce((sum, service) => {
        return sum + (service.selected ? service.price : 0);
      }, 0);
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchServices();
      }
    }
  },
  methods: {
    fetchServices() {
      this.loading = true;
      this.error = null;
      
      axios.get('/api/services')
        .then(response => {
          this.services = response.data.map(service => ({
            ...service,
            price: parseFloat(service.base_price),
            selected: false
          }));
        })
        .catch(error => {
          console.error('Error fetching services:', error);
          this.error = 'Failed to load services. Please try again later.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    toggleService(id) {
      const serviceIndex = this.services.findIndex(service => service.id === id);
      if (serviceIndex !== -1) {
        this.services[serviceIndex].selected = !this.services[serviceIndex].selected;
      }
    },
    
    handleSubmit() {
      if (!this.hasSelectedServices || !this.name || !this.email || this.submitting) return;
      
      this.submitting = true;
      this.error = null;
      
      const selectedServices = this.services.filter(s => s.selected).map(service => ({
        id: service.id,
        price: service.price
      }));
      
      const requestData = {
        name: this.name,
        email: this.email,
        selectedServices: selectedServices,
        totalEstimate: this.totalEstimate,
        additionalDetails: this.additionalDetails
      };
      
      axios.post('/api/estimates', requestData)
        .then(response => {
          // Check if email was sent successfully
          if (response.data.email_warning) {
            this.emailWarning = response.data.email_warning;
          }
          this.submitted = true;
        })
        .catch(error => {
          console.error('Error submitting estimate request:', error);
          
          if (error.response && error.response.data && error.response.data.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
            alert(`Validation errors:\n${errorMessages}`);
          } else if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert('There was a problem submitting your request. Please try again or contact us directly.');
          }
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    
    resetForm() {
      this.submitted = false;
      this.submitting = false;
      this.name = '';
      this.email = '';
      this.additionalDetails = '';
      this.emailWarning = null;
      this.error = null;
      
      this.services.forEach(service => {
        service.selected = false;
      });
    },
    
    closeModal() {
      this.resetForm();
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-header-color {
  background: linear-gradient(135deg, #005e91 0%, #004469 100%);
}
</style>