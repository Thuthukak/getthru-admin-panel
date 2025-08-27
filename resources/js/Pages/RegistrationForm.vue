<template>
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-6 py-5" style="max-width: 800px;">
        <!-- Header with blue background -->
        <div class="bg-blue-500 shadow mb-6 rounded-lg overflow-hidden">
          <img
            src="/assets/images/getthruformbanner.jpeg"
            alt="GetThru Logo"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Customer Contact Info -->
        <div class="mb-6 bg-white rounded-lg shadow p-6">
          <h4 class="text-xl font-semibold fw-bold mb-4 text-gray-800 border-b pb-2">
            Customer Contact Details
          </h4>
          
          <!-- Two column grid for desktop -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Name *</label>
              <input 
                v-model="formData.name"
                type="text" 
                placeholder="Enter your name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Surname *</label>
              <input 
                v-model="formData.surname"
                type="text" 
                placeholder="Enter your surname"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Phone Number *</label>
              <input 
                v-model="formData.phone"
                type="tel" 
                placeholder="Enter your phone number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Alternative Number</label>
              <input 
                v-model="formData.alternativePhone"
                type="tel" 
                placeholder="Enter alternative phone number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Email *</label>
              <input 
                v-model="formData.email"
                type="email" 
                placeholder="Enter your email address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-3">Location *</label>
              <div class="space-y-3">
                <label class="custom-radio-container">
                  <input v-model="formData.location" type="radio" value="Nhlazatje" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Nhlazatje</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.location" type="radio" value="Elukwatini" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Elukwatini</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.location" type="radio" value="Tjakastad" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Tjakastad</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.location" type="radio" value="Other" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Other</span>
                </label>
              </div>
              <div v-show="showOtherLocation" class="mt-3">
                <input 
                  v-model="formData.otherLocation"
                  type="text" 
                  placeholder="Enter your location"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Home Street Address *</label>
              <input 
                v-model="formData.address"
                type="text" 
                placeholder="Enter your home street address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Internet Solution Details -->
        <div class="mb-6 bg-white rounded-lg shadow p-6">
          <h4 class="text-xl font-semibold mb-4 fw-bold text-gray-800 border-b pb-2">
            Internet Solution Details
          </h4>
          
          <div class="space-y-6">
            <!-- Service Type -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-3">Service Type *</label>
              <div class="space-y-3">
                <label class="custom-radio-container">
                  <input v-model="formData.serviceType" type="radio" value="Home Internet" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Home Internet</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.serviceType" type="radio" value="Business Internet" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Business Internet</span>
                </label>
              </div>
            </div>

            <!-- Package Selection -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-3">Select Package *</label>
              <div class="space-y-3">
                <template v-if="availablePackages.length > 0">
                  <label 
                    v-for="pkg in availablePackages" 
                    :key="pkg.id" 
                    class="custom-radio-container"
                  >
                    <input 
                      v-model="formData.package" 
                      type="radio" 
                      :value="pkg.package" 
                      class="custom-radio-input" 
                    />
                    <span class="custom-radio-checkmark"></span>
                    <span class="custom-radio-text">
                      {{ pkg.package }} - R{{ formatPrice(pkg.price) }}
                      <span v-if="getPackageDescription(pkg.package)" class="text-gray-600 text-sm">
                        ({{ getPackageDescription(pkg.package) }})
                      </span>
                    </span>
                  </label>
                </template>
                <div v-else-if="formData.serviceType && isLoadingPackages" class="text-gray-500">
                  Loading packages...
                </div>
                <div v-else-if="formData.serviceType" class="text-gray-500">
                  No packages available for selected service type.
                </div>
                <div v-else class="text-gray-500">
                  Please select a service type first.
                </div>
              </div>
            </div>

            <!-- Installation Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 text-lg fw-bold font-medium mb-1">Preferred Installation Date *</label>
                <input 
                  v-model="formData.installationDate"
                  type="date" 
                  :min="minDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Payment Period -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-3">Preferred Subscription Payment Period *</label>
              <p class="text-sm text-gray-600 mb-3">This is the time of the month you would prefer to pay your monthly connection payment.</p>
              <div class="space-y-3">
                <label class="custom-radio-container">
                  <input v-model="formData.paymentPeriod" type="radio" value="1st of every month" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">1st of every month</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.paymentPeriod" type="radio" value="15th of every month" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">15th of every month</span>
                </label>
              </div>
            </div>

            <!-- Deposit Payment -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-medium mb-3">Deposit Payment *</label>
              <p class="text-sm text-gray-600 mb-3">To secure your order we require 50% upfront deposit payment, how do you prefer to pay? (The full deposit amount is R950 once off)</p>
              <div class="space-y-3">
                <label class="custom-radio-container">
                  <input v-model="formData.depositPayment" type="radio" value="EFT Payment" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">EFT Payment</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.depositPayment" type="radio" value="Card" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Pay using our secure options</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.depositPayment" type="radio" value="Bank deposit" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Bank deposit</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.depositPayment" type="radio" value="Pay later" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Pay later</span>
                </label>
              </div>
            </div>

            <!-- How did you know about us -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-large mb-3">How do you know about us?</label>
              <div class="space-y-3">
                <label class="custom-radio-container">
                  <input v-model="formData.howDidYouKnow" type="radio" value="Social Media" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Social Media</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.howDidYouKnow" type="radio" value="Through a friend" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Through a friend</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.howDidYouKnow" type="radio" value="Saw a poster" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Saw a poster</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.howDidYouKnow" type="radio" value="Through one of our agents" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Through one of our agents</span>
                </label>
                <label class="custom-radio-container">
                  <input v-model="formData.howDidYouKnow" type="radio" value="Other" class="custom-radio-input" />
                  <span class="custom-radio-checkmark"></span>
                  <span class="custom-radio-text">Other</span>
                </label>
              </div>
              <div v-show="showOtherKnow" class="mt-3">
                <input 
                  v-model="formData.otherKnow"
                  type="text" 
                  placeholder="If other, how do you know about us?"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Additional Comments -->
            <div>
              <label class="block text-gray-700 text-lg fw-bold font-large mb-1">Additional Comments</label>
              <textarea 
                v-model="formData.comments"
                placeholder="Enter your comments"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex ">
          <button
            @click="submitForm"
            :disabled="isSubmitting"
            :class="[
              'font-semibold py-2 px-3 rounded shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-xl'
            ]"
            class="text-white"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </div>

        <!-- Status Messages -->
        <div 
          v-show="showStatus"
          :class="[
            'mt-4 p-4 border rounded-lg text-center shadow-md',
            statusType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
          ]"
        >
          {{ statusMessage }}
        </div>
      </div>
    </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    // Reactive form data
    const formData = reactive({
      name: '',
      surname: '',
      phone: '',
      alternativePhone: '',
      email: '',
      location: '',
      otherLocation: '',
      address: '',
      serviceType: '',
      package: '',
      installationDate: '',
      paymentPeriod: '',
      depositPayment: '',
      howDidYouKnow: '',
      otherKnow: '',
      comments: ''
    })

    // UI state
    const isSubmitting = ref(false)
    const statusMessage = ref('')
    const statusType = ref('')
    const showStatus = ref(false)
    const availablePackages = ref([])
    const isLoadingPackages = ref(false)

    // Computed properties
    const showOtherLocation = computed(() => formData.location === 'Other')
    const showOtherKnow = computed(() => formData.howDidYouKnow === 'Other')
    const minDate = computed(() => {
      const today = new Date()
      return today.toISOString().split('T')[0]
    })

    // Watch for service type changes to load packages
    watch(() => formData.serviceType, async (newServiceType) => {
      if (newServiceType) {
        await loadPackages(newServiceType)
        // Reset package selection when service type changes
        formData.package = ''
      } else {
        availablePackages.value = []
        formData.package = ''
      }
    })

    // Load packages for selected service type
    const loadPackages = async (serviceType) => {
      isLoadingPackages.value = true
      try {
        const response = await fetch(`/api/packages/${encodeURIComponent(serviceType)}`)
        if (response.ok) {
          const data = await response.json()
          availablePackages.value = data.packages || []
        } else {
          availablePackages.value = []
          console.error('Failed to load packages:', response.statusText)
        }
      } catch (error) {
        console.error('Error loading packages:', error)
        availablePackages.value = []
      } finally {
        isLoadingPackages.value = false
      }
    }

    // Helper functions
    const formatPrice = (price) => {
      return parseFloat(price).toFixed(2)
    }

    const getPackageDescription = (packageName) => {
      const descriptions = {
        'Basic': 'Unlimited 10/10Mbps',
        'Standard': 'Unlimited 20/20Mbps',
        'Premium': 'Unlimited 30/30Mbps'
      }
      return descriptions[packageName] || ''
    }

    // Validation
    const validateForm = () => {
      const requiredFields = [
        'name', 'surname', 'phone', 'email', 'location', 'address',
        'serviceType', 'package', 'installationDate', 'paymentPeriod', 'depositPayment'
      ]
      
      for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          return false
        }
      }
      
      // Check if location is "Other" and otherLocation is filled
      if (formData.location === 'Other' && (!formData.otherLocation || formData.otherLocation.trim() === '')) {
        return false
      }
      
      // Check if howDidYouKnow is "Other" and otherKnow is filled
      if (formData.howDidYouKnow === 'Other' && (!formData.otherKnow || formData.otherKnow.trim() === '')) {
        return false
      }
      
      return true
    }

    // Show status message
    const displayStatus = (message, type) => {
      statusMessage.value = message
      statusType.value = type
      showStatus.value = true
      
      // Auto hide success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          showStatus.value = false
        }, 5000)
      }
    }

    // Reset form
    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      availablePackages.value = []
    }

    // Submit form
    const submitForm = async () => {
      if (!validateForm()) {
        displayStatus('Please fill in all required fields.', 'error')
        return
      }
      
      isSubmitting.value = true
      
      try {
        // Get CSRF token from meta tag or Laravel's global
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') 
                        || window.Laravel?.csrfToken;
        
        const response = await fetch('/api/reg-form-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const result = await response.json()
          displayStatus('Order placed successfully! We\'ll contact you soon.', 'success')
          resetForm()
        } else {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to submit form')
        }
      } catch (error) {
        displayStatus('There was an error submitting the form. Please try again.', 'error')
        console.error('Error submitting form:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    // Initialize component
    onMounted(() => {
      // Hide status messages when clicking elsewhere
      document.addEventListener('click', (e) => {
        if (showStatus.value && !e.target.closest('.status-message')) {
          showStatus.value = false
        }
      })
    })

    return {
      formData,
      isSubmitting,
      statusMessage,
      statusType,
      showStatus,
      showOtherLocation,
      showOtherKnow,
      availablePackages,
      isLoadingPackages,
      minDate,
      formatPrice,
      getPackageDescription,
      submitForm
    }
  }
}
</script>

<style scoped>
/* Custom Radio Button Styles */
.custom-radio-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  transition: all 0.2s ease;
  position: relative;
}

.custom-radio-container:hover {
  border-color: #93c5fd;
  background-color: #eff6ff;
}

.custom-radio-container:has(.custom-radio-input:checked) {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.custom-radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-radio-checkmark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  margin-right: 12px;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.custom-radio-input:checked + .custom-radio-checkmark {
  border-color: #10b981;
  background-color: #10b981;
}

.custom-radio-input:checked + .custom-radio-checkmark::after {
  content: '';
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-radio-text {
  color: #374151;
  font-weight: 500;
  transition: color 0.2s ease;
}

.custom-radio-container:has(.custom-radio-input:checked) .custom-radio-text {
  color: #047857;
}

/* Focus styles for accessibility */
.custom-radio-input:focus + .custom-radio-checkmark {
  box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Hover animation */
.custom-radio-container:hover .custom-radio-checkmark {
  transform: scale(1.1);
}

/* Loading state */
.custom-radio-container.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Fallback for browsers that don't support :has() */
@supports not selector(:has(*)) {
  .custom-radio-container.checked {
    border-color: #10b981;
    background-color: #f0fdf4;
  }
  
  .custom-radio-container.checked .custom-radio-text {
    color: #047857;
  }
}
</style>