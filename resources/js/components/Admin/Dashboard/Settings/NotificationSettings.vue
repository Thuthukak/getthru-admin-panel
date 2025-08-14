<template>
    <form @submit.prevent="submitNotificationSettings">
      <div>
        <label for="email-notifications" class="block text-sm font-medium text-gray-700">Email Notifications</label>
        <input v-model="settings.email" id="email-notifications" type="checkbox" class="mt-1" />
      </div>
  
      <div>
        <label for="sms-notifications" class="block text-sm font-medium text-gray-700">SMS Notifications</label>
        <input v-model="settings.sms" id="sms-notifications" type="checkbox" class="mt-1" />
      </div>
  
      <div class="flex items-center justify-between mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Settings</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          email: false,
          sms: false,
        },
      };
    },
    methods: {
      submitNotificationSettings() {
        // Handle form submission, e.g., update notification preferences
        console.log("Notification settings updated:", this.settings);
      },
    },
  };
  </script>
  