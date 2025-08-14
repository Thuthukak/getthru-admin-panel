<template>
  <section>
    <header class="mb-4">
      <h2 class="text-lg font-medium text-red-800">Delete Account</h2>
      <p class="mt-1 text-sm text-red-600">
        Once your account is deleted, all of its resources and data will be permanently deleted.
        Before deleting your account, please download any data or information that you wish to retain.
      </p>
    </header>

    <!-- Delete Button -->
    <button 
      @click="openModal" 
      class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
    >
      Delete Account
    </button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.083 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="ml-3 text-lg font-medium text-gray-900">Delete Account</h3>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">
            Are you sure you want to delete your account? This action cannot be undone.
            All of your data will be permanently removed from our servers.
          </p>

          <!-- Password Input -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm with your password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-3 rounded-b-xl flex flex-col-reverse sm:flex-row gap-3">
          <button 
            @click="closeModal" 
            class="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="deleteAccount" 
            :disabled="isDeleting"
            class="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isModalOpen: false,
      password: "",
      errors: {},
      isDeleting: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    
    closeModal() {
      this.isModalOpen = false;
      this.password = "";
      this.errors = {};
      this.isDeleting = false;
    },
    
    async deleteAccount() {
      if (!this.password.trim()) {
        this.errors = { password: ['Password is required'] };
        return;
      }
      
      this.isDeleting = true;
      this.errors = {};
      
      try {
        await axios.delete("/profile", { 
          data: { password: this.password } 
        });
        window.location.href = "/";
      } catch (error) {
        this.errors = error.response?.data?.errors || {};
        this.isDeleting = false;
      }
    },
  },
};
</script>