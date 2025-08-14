<template>
    <Layout :seo="seo">
      <div class="container-fluid p-0">
        <div class="row min-vh-100 m-0">
          <!-- Hero Image (8 columns) -->
          <div class="col-md-8 d-none d-md-block p-0">
            <img 
            :src="seo.hero_image" 
            alt="Hero Image" 
            class="w-100 min-vh-100 object-fit-cover">
          </div>
  
          <!-- Auth Form (4 columns) -->
          <div class="col-md-4 d-flex align-items-center justify-content-center p-0">
            <div class="w-100 bg-white p-4">
              <h2 class="text-center fw-bold mb-3">
                {{ isLogin ? "Admin Login" : "Register as Admin" }}
              </h2>
  
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model="form.email" type="email" class="form-control">
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control">
                </div>

                <div v-if="!isLogin" class="mb-3">
                <label class="form-label">Confirm Password</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control">
                </div>
                              <!-- Forgot Password (Only in login mode) -->
                <div v-if="isLogin" class="mb-3 text-end">
                  <a href="forgot-password" class="text-decoration-none text-primary">Forgot Password?</a>
                </div>
  
                <!-- Extra fields for registration -->
                <div v-if="!isLogin" class="mb-3">
                  <label class="form-label">Full Name</label>
                  <input v-model="form.name" type="text" class="form-control">
                </div>
  
                <div v-if="!isLogin" class="mb-3">
                  <label class="form-label">Phone Number</label>
                  <input v-model="form.phone" type="text" class="form-control">
                </div>
  
                <button type="submit" class="btn btn-primary w-100">
                  {{ isLogin ? "Login" : "Register" }}
                </button>
              </form>
  
              <div class="text-center mt-3">
                <p @click="toggleForm" class="text-primary" style="cursor: pointer;">
                  {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Login" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </template>
  
  <script>
  import Layout from "../Layouts/HomeLayout.vue";
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    components: {
      Layout,
    },
    props: {
      seo: Object,
    },
    setup() {
      const isLogin = ref(true);
      const form = ref({
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        phone: ""
      });
  
      const toggleForm = () => {
        isLogin.value = !isLogin.value;
      };
  
      const handleSubmit = async () => {
          try {
              const endpoint = isLogin.value ? "/login" : "/register";
              const response = await axios.post(endpoint, form.value);
              
              console.log(response.data);

              // Redirect to the appropriate page after login/register
              if (isLogin.value) {
                  window.location.href = "/admin/dashboard"; // Ensure Laravel loads the correct Blade template
              } else {
                  window.location.href = "/admin/dashboard"; // Adjust this based on your registration flow
              }
          } catch (error) {
              console.error("Error:", error);
          }
      };

  
      return {
        isLogin,
        form,
        toggleForm,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  /* Remove spacing between navbar/footer and content */
  .container-fluid {
    height: 100vh;
    overflow: hidden;
  }
  
  .row {
    min-height: 100vh;
  }
  
  .col-md-8 img {
    height: 100vh;
    object-fit: cover;
  }
  
  /* Adjust form width on smaller screens */
  @media (max-width: 768px) {
    .w-75 {
      width: 100% !important;
    }
  }
  </style>
  