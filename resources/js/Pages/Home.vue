<template>
  <Layout :seo="seo">
    <Head>
      <title>{{ seo.title }}</title>
      <meta name="description" :content="seo.description" />
      <meta name="keywords" :content="seo.keywords" />
      <link rel="canonical" :href="seo.canonical_url" />
      
      <!-- Open Graph -->
      <meta property="og:title" :content="seo.og_title" />
      <meta property="og:description" :content="seo.og_description" />
      <meta property="og:image" :content="seo.og_image" />
      <meta property="og:url" :content="seo.og_url" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Penda Graphics" />
      
      <!-- Twitter Card -->
      <meta name="twitter:card" :content="seo.twitter_card" />
      <meta name="twitter:title" :content="seo.og_title" />
      <meta name="twitter:description" :content="seo.og_description" />
      <meta name="twitter:image" :content="seo.og_image" />
      
      <!-- Additional SEO -->
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0d6efd" />
      
      <!-- Structured Data will be added via JavaScript -->
    </Head>

    <!-- Hero Section -->
    <section class="about py-5 bg-light bg-md-white">
      <div class="container px-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="content">
              <h1 class="fw-bold">Empowering Your Brand with Stunning Designs & Websites</h1>
              <p class="mt-4 text-secondary">
                We are a team of passionate designers and developers dedicated to creating exceptional digital experiences for our clients.
              </p>
              <button @click.prevent="openQuoteModal" class="btn btn-primary rounded">Get A Quote</button>   
            </div>
          </div>
          <!-- Hero images - Server-side rendered, no lazy loading for above-the-fold content -->
          <div class="col-md-6 d-none d-md-block">
            <div class="row">
              <div class="col-md-6">
                <div class="card border-0 shadow rounded mt-5">                 
                  <img 
                    :src="heroImages.left" 
                    alt="Professional web design showcase - Modern website interface" 
                    class="w-100 rounded" 
                    style="height: 400px; object-fit: cover;"
                    width="300"
                    height="400"
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card border-0 shadow">
                      <img 
                        :src="heroImages.top" 
                        alt="Creative graphic design portfolio - Brand identity showcase" 
                        class="w-100 rounded" 
                        style="height: 200px; object-fit: cover;"
                        width="300"
                        height="200"
                      >
                    </div>
                  </div>
                  <div class="col-md-12 mt-4">
                    <div class="card border-0 shadow">
                      <img 
                        :src="heroImages.right" 
                        alt="Digital marketing success - Analytics and growth visualization" 
                        class="w-100 rounded" 
                        style="height: 200px; object-fit: cover;"
                        width="300"
                        height="200"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Featured Services -->
    <section class="py-5">
      <div class="container px-4">
        <h2 class="fw-bold mb-4 text-center">Our Featured Services</h2>
        <div class="row">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="col-md-4 col-sm-6 mb-4"
          >
            <article class="card p-3 service-card border-0">
              <div class="d-flex align-items-center mb-2">
                <img 
                  :src="service.icon" 
                  :alt="`${service.title} service icon`" 
                  style="height: 50px; width: 50px; object-fit: cover;" 
                  class="me-3"
                  loading="lazy"
                  width="50"
                  height="50"
                >
                <h3 class="card-title mb-0 h4">
                  <a :href="service.url" class="text-decoration-none">{{ service.title }}</a>
                </h3>
              </div>
              <p>{{ service.description }}</p>
              <a :href="service.url" class="btn btn-primary mt-2">Discover More</a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" aria-labelledby="portfolio-heading">
      <div class="container">
        <Portfolio />
      </div>
    </section>

    <!-- About -->
    <section aria-labelledby="about-heading">
      <div class="container mt-4">
        <About
          :aboutImage="aboutImage"
           />
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-5 text-center bg-dark text-white" aria-labelledby="contact-heading">
      <div class="container px-4">
        <div class="row">
          <div class="col-md-6">
            <h2 id="contact-heading" class="fw-bold text-left">Let's work together</h2>
            <p class="text-left">
              We're excited to hear about your vision and explore how we can bring it to life. Whether you're looking to build a modern website, create a strong visual identity, or launch a compelling marketing campaign — we're here to help.  
            </p>
            <p class="text-left">
              Fill out the form with your project details, goals, and any specific requirements you have in mind. One of our team members will review your message and get back to you promptly to discuss the next steps.  
            </p>
            <p class="text-left">
              Let's turn your ideas into powerful digital experiences — together.
            </p>
          </div>
          <div class="col-md-6">
            <form @submit.prevent="submitForm" class="p-4 shadow rounded bg-white" novalidate>
              <div class="mb-3">
                <label for="name" class="visually-hidden">Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="form.name"
                  class="form-control"
                  placeholder="Enter your name"
                  required
                  aria-required="true"
                />
              </div>

              <div class="mb-3">
                <label for="email" class="visually-hidden">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                />
              </div>

              <div class="mb-3">
                <label for="subject" class="visually-hidden">Subject</label>
                <input 
                  id="subject"
                  type="text" 
                  v-model="form.subject" 
                  class="form-control"
                  placeholder="Subject"
                  required
                  aria-required="true"
                />
              </div>

              <div class="mb-3">
                <label for="message" class="visually-hidden">Message</label>
                <textarea
                  id="message"
                  class="form-control"
                  v-model="form.message"
                  rows="4"
                  placeholder="Enter your message"
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <div class="text-end">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
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
      </div>
    </section>
  </Layout>
  
  <EstimateModal :isOpen="isModalOpen" @close="closeQuoteModal" />
</template>

<script setup>
import { Head } from '@inertiajs/vue3'
import Layout from "../Layouts/HomeLayout.vue";
import Portfolio from "@/components/Home/Portfolio.vue";
import About from "@/components/Home/About.vue";
import EstimateModal from "@/components/Home/EstimateModal.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

// Props from server
const props = defineProps({
  heroImages: Object,
  aboutImage: String,
  services: Array,
  seo: Object,
  structuredData: String,
});

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isModalOpen = ref(false);
const isSubmitting = ref(false);
const submitted = ref(false);

// Add structured data to head on component mount
onMounted(() => {
  if (props.structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = props.structuredData;
    document.head.appendChild(script);
  }
});


const submitForm = async () => {
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  
  try {
    const response = await axios.post('/contact-form', form.value);
    console.log(response.data);

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
    
    // You might want to show a success message here
    alert('Thank you! Your message has been sent successfully.');
    
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Sorry, there was an error sending your message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

const openQuoteModal = () => {
  isModalOpen.value = true;
};

const closeQuoteModal = () => {
  isModalOpen.value = false;
}
</script>

<style scoped>
.service-card:hover {
  box-shadow: 0 0 10px rgba(48, 48, 48, 0.3);
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Improve accessibility */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>