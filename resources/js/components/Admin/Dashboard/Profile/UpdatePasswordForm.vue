<template>
  <section>
    <header class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">Update Password</h2>
      <p class="mt-1 text-sm text-gray-600">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <form @submit.prevent="updatePassword" class="space-y-4">
      <div>
        <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
        <input
          id="current_password"
          type="password"
          v-model="form.current_password"
          autocomplete="current-password"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <p v-if="errors.current_password" class="mt-1 text-sm text-red-600">{{ errors.current_password }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            id="password_confirmation"
            type="password"
            v-model="form.password_confirmation"
            autocomplete="new-password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-600">{{ errors.password_confirmation }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Updating...' : 'Update Password' }}
        </button>

        <div v-if="status === 'password-updated'" class="flex items-center text-green-600">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm">Password updated successfully!</span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      status: "",
      isLoading: false,
    };
  },
  methods: {
    async updatePassword() {
      this.isLoading = true;
      this.errors = {};
      this.status = "";
      
      try {
        await axios.put("/api/user/password", this.form);
        this.status = "password-updated";
        this.form.current_password = "";
        this.form.password = "";
        this.form.password_confirmation = "";
        setTimeout(() => (this.status = ""), 3000);
      } catch (error) {
        this.errors = error.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>