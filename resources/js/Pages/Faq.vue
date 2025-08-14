<template>
  <Head>
    <!-- Basic Meta Tags -->
    <title>{{ seo.title }}</title>
    <meta name="description" :content="seo.description" />
    <meta name="keywords" :content="seo.keywords" />
    <meta name="author" content="Penda Graphics" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Canonical URL -->
    <link rel="canonical" :href="seo.canonical_url" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" :content="seo.og_title" />
    <meta property="og:description" :content="seo.og_description" />
    <meta property="og:image" :content="seo.og_image" />
    <meta property="og:url" :content="seo.og_url" />
    <meta property="og:type" :content="seo.og_type" />
    <meta property="og:site_name" :content="seo.og_site_name" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" :content="seo.twitter_card" />
    <meta name="twitter:title" :content="seo.og_title" />
    <meta name="twitter:description" :content="seo.og_description" />
    <meta name="twitter:image" :content="seo.og_image" />
    
    <!-- Additional SEO Tags -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="language" content="en-US" />
    <meta name="geo.region" content="ZA" />
    <meta name="geo.country" content="South Africa" />
    <meta name="geo.placename" content="Johannesburg, Gauteng" />
    
    <!-- Structured Data from onMount -->
  </Head>
  
  <Layout :seo="seo">
    <!-- Hero Section -->
    <section id="apply" class="cta">
      <div class="container" data-aos="zoom-in">
        <div class="text-center text-white">
          <h1 class="fw-bold">Frequently Asked Questions</h1>
          <p class="mt-3 fs-5">Get answers to common questions about our web design, branding, and digital marketing services</p>
        </div>
      </div>
    </section>
    
    <!-- FAQ Content -->
    <section class="banner-image">
      <div class="container mt-5 my-5 py-5 px-4">
        <!-- Breadcrumb for SEO -->
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">FAQ</li>
          </ol>
        </nav>
        
        <!-- Introduction Text for SEO -->
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8">
            <div class="text-center mb-4">
              <h2 class="h3 mb-3">Common Questions About Our Design Services</h2>
              <p class="text-muted">
                We've compiled answers to the most frequently asked questions about our web design, 
                graphic design, branding, e-commerce, and digital marketing services in South Africa.
              </p>
            </div>
          </div>
        </div>
        
        <FaqComponent />
        
        <!-- Call to Action -->
        <div class="mb-5 mt-5 px-4">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="text-center bg-light rounded p-4">
                <h3 class="h4 mb-3">Still Have Questions?</h3>
                <p class="text-muted mb-3">
                  If you can't find the answer you're looking for, our team is ready to help you with personalized advice.
                </p>
                <div class="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                  <h5 class="mb-0 fw-bold">Can't find what you're looking for?</h5>
                  <a href="/contact-us" class="btn btn-primary">Contact Us Today</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layouts/HomeLayout.vue";
import FaqComponent from "@/components/Home/FaqComponent.vue";
import { onMounted } from "vue";

const props = defineProps({
  seo: Object,
  structuredData: String
});

onMounted(() => {
  if (props.structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = props.structuredData;
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
.cta {
  background: linear-gradient(rgba(2, 2, 2, 0.65), rgba(0, 0, 0, 0.65)), url("/public/assets/images/blue-question.webp") fixed center center;
  background-size: cover;
  padding: 120px 0;
}

.banner-image {
  position: relative;
  background-image: url(/public/assets/images/faq-BG.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.banner-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 91, 91, 0.05);
  z-index: 1;
}

.banner-image > * {
  position: relative;
  z-index: 2;
}

.breadcrumb {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.breadcrumb-item a {
  color: #0d5b5b;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}
</style>