<template>
  <section>
    <div class="text-center">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Profile Picture</h2>
      
      <!-- Current Profile Picture -->
      <div class="relative inline-block mb-4">
        <div class="w-24 h-24 sm:w-32 sm:h-32 rounded overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          <img 
            v-if="profilePicture" 
            :src="profilePicture" 
            alt="Profile Picture"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <svg class="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
        
        <!-- Upload Button Overlay -->
        <button 
          @click="triggerFileInput"
          class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>
      
      <!-- File Input (Hidden) -->
      <input 
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <!-- Upload Progress -->
      <div v-if="isUploading" class="mb-4">
        <div class="bg-gray-200 rounded h-2">
          <div class="bg-blue-600 h-2 rounded transition-all duration-300" :style="{width: uploadProgress + '%'}"></div>
        </div>
        <p class="text-sm text-gray-600 mt-1">Uploading... {{ uploadProgress }}%</p>
      </div>
      
      <!-- Upload Options -->
      <div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <button 
          @click="triggerFileInput"
          :disabled="isUploading"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {{ profilePicture ? 'Change Picture' : 'Upload Picture' }}
        </button>
        
        <button 
          v-if="profilePicture"
          @click="removePicture"
          :disabled="isUploading"
          class="text-red-600 hover:text-red-700 px-4 py-2 text-sm disabled:opacity-50 transition-colors"
        >
          Remove
        </button>
      </div>
      
      <!-- Error Message -->
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      
      <!-- Success Message -->
      <p v-if="successMessage" class="mt-2 text-sm text-green-600">{{ successMessage }}</p>
      
      <p class="text-xs text-gray-500 mt-2">
        JPG, PNG or GIF. Max size 2MB.
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profilePicture: null,
      isUploading: false,
      uploadProgress: 0,
      error: null,
      successMessage: null,
    };
  },
  mounted() {
    this.fetchProfilePicture();
  },
  methods: {
    async fetchProfilePicture() {
      try {
        const response = await axios.get("/api/profile/data");
        this.profilePicture = response.data.profile_picture;
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    },
    
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    async handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validate file
      if (!this.validateFile(file)) return;
      
      // Upload file
      await this.uploadFile(file);
      
      // Reset input
      event.target.value = '';
    },
    
    validateFile(file) {
      this.error = null;
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.error = 'Please select a valid image file (JPG, PNG, or GIF)';
        return false;
      }
      
      // Check file size (2MB)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.error = 'File size must be less than 2MB';
        return false;
      }
      
      return true;
    },
    
    async uploadFile(file) {
      this.isUploading = true;
      this.uploadProgress = 0;
      this.error = null;
      this.successMessage = null;
      
      const formData = new FormData();
      formData.append('profile_picture', file);
      
      try {
        const response = await axios.post('/admin/profile/picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          },
        });
        
        this.profilePicture = response.data.profile_picture;
        this.successMessage = 'Profile picture updated successfully!';
        
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to upload image';
      } finally {
        this.isUploading = false;
        this.uploadProgress = 0;
      }
    },
    
    async removePicture() {
      if (!confirm('Are you sure you want to remove your profile picture?')) return;
      
      try {
        await axios.delete('/admin/profile/picture');
        this.profilePicture = null;
        this.successMessage = 'Profile picture removed successfully!';
        
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to remove image';
      }
    }
  }
};
</script>