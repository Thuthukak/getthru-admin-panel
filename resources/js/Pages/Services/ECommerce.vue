<template>
    <navbar :seo="seo"/>
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
      <meta property="og:type" :content="seo.og_type" />
      <meta property="og:site_name" :content="seo.og_site_name" />
      
      <!-- Twitter Card -->
      <meta name="twitter:card" :content="seo.twitter_card" />
      <meta name="twitter:title" :content="seo.og_title" />
      <meta name="twitter:description" :content="seo.og_description" />
      <meta name="twitter:image" :content="seo.og_image" />
      
      <!-- Additional SEO -->
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0d6efd" />

    </Head>

    <!-- banner -->
    <section id="apply" class="cta">
      <div class="container px-5" data-aos="zoom-in">
        <div class="text-center text-white">
          <h1 class="fw-bold">E-Commerce Solutions</h1>
          <p>We build powerful, user-friendly online stores designed to convert. From sleek product pages to secure checkout experiences, our solutions help you grow, scale, and succeed in the digital marketplace.</p>
        </div>
      </div>
    </section>

    <section>
      <div class="container mt-5 my-5 py-5 px-4">
        <div class="row">
            <div class="col-md-5">
            <img 
                :src="seo.sec_img" 
                alt="Web design" 
                class="shadow-lg rounded align-self-center"
                loading="lazy"
                style="width:500px; height:400px; object-fit: cover;"  />
          </div>
          <div class="col-md-7 align-self-center">
            <h2 class="fw-bold mb-3">Sell Smarter, Not Harder</h2>
            <p>We design and develop e-commerce platforms that do more than look good — they perform. Whether you're launching a new store or upgrading an existing one, we focus on intuitive navigation, mobile responsiveness, and seamless checkout experiences that turn visitors into loyal customers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 banner-image">
  <div class="container px-4">
    <div class="row">
      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
            <div class="icon-circle">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <div>
                <h3 class="fw-bold mb-1">Seamless Shopping</h3>
                <p class="mb-0">We create intuitive storefronts that make browsing and buying effortless for your customers.</p>
            </div>
            </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div class="icon-circle">
            <i class="fas fa-lock"></i>
        </div>
        <div>
            <h3 class="fw-bold mb-1">Secure Checkout</h3>
            <p class="mb-0">Our checkout systems are built for trust, with safe payment gateways and customer data protection.</p>
        </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div class="icon-circle">
            <i class="fas fa-chart-line"></i>
        </div>
        <div>
            <h3 class="fw-bold mb-1">Scalable Growth</h3>
            <p class="mb-0">From small shops to enterprise stores, we build e-commerce solutions that grow with your business.</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- case studies -->
    <section>
      <div class="container mt-5 my-5 py-5 px-4">
        <div class="row">
          <div class="col-md-6 align-self-center">
          <div class="mt-5">
            <h1 class="fw-bold mb-3">Case Study</h1>
            <p>Step into the world of KM Collection and witness the evolution of their online presence through our e-commerce solution case study. Tasked with revolutionizing their digital platform, we embarked on a journey to elevate KM Collection’s online shopping experience. Our team meticulously crafted a bespoke e-commerce solution tailored to their unique needs and brand identity. Central to our strategy was the seamless integration of user-friendly navigation, captivating product displays, and secure payment gateways, ensuring a frictionless shopping journey for customers.</p> 
          </div>
          </div>
          <div class="col-md-6">
            <ECommerceCarousel />
          </div>
        </div>
      </div>
    </section>

    
  
    <Footer :seo="seo" />
  </template>
  
  <script setup>
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";
  import ECommerceCarousel from "@/components/Home/Services/ECommerceCarousel.vue";

  const props = defineProps({
    seo: Object,
  })

  </script>

  <style scoped>
  .hero {
  height: 75vh; /* Adjust height as needed */
  overflow: hidden;
  position: relative;
}

.banner-image {
  position: relative;
  background-image: url(/public/assets/images/ecommerce1.jpg);
  background-position:center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-image::before {
  content: ""; /* Required for pseudo-elements */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000009d; /* Your overlay color */
  opacity: 0.8; /* Adjust the opacity as needed */
  z-index: 1;
}
.banner-image > * {
  position: relative;
  z-index: 2;
}

.overlay-content {
  width: 90%;
  max-width: 800px;
  position: relative;
}
.cta {
  background: linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)), url("/public/assets/images/What-is-eCommerce.jpgw3.webp") fixed center center;
    background-size: auto, auto;
  background-size: cover;
  padding: 120px 0;
}

.icon-box {
  background: transparent;
  border-radius: 12px;
  padding: 20px;
}

.icon-circle {
  width: 60px;
  height: 60px;
  border: 2px solid #ffffff; /* Yellow ring */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ffffff;
  margin-left: 15px;
  flex-shrink: 0;
}
</style>
  