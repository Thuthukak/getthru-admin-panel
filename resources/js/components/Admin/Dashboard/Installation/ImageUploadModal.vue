<template>
  <div>
    <!-- Modal Overlay -->
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
                    <!-- Debug info -->
                    <div v-if="uploadedImages[imageType.value] && !uploadedImages[imageType.value].preview" class="text-red-500 text-xs">
                      Debug: Preview URL missing - {{ uploadedImages[imageType.value] }}
                    </div>
                    
                    <!-- Image Preview -->
                    <div class="relative group" v-if="uploadedImages[imageType.value] && uploadedImages[imageType.value].preview">
                      <img 
                        :src="uploadedImages[imageType.value].preview" 
                        class="w-full h-40 object-cover rounded-lg shadow-sm bg-white"
                        :alt="imageType.label"
                        @load="console.log('Image loaded successfully')"
                        @error="console.error('Image failed to load:', uploadedImages[imageType.value].preview)"
                        style="display: block; position: relative; z-index: 1;"
                      >
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg pointer-events-none" style="z-index: 2;"></div>
                    </div>
                    
                    <!-- Fallback if preview fails -->
                    <div v-else class="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span class="text-gray-500 text-sm">Preview loading...</span>
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
                      :ref="el => fileInputs[imageType.value] = el"
                      type="file" 
                      class="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
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
      fileInputs: {}, // Store file input refs here
      imageTypes: [
        { 
          value: 'inside', 
          label: 'Inside Setup',
          description: 'Show the setup inside the building'
        },
        { 
          value: 'outside', 
          label: 'Outside Setup',
          description: 'Show the setup outside the building'
        },
        { 
          value: 'cabling', 
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
      // Access the file input element from fileInputs object
      const fileInput = this.fileInputs[imageType]
      if (fileInput && typeof fileInput.click === 'function') {
        fileInput.click()
      } else {
        console.warn(`File input for ${imageType} not found or not accessible`)
      }
    },
    
    handleImageSelect(event, imageType) {
      const file = event.target.files[0]
      if (!file) return
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        this.showError('Please select a valid image file (JPG, PNG, WEBP)')
        return
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showError('File size must be less than 5MB')
        return
      }
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        // Debug: Log the result to see what we're getting
        console.log('File read result:', e.target.result)
        console.log('Image type:', imageType)
        
        // Use Vue.set for better reactivity support (works in both Vue 2 and 3)
        if (this.$set) {
          // Vue 2
          this.$set(this.uploadedImages, imageType, {
            file: file,
            preview: e.target.result
          })
        } else {
          // Vue 3
          this.uploadedImages[imageType] = {
            file: file,
            preview: e.target.result
          }
        }
        
        // Debug: Log the updated uploadedImages
        console.log('Updated uploadedImages:', this.uploadedImages)
        
        // Force reactivity update
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      }
      
      reader.onerror = (error) => {
        console.error('FileReader error:', error)
        this.showError('Failed to read the selected file')
      }
      
      reader.readAsDataURL(file)
      
      // Clear the input value to allow re-selection of the same file
      event.target.value = ''
    },
    
    removeImage(imageType) {
      // Delete the image from uploadedImages
      if (this.$delete) {
        // Vue 2
        this.$delete(this.uploadedImages, imageType)
      } else {
        // Vue 3
        delete this.uploadedImages[imageType]
      }
      
      // Force reactivity update
      this.$nextTick(() => {
        this.$forceUpdate()
      })
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
        
        this.showSuccess('Images uploaded successfully!')
        this.$emit('upload-success', 'Images uploaded successfully!')
        this.closeModal()
        
      } catch (error) {
        console.error('Error uploading images:', error)
        const errorMessage = error.response?.data?.message || 'Failed to upload images'
        this.showError(errorMessage)
        this.$emit('upload-error', errorMessage)
      } finally {
        this.uploading = false
        this.uploadProgress = 0
      }
    },
    
    showSuccess(message) {
      // You can replace this with your preferred notification system
      alert(message)
    },
    
    showError(message) {
      // You can replace this with your preferred notification system
      alert(message)
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

/* Fix for Tailwind classes in Vue SFC */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: rgb(0, 0, 0);
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.z-50 {
  z-index: 50;
}

.p-4 {
  padding: 1rem;
}

.bg-white {
  background-color: rgb(255, 255, 255);
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.max-w-4xl {
  max-width: 56rem;
}

.w-full {
  width: 100%;
}

.max-h-\[90vh\] {
  max-height: 90vh;
}

.overflow-hidden {
  overflow: hidden;
}

.flex-col {
  flex-direction: column;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.justify-between {
  justify-content: space-between;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.text-black {
  color: rgb(0, 0, 0);
}

.hover\:text-gray-200:hover {
  color: rgb(229, 231, 235);
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.overflow-y-auto {
  overflow-y: auto;
}

.flex-1 {
  flex: 1 1 0%;
}

.bg-blue-50 {
  background-color: rgb(239, 246, 255);
}

.border {
  border-width: 1px;
}

.border-blue-200 {
  border-color: rgb(191, 219, 254);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.items-start {
  align-items: flex-start;
}

.mr-3 {
  margin-right: 0.75rem;
}

.mt-0\.5 {
  margin-top: 0.125rem;
}

.text-blue-600 {
  color: rgb(37, 99, 235);
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.text-blue-800 {
  color: rgb(30, 64, 175);
}

.font-medium {
  font-weight: 500;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.grid {
  display: grid;
}

.gap-6 {
  gap: 1.5rem;
}

.bg-gray-50 {
  background-color: rgb(249, 250, 251);
}

.border-2 {
  border-width: 2px;
}

.border-dashed {
  border-style: dashed;
}

.border-gray-200 {
  border-color: rgb(229, 231, 235);
}

.hover\:border-gray-300:hover {
  border-color: rgb(209, 213, 219);
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-800 {
  color: rgb(31, 41, 55);
}

.text-gray-500 {
  color: rgb(107, 114, 128);
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.relative {
  position: relative;
}

.group:hover .group-hover\:bg-opacity-20 {
  background-color: rgba(0, 0, 0, 0.2);
}

.h-40 {
  height: 10rem;
}

.object-cover {
  object-fit: cover;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.absolute {
  position: absolute;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.bg-red-100 {
  background-color: rgb(254, 226, 226);
}

.hover\:bg-red-200:hover {
  background-color: rgb(254, 202, 202);
}

.text-red-700 {
  color: rgb(185, 28, 28);
}

.mr-2 {
  margin-right: 0.5rem;
}

.bg-gray-100 {
  background-color: rgb(243, 244, 246);
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:bg-gray-200:hover {
  background-color: rgb(229, 231, 235);
}

.text-gray-400 {
  color: rgb(156, 163, 175);
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.hidden {
  display: none;
}

.bg-blue-600 {
  background-color: rgb(37, 99, 235);
}

.hover\:bg-blue-700:hover {
  background-color: rgb(29, 78, 216);
}

.text-white {
  color: rgb(255, 255, 255);
}

.bg-gray-200 {
  background-color: rgb(229, 231, 235);
}

.rounded-full {
  border-radius: 9999px;
}

.h-2 {
  height: 0.5rem;
}

.duration-300 {
  transition-duration: 300ms;
}

.-space-x-1 > * + * {
  margin-left: -0.25rem;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.border-white {
  border-color: rgb(255, 255, 255);
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.bg-green-500 {
  background-color: rgb(34, 197, 94);
}

.bg-gray-300 {
  background-color: rgb(209, 213, 219);
}

.text-gray-600 {
  color: rgb(75, 85, 99);
}

.ml-4 {
  margin-left: 1rem;
}

.text-gray-900 {
  color: rgb(17, 24, 39);
}

.text-green-600 {
  color: rgb(22, 163, 74);
}

.mr-1 {
  margin-right: 0.25rem;
}

.border-t {
  border-top-width: 1px;
}

.bg-gray-600 {
  background-color: rgb(75, 85, 99);
}

.hover\:bg-gray-700:hover {
  background-color: rgb(55, 65, 81);
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.disabled\:bg-gray-400:disabled {
  background-color: rgb(156, 163, 175);
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.inline-block {
  display: inline-block;
}

.w-4 {
  width: 1rem;
}

.h-4 {
  height: 1rem;
}

.border-t-transparent {
  border-top-color: transparent;
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>