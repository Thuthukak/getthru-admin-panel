<template>
  <section>
    <header class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
      <p class="mt-1 text-sm text-gray-600">
        Update your account's profile information.
      </p>
    </header>

    <!-- Email Verification Form (Hidden) -->
    <form id="send-verification" @submit.prevent="sendVerificationEmail"></form>

    <!-- Profile Update Form -->
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            required
            autofocus
            autocomplete="name"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            readonly
            autocomplete="username"
            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded transition-colors"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Email Verification Notice -->
      <div v-if="mustVerifyEmail && !emailVerified" class="bg-yellow-50 border border-yellow-200 rounded p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-800">
              Your email address is unverified.
              <button
                form="send-verification"
                class="font-medium underline hover:no-underline"
              >
                Click here to re-send the verification email.
              </button>
            </p>
            <p v-if="status === 'verification-link-sent'" class="mt-2 text-sm text-green-700 font-medium">
              A new verification link has been sent to your email address.
            </p>
          </div>
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
          {{ isLoading ? 'Saving...' : 'Save Changes' }}
        </button>

        <div v-if="status === 'profile-updated'" class="flex items-center text-green-600">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm">Saved successfully!</span>
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
        name: "",
        email: "",
      },
      mustVerifyEmail: false,
      emailVerified: true,
      errors: {},
      status: "",
      isLoading: false,
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get("/api/profile/data");
        this.form.name = response.data.name;
        this.form.email = response.data.email;
        this.mustVerifyEmail = response.data.must_verify_email;
        this.emailVerified = response.data.email_verified;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    
    async updateProfile() {
      this.isLoading = true;
      this.errors = {};
      this.status = "";
      
      try {
        await axios.patch("admin/profile", this.form);
        this.status = "profile-updated";
        setTimeout(() => (this.status = ""), 3000);
      } catch (error) {
        this.errors = error.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    },
    
    async sendVerificationEmail() {
      try {
        await axios.post("/email/verification-notification");
        this.status = "verification-link-sent";
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    },
  },
};
</script>