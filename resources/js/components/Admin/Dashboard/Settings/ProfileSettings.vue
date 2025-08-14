<template>
    <form @submit.prevent="submitProfileForm">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="form.name" id="name" type="text" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>
  
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="form.email" id="email" type="email" class="mt-1 block w-full border-gray-300 rounded-md" />
      </div>
  
      <div class="flex items-center justify-between mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
        },
      };
    },
    methods: {
      submitProfileForm() {
        // Handle form submission, e.g., call an API to update the user's profile
        console.log("Profile updated:", this.form);
      },
    },
  };
  </script>
  