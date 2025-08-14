<template>
    <Navbar :seo="seo" />
    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
      <meta name="keywords" :content="seo.keywords" />
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" :content="seo.og_type" />
      <meta property="og:url" :content="seo.og_url" />
      <meta property="og:title" :content="seo.og_title" />
      <meta property="og:description" :content="seo.og_description" />
      <meta property="og:image" :content="seo.og_image" />
      <meta property="og:site_name" :content="seo.og_site_name" />
      
      <!-- Twitter -->
      <meta property="twitter:card" :content="seo.twitter_card" />
      <meta property="twitter:url" :content="seo.og_url" />
      <meta property="twitter:title" :content="seo.twitter_title || seo.og_title" />
      <meta property="twitter:description" :content="seo.twitter_description || seo.og_description" />
      <meta property="twitter:image" :content="seo.og_image" />
      
      <!-- Contact-specific meta tags -->
      <meta name="contact:phone" :content="contactInfo?.phone" />
      <meta name="contact:email" :content="contactInfo?.email" />
      <meta name="geo.region" content="ZA-GP" />
      <meta name="geo.placename" content="Kempton Park" />
      <meta name="geo.position" content="-26.052120488886704;28.182524335456343" />
      <meta name="ICBM" content="-26.052120488886704, 28.182524335456343" />
      
      <!-- Canonical URL -->
      <link rel="canonical" :href="seo.canonical_url" />
    </Head>

    <div class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="banner py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl fw-bold font-bold text-white text-center">Contact Us</h1>
          <p class="text-xl text-blue-100 text-center mt-4">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>
  
      <!-- Contact Content -->
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl fw-bold font-semibold text-gray-800 mb-8">Get In Touch</h2>
            
            <div class="space-y-6 mt-4">
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-800">Phone</h3>
                  <p class="my-blue mt-1"><a href="tel:+27738114652">+27 73 811 4652</a></p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-800">Email</h3>
                  <p class="my-blue mt-1"><a href="mailto:info@pendagraphics.co.za">info@pendagraphics.co.za</a></p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-800">Address</h3>
                  <p class="my-blue mt-1">Birch Acres</p>
                  <p class="my-blue">Kempton Park</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-800">Business Hours</h3>
                  <p class="my-blue mt-1">Monday - Friday: 9am - 5pm</p>
                  <p class="my-blue">Saturday & Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <!-- Social Media Links -->
            <div class="mt-8">
              <h3 class="text-lg font-medium text-gray-800 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="https://web.facebook.com/Penda.graphix" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                  <font-awesome-icon :icon="['fab', 'facebook']" class="text-blue-600" />
                </a>
                <a href="https://www.instagram.com/penda_graphics/" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                  <font-awesome-icon :icon="['fab', 'instagram']" class="text-blue-600" />
                </a>
                <a href="https://www.youtube.com/@PendaGraphics" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                  <font-awesome-icon :icon="['fab', 'youtube']" class="text-blue-600" />
                </a>
                <a href="https://www.tiktok.com/@pendagraphics?_t=ZM-8xCbzWLUJ7Q&_r=1" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                  <font-awesome-icon :icon="['fab', 'tiktok']" class="text-blue-600" />
                </a>
              </div>
            </div>
          </div>
          
        <!-- Contact Form -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold fw-bold text-gray-800 mb-6">Send Us a Message</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6 mt-4">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"
                required
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>
            
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Subject Input -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Web design"
                required
              />
              <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
            </div>
            
            <!-- Message Input -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe your enquiry in detail..."
                required
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>
            
            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded hover:from-blue-700 hover:to-indigo-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </div>
          </form>
          
          <!-- Success Message -->
          <div v-if="submitted" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Thank you for your message! We'll get back to you as soon as possible.
          </div>
        </div>
      </div>

      <!-- Map Section (Optional) -->
      <div class="container mx-auto px-4 py-12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Find Us</h2>
          <!-- Replace with your preferred map integration -->
          <div class="h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            <div class="w-full h-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28675.459433962693!2d28.182524335456343!3d-26.052120488886704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956c9e7dd28a2d%3A0x23a8745861e3d627!2sBirch%20Acres%2C%20Kempton%20Park%2C%201618!5e0!3m2!1sen!2sza!4v1747170368580!5m2!1sen!2sza" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.375rem;"
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :seo="seo" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import Navbar from '@/components/Home/Navbar.vue';
import Footer from '@/components/Home/Footer.vue';
import { onMounted } from 'vue';

const props = defineProps({
  seo: Object,
  structuredData: String,
  contactInfo: Object
});


// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

// Form state
const isSubmitting = ref(false);
const submitted = ref(false);
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});


onMounted(() => {
  if (props.structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = props.structuredData;
    document.head.appendChild(script);
  }
});

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Validate name
  if (!form.value.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(form.value.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate subject
  if (!form.value.subject.trim()) {
    errors.subject = 'Subject is required';
    isValid = false;
  }
  
  // Validate message
  if (!form.value.message.trim()) {
    errors.message = 'Message is required';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const submitForm = async () => {
  // Validate form first
  if (!validateForm()) {
    return;
  }
  
  try {
    isSubmitting.value = true;
    
    const response = await axios.post('/contact-form', form.value);
    
    // Handle successful submission
    if (response.status === 200 || response.status === 201) {
      submitted.value = true;
      
      // Reset form
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Handle API errors
    if (error.response && error.response.data && error.response.data.errors) {
      // Map backend validation errors to form errors
      const backendErrors = error.response.data.errors;
      Object.keys(backendErrors).forEach(key => {
        if (errors[key] !== undefined) {
          errors[key] = backendErrors[key][0];
        }
      });
    } else {
      // Show a generic error to the user (could use a toast notification here)
      alert('An error occurred while submitting the form. Please try again later.');
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

  <style scoped>
  .banner {
  background: linear-gradient(135deg, #005e91 0%, #004469 100%);
  color: white;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
}

.banner::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.my-blue{
  color: #0d6efd;
}
  </style>