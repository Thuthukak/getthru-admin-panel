<template>
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-8" style="max-width: 1200px;">
        <!-- Header with blue background -->
        <div class="bg-blue-500 p-6 shadow mb-6 rounded-lg">
          <div class="flex justify-center">
            <img 
              src="/assets/images/Getthru letterhead2.png" 
              alt="GetThru Logo"
              class="h-16 object-fit-cover"
            />
          </div>
        </div>

        <!-- Customer Contact Info -->
        <div class="mb-6 bg-white rounded-lg shadow p-6">
          <h4 class="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Customer Contact Details
          </h4>
          
          <!-- Two column grid for desktop -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1">Name *</label>
              <input 
                v-model="formData.name"
                type="text" 
                placeholder="Enter your name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1">Surname *</label>
              <input 
                v-model="formData.surname"
                type="text" 
                placeholder="Enter your surname"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
              <input 
                v-model="formData.phone"
                type="tel" 
                placeholder="Enter your phone number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-1">Alternative Number</label>
              <input 
                v-model="formData.alternativePhone"
                type="tel" 
                placeholder="Enter alternative phone number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-1">Email *</label>
              <input 
                v-model="formData.email"
                type="email" 
                placeholder="Enter your email address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Location *</label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input v-model="formData.location" type="radio" value="Nhlazatje" class="text-blue-500 focus:ring-blue-500" />
                  <span class="text-gray-700">Nhlazatje</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input v-model="formData.location" type="radio" value="Elukwatini" class="text-blue-500 focus:ring-blue-500" />
                  <span class="text-gray-700">Elukwatini</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input v-model="formData.location" type="radio" value="Tjakastad" class="text-blue-500 focus:ring-blue-500" />
                  <span class="text-gray-700">Tjakastad</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input v-model="formData.location" type="radio" value="Other" class="text-blue-500 focus:ring-blue-500" />
                  <span class="text-gray-700">Other</span>
                </label>
              </div>
              <div v-show="showOtherLocation" class="mt-2">
                <input 
                  v-model="formData.otherLocation"
                  type="text" 
                  placeholder="Enter your location"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-1">Home Street Address *</label>
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
          <h4 class="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Internet Solution Details
          </h4>
          
          <div class="space-y-6">
            <!-- Service Type -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-3">Service Type *</label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input v-model="formData.serviceType" type="radio" value="homeInternet" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Home Internet</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.serviceType" type="radio" value="businessInternet" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Business Internet</span>
                </label>
              </div>
            </div>

            <!-- Package Selection -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-3">Select Package *</label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input v-model="formData.package" type="radio" value="100gb" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">100GB - R300</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.package" type="radio" value="basic" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Basic - R 430.00 (Unlimited 10/10Mbps)</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.package" type="radio" value="standard" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Standard - R 550.00 (Unlimited 20/20Mbps)</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.package" type="radio" value="premium" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Premium - R 650.00 (Unlimited 30/30Mbps)</span>
                </label>
              </div>
            </div>

            <!-- Installation Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">Preferred Installation Date *</label>
                <input 
                  v-model="formData.installationDate"
                  type="date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Payment Period -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-3">Preferred Subscription Payment Period *</label>
              <p class="text-sm text-gray-600 mb-3">This is the time of the month you would prefer to pay your monthly connection payment.</p>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input v-model="formData.paymentPeriod" type="radio" value="first" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">1st of every month</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.paymentPeriod" type="radio" value="fifteenth" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">15th of every month</span>
                </label>
              </div>
            </div>

            <!-- Deposit Payment -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-3">Deposit Payment *</label>
              <p class="text-sm text-gray-600 mb-3">To secure your order we require 50% upfront deposit payment, how do you prefer to pay? (The full deposit amount is R950 once off)</p>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input v-model="formData.depositPayment" type="radio" value="eft" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">EFT Payment</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.depositPayment" type="radio" value="card" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Pay using our secure options</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.depositPayment" type="radio" value="bank" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Bank deposit</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.depositPayment" type="radio" value="later" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Pay later</span>
                </label>
              </div>
            </div>

            <!-- How did you know about us -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-3">How do you know about us?</label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input v-model="formData.howDidYouKnow" type="radio" value="social" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Social Media</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.howDidYouKnow" type="radio" value="friend" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Through a friend</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.howDidYouKnow" type="radio" value="poster" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Saw a poster</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.howDidYouKnow" type="radio" value="agent" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Through one of our agents</span>
                </label>
                <label class="flex items-center">
                  <input v-model="formData.howDidYouKnow" type="radio" value="other" class="text-blue-500 focus:ring-blue-500 mr-3" />
                  <span class="text-gray-700">Other</span>
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
              <label class="block text-gray-700 text-sm font-medium mb-1">Additional Comments</label>
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
              'font-semibold py-2 px-4 rounded shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
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
            'mt-4 p-4 border rounded-md text-center',
            statusType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'
          ]"
        >
          {{ statusMessage }}
        </div>
      </div>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

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

    // Computed properties
    const showOtherLocation = computed(() => formData.location === 'Other')
    const showOtherKnow = computed(() => formData.howDidYouKnow === 'other')

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
      
      return true
    }

    // Show status message
    const displayStatus = (message, type) => {
      statusMessage.value = message
      statusType.value = type
      showStatus.value = true
    }

    // Reset form
    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
    }

    // Submit form
    const submitForm = async () => {
      if (!validateForm()) {
        displayStatus('Please fill in all required fields.', 'error')
        return
      }
      
      isSubmitting.value = true
      
      try {
        const response = await fetch('/api/reg-form-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          displayStatus('Form submitted successfully! We\'ll contact you soon.', 'success')
          resetForm()
        } else {
          throw new Error('Failed to submit form')
        }
      } catch (error) {
        displayStatus('There was an error submitting the form. Please try again.', 'error')
        console.error('Error submitting form:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      isSubmitting,
      statusMessage,
      statusType,
      showStatus,
      showOtherLocation,
      showOtherKnow,
      submitForm
    }
  }
}
</script>