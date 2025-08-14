<template>
  <div class="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p class="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      <!-- Profile Picture & Basic Info -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProfilePictureUpload />
      </div>

      <!-- Profile Information Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <UpdateProfileForm />
      </div>

      <!-- Password Update Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <UpdatePasswordForm />
      </div>

      <!-- Danger Zone -->
      <div class="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <div class="border-l-4 border-red-400 pl-4 mb-4">
          <h3 class="text-lg font-medium text-red-800">Danger Zone</h3>
          <p class="text-sm text-red-600">Irreversible and destructive actions</p>
        </div>
        <DeleteUserForm />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePictureUpload from "@/components/Admin/Dashboard/Profile/ProfilePictureUpload.vue";
import UpdateProfileForm from "@/components/Admin/Dashboard/Profile/UpdateProfileForm.vue";
import UpdatePasswordForm from "@/components/Admin/Dashboard/Profile/UpdatePasswordForm.vue";
import DeleteUserForm from "@/components/Admin/Dashboard/Profile/DeleteUserForm.vue";

export default {
  components: {
    ProfilePictureUpload,
    UpdateProfileForm,
    UpdatePasswordForm,
    DeleteUserForm,
  },
};
</script>