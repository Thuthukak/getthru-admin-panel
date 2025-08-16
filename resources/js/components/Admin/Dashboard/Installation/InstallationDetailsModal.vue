<template>
  <div>
    <!-- Teleport Modal to body -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <!-- Modal Content -->
        <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="modal-header-color text-white px-6 py-4 flex justify-between items-center">
            <h3 class="text-xl font-bold">Installation Details</h3>
            <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto flex-1">
            <div v-if="installation">
              <!-- Personal Information -->
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Personal Information
                  </h4>
                  
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Name:</span>
                      <span class="text-gray-800">{{ installation.name }} {{ installation.surname }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Phone:</span>
                      <span class="text-gray-800">{{ installation.phone }}</span>
                    </div>
                    
                    <div v-if="installation.alternative_phone" class="flex justify-between">
                      <span class="font-medium text-gray-600">Alt Phone:</span>
                      <span class="text-gray-800">{{ installation.alternative_phone }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Email:</span>
                      <span class="text-gray-800 break-all">{{ installation.email }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Location:</span>
                      <span class="text-gray-800">{{ installation.location }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Service Information
                  </h4>
                  
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Service Type:</span>
                      <span class="text-gray-800">{{ installation.service_type }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Package:</span>
                      <span class="text-gray-800">{{ installation.package }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Installation Date:</span>
                      <span class="text-gray-800">{{ formatDate(installation.installation_date) }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Payment Period:</span>
                      <span class="text-gray-800">{{ installation.payment_period }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Deposit Payment:</span>
                      <span class="text-gray-800">{{ installation.deposit_payment }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Address Section -->
              <div class="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Address
                </h4>
                <p class="text-gray-800">{{ installation.address || 'No address provided' }}</p>
              </div>

              <!-- Status and Additional Info -->
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    Status & Timeline
                  </h4>
                  
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Status:</span>
                      <span :class="'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + getStatusBadgeClass(installation.status)">
                        {{ formatStatus(installation.status) }}
                      </span>
                    </div>
                    
                    <div v-if="installation.processed_at" class="flex justify-between">
                      <span class="font-medium text-gray-600">Processed At:</span>
                      <span class="text-gray-800">{{ formatDateTime(installation.processed_at) }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Created:</span>
                      <span class="text-gray-800">{{ formatDateTime(installation.created_at) }}</span>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">Updated:</span>
                      <span class="text-gray-800">{{ formatDateTime(installation.updated_at) }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Additional Details
                  </h4>
                  
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="font-medium text-gray-600">How did you know:</span>
                      <span class="text-gray-800">{{ installation.how_did_you_know || 'Not specified' }}</span>
                    </div>
                    
                    <div v-if="installation.comments" class="mt-4">
                      <span class="font-medium text-gray-600 block mb-2">Comments:</span>
                      <div class="bg-white rounded p-3 border">
                        <p class="text-gray-800 whitespace-pre-wrap">{{ installation.comments }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4 border-t">
                <!-- <button 
                  @click="editInstallation"
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                  Edit Installation
                </button> -->
                
                <button 
                  @click="printDetails"
                  class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect width="12" height="8" x="6" y="14"/>
                  </svg>
                  Print Details
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t bg-gray-50">
            <div class="flex justify-end">
              <button 
                @click="closeModal"
                class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded transition-colors"
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
export default {
  name: 'InstallationDetailsModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    installation: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'edit'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    editInstallation() {
      this.$emit('edit', this.installation)
      this.closeModal()
    },
    
    printDetails() {
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      const printContent = this.generatePrintContent()
      
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
      printWindow.close()
    },
    
    generatePrintContent() {
      const installation = this.installation
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Installation Details - ${installation.name} ${installation.surname}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .label { font-weight: bold; }
            .status { padding: 2px 8px; border-radius: 4px; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-confirmed { background: #bfdbfe; color: #1e40af; }
            .status-in_progress { background: #bfdbfe; color: #1d4ed8; }
            .status-completed { background: #bbf7d0; color: #166534; }
            .status-cancelled { background: #fecaca; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Installation Details</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="info-row"><span class="label">Name:</span> <span>${installation.name} ${installation.surname}</span></div>
            <div class="info-row"><span class="label">Phone:</span> <span>${installation.phone}</span></div>
            ${installation.alternative_phone ? `<div class="info-row"><span class="label">Alt Phone:</span> <span>${installation.alternative_phone}</span></div>` : ''}
            <div class="info-row"><span class="label">Email:</span> <span>${installation.email}</span></div>
            <div class="info-row"><span class="label">Location:</span> <span>${installation.location}</span></div>
            <div class="info-row"><span class="label">Address:</span> <span>${installation.address || 'Not provided'}</span></div>
          </div>
          
          <div class="section">
            <div class="section-title">Service Information</div>
            <div class="info-row"><span class="label">Service Type:</span> <span>${installation.service_type}</span></div>
            <div class="info-row"><span class="label">Package:</span> <span>${installation.package}</span></div>
            <div class="info-row"><span class="label">Installation Date:</span> <span>${this.formatDate(installation.installation_date)}</span></div>
            <div class="info-row"><span class="label">Payment Period:</span> <span>${installation.payment_period}</span></div>
            <div class="info-row"><span class="label">Deposit Payment:</span> <span>${installation.deposit_payment}</span></div>
          </div>
          
          <div class="section">
            <div class="section-title">Status & Timeline</div>
            <div class="info-row"><span class="label">Status:</span> <span class="status status-${installation.status}">${this.formatStatus(installation.status)}</span></div>
            ${installation.processed_at ? `<div class="info-row"><span class="label">Processed At:</span> <span>${this.formatDateTime(installation.processed_at)}</span></div>` : ''}
            <div class="info-row"><span class="label">Created:</span> <span>${this.formatDateTime(installation.created_at)}</span></div>
            <div class="info-row"><span class="label">Updated:</span> <span>${this.formatDateTime(installation.updated_at)}</span></div>
          </div>
          
          ${installation.how_did_you_know ? `
          <div class="section">
            <div class="section-title">How did you know about us</div>
            <p>${installation.how_did_you_know}</p>
          </div>` : ''}
          
          ${installation.comments ? `
          <div class="section">
            <div class="section-title">Comments</div>
            <p>${installation.comments}</p>
          </div>` : ''}
        </body>
        </html>
      `
    },
    
    getStatusBadgeClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-indigo-100 text-indigo-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    
    formatStatus(status) {
      const statusMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
      }
      return statusMap[status] || status
    },
    
    formatDate(date) {
      if (!date) return 'Not set'
      return new Date(date).toLocaleDateString()
    },
    
    formatDateTime(datetime) {
      if (!datetime) return 'Not set'
      return new Date(datetime).toLocaleString()
    }
  }
}
</script>

<style scoped>
.modal-header-color {
  background: linear-gradient(135deg, #005e91 0%, #004469 100%);
}
</style>