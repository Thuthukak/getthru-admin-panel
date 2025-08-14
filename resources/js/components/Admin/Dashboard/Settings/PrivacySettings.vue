<template>
    <form @submit.prevent="submitPrivacySettings">
      <div>
        <label for="profile-visibility" class="block text-sm font-medium text-gray-700">Profile Visibility</label>
        <select v-model="settings.visibility" id="profile-visibility" class="mt-1 block w-full border-gray-300 rounded-md">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
  
      <div>
        <label for="search-engine" class="block text-sm font-medium text-gray-700">Allow Search Engines</label>
        <input v-model="settings.searchEngine" id="search-engine" type="checkbox" class="mt-1" />
      </div>
  
      <div class="flex items-center justify-between mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Privacy Settings</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          visibility: 'public',
          searchEngine: false,
        },
      };
    },
    methods: {
      submitPrivacySettings() {
        // Handle form submission, e.g., update privacy settings
        console.log("Privacy settings updated:", this.settings);
      },
    },
  };
  </script>
  