<template>
  <div>
    <!-- Teleport Modal to body -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <!-- Modal Content -->
        <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="modal-header-color text-black px-6 py-4 flex justify-between items-center">
            <h3 class="text-xl font-bold">
              Upload Installation Images - {{ installation?.name }} {{ installation?.surname }}
            </h3>
            <button @click="closeModal" class="text-black hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto flex-1">
            <!-- Info Alert -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 mt-0.5 text-blue-600 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <div class="text-blue-800">
                <p class="font-medium">Installation Image Requirements</p>
                <p class="text-sm mt-1">Please upload 3 images as proof of installation completion. Accepted formats: JPG, PNG, WEBP (max 5MB each)</p>
              </div>
            </div>
            
            <!-- Image Upload Grid -->
            <div class="grid md:grid-cols-3 gap-6 mb-6">
              <div v-for="(imageType, index) in imageTypes" :key="imageType.value" class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                <div class="p-4">
                  <div class="text-center mb-4">
                    <h4 class="font-semibold text-gray-800">{{ imageType.label }}</h4>
                    <p class="text-sm text-gray-500 mt-1">{{ imageType.description }}</p>
                  </div>
                  
                  <div class="text-center">
                    <div v-if="uploadedImages[imageType.value]" class="space-y-4">
                      <!-- Image Preview -->
                      <div class="relative group">
                        <img 
                          :src="uploadedImages[imageType.value].preview" 
                          class="w-full h-40 object-cover rounded-lg shadow-sm"
                          :alt="imageType.label"
                        >
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                      </div>
                      
                      <!-- Remove Button -->
                      <button 
                        @click="removeImage(imageType.value)"
                        class="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                          <path d="M3 6h18"/>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <path d="m10 12 4 4"/>
                          <path d="m14 12-4 4"/>
                        </svg>
                        Remove Image
                      </button>
                    </div>
                    
                    <div v-else class="space-y-4">
                      <!-- Upload Placeholder -->
                      <div 
                        class="h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                        @click="triggerFileInput(imageType.value)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 mb-2">
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                          <circle cx="12" cy="13" r="3"/>
                        </svg>
                        <p class="text-sm text-gray-500">Click to upload</p>
                      </div>
                      
                      <!-- Hidden File Input -->
                      <input 
                        :ref="`fileInput_${imageType.value}`"
                        type="file" 
                        class="hidden"
                        accept="image/*"
                        @change="handleImageSelect($event, imageType.value)"
                      >
                      
                      <!-- Upload Button -->
                      <button 
                        @click="triggerFileInput(imageType.value)"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Choose Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Upload Progress -->
            <div v-if="uploadProgress > 0" class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Upload Progress</span>
                <span class="text-sm text-gray-500">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- Upload Summary -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex -space-x-1">
                    <div 
                      v-for="(imageType, index) in imageTypes" 
                      :key="imageType.value"
                      class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium"
                      :class="uploadedImages[imageType.value] ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">
                      {{ Object.keys(uploadedImages).length }} of 3 images selected
                    </p>
                    <p class="text-xs text-gray-500">All images are required before upload</p>
                  </div>
                </div>
                
                <div v-if="Object.keys(uploadedImages).length === 3" class="flex items-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <path d="M9 11l3 3 8-8"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.34 0 2.6.3 3.73.83"/>
                  </svg>
                  <span class="text-sm font-medium">Ready to upload</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t bg-gray-50 flex justify-between">
            <button 
              @click="closeModal"
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            <button 
              @click="uploadImages" 
              :disabled="!canUploadImages || uploading"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              <span v-if="uploading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              {{ uploading ? 'Uploading...' : 'Upload Images' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImageUploadModal',
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
  emits: ['close', 'upload-success', 'upload-error'],
  data() {
    return {
      uploadedImages: {},
      uploading: false,
      uploadProgress: 0,
      imageTypes: [
        { 
          value: 'before', 
          label: 'Inside Setup',
          description: 'Show the setup inside the building'
        },
        { 
          value: 'during', 
          label: 'Outside Setup',
          description: 'Show the setup outside the building'
        },
        { 
          value: 'after', 
          label: 'Cabling',
          description: 'Show the cabling setup'
        }
      ]
    }
  },
  computed: {
    canUploadImages() {
      return Object.keys(this.uploadedImages).length === 3
    }
  },
  watch: {
    isOpen(newValue) {
      if (!newValue) {
        // Reset state when modal is closed
        this.resetModal()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    resetModal() {
      this.uploadedImages = {}
      this.uploadProgress = 0
      this.uploading = false
    },
    
    triggerFileInput(imageType) {
      this.$refs[`fileInput_${imageType}`][0].click()
    },
    
    handleImageSelect(event, imageType) {
      const file = event.target.files[0]
      if (!file) return
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        this.$emit('upload-error', 'Please select a valid image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        this.$emit('upload-error', 'File size must be less than 5MB')
        return
      }
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$set(this.uploadedImages, imageType, {
          file: file,
          preview: e.target.result
        })
      }
      reader.readAsDataURL(file)
      
      // Clear the input value to allow re-selection of the same file
      event.target.value = ''
    },
    
    removeImage(imageType) {
      this.$delete(this.uploadedImages, imageType)
    },
    
    async uploadImages() {
      if (!this.canUploadImages || !this.installation) return
      
      this.uploading = true
      this.uploadProgress = 0
      
      try {
        const formData = new FormData()
        
        // Add files to form data
        Object.keys(this.uploadedImages).forEach(imageType => {
          formData.append(`images[${imageType}]`, this.uploadedImages[imageType].file)
        })
        
        const response = await axios.post(
          `/api/installations/${this.installation.id}/images`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }
          }
        )
        
        this.$emit('upload-success', 'Images uploaded successfully!')
        this.closeModal()
        
      } catch (error) {
        console.error('Error uploading images:', error)
        this.$emit('upload-error', error.response?.data?.message || 'Failed to upload images')
      } finally {
        this.uploading = false
        this.uploadProgress = 0
      }
    }
  }
}
</script>

<style scoped>
.modal-header-color {
  background: rgb(245, 245, 245);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>