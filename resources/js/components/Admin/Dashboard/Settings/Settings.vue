<template>
    <div class="space-y-6">
      <!-- Profile Settings Section -->
      <section>
        <header>
          <h2 class="text-lg font-medium text-gray-900">
            Profile Settings
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Update your profile information and preferences.
          </p>
        </header>
  
        <ProfileSettings />
      </section>
  
      <!-- Notification Settings Section -->
      <section>
        <header>
          <h2 class="text-lg font-medium text-gray-900">
            Notification Settings
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Choose how you would like to receive notifications.
          </p>
        </header>
  
        <NotificationSettings />
      </section>
  
      <!-- Privacy Settings Section -->
      <section>
        <header>
          <h2 class="text-lg font-medium text-gray-900">
            Privacy Settings
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Adjust your privacy preferences.
          </p>
        </header>
  
        <PrivacySettings />
      </section>
    </div>
  </template>
  
  <script>
  import ProfileSettings from "@/components/Admin/Dashboard/Settings/ProfileSettings.vue";
  import NotificationSettings from "@/components/Admin/Dashboard/Settings/NotificationSettings.vue";
  import PrivacySettings from "@/components/Admin/Dashboard/Settings/PrivacySettings.vue";
  
  export default {
    name: "SettingsPage",
    components: {
      ProfileSettings,
      NotificationSettings,
      PrivacySettings,
    },
  };
  </script>
  