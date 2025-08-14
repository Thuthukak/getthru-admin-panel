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
      <div class="container" data-aos="zoom-in">
        <div class="text-center text-white">
          <h1 class="fw-bold">Website Design</h1>
          <p> At Penda Graphics, our web design services combine creativity and functionality to give your brand an unforgettable digital presence</p>
        </div>
      </div>
    </section>

    <section>
      <div class="container mt-5 my-5 py-5 px-4">
        <div class="row">
          <div class="col-md-6">
            <img 
                :src="seo.sec_img"
                alt="Web design" 
                class="rounded-lg shadow-md"
                loading="lazy"
                style="width:500px; height:400px; object-fit: cover;"  />
          </div>
          <div class="col-md-6 align-self-center">
            <h2 class="fw-bold ">Websites That Work — and Wow</h2>
            <p>We design custom websites that blend beauty with functionality. Whether you need a sleek portfolio, a lead-generating landing page, or a powerful business site, our designs are fast, responsive, and built to impress — on any device.</p>
            <h5>Our website design services include:</h5>
            <ul class="list-disc pl-6 space-y-2 mt-3">
              <li>Custom website design tailored to your brand</li>
              <li>Responsive, mobile-friendly layouts</li>
              <li>SEO-optimized structure</li>
              <li>Modern UI/UX design practices</li>
              <li>Fast loading times and performance optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 banner-image">
      <div class="container px-4">
            <div class="row">
              <div class="col-md-4 col-sm-6 mt-4 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">Modern & Clean</h4>
                    <p>At Website Design Solutions, we craft websites using cutting-edge trends and technologies to meet the demands of today’s digital landscape.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 mt-4 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">Easy to use</h4>
                    <p>User Experience (UX) has emerged as a critical aspect in website design, influencing how visitors interact, comprehend, and engage with your company’s online presence.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 mt-4 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">Responsive Design</h4>
                    <p>A responsive website dynamically adjusts its layout and features to suit the screen size and browser specifications, ensuring optimal functionality and preserving its visual appeal across various devices.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">Quick Turnaround Time</h4>
                    <p>We utilize cutting-edge technology tools to expedite the development process, enabling us to meet our clients’ deadlines efficiently and effectively.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">SEO Friendly</h4>
                    <p>We strategically position your brand across various platforms, ensuring it stands out and outperforms your competitors.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 mb-4">
                <div class="p-3 border-0">
                  <div class="align-items-center mb-2 text-white">
                    <h4 class="fw-bold">Tech Support</h4>
                    <p>Quick technical support to enure the smooth running of you website and respond to enquiries on content changes.</p>
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
            <h1 class="fw-bold ">Case Studies</h1>
            <p>Dive into our collection of captivating web design case studies, showcasing our expertise in crafting exceptional online experiences for a diverse range of clients. From startups to established brands, our portfolio highlights our ability to blend creativity with functionality, resulting in websites that not only engage users but also drive tangible results.
            </p>
        </div>
          <div class="col-md-6">
            <WebDesignCarousel />
          </div>
        </div>
      </div>
    </section>

    
  
    <Footer :seo="seo" />
  </template>
  
  <script setup>
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";
  import WebDesignCarousel from "@/components/Home/Services/WebDesignCarousel.vue";
  
  const props = defineProps({
    seo: Object,
  });
  
  import { Head } from "@inertiajs/vue3";

  </script>

  <style scoped>
  .hero {
  height: 75vh; /* Adjust height as needed */
  overflow: hidden;
  position: relative;
}

.banner-image {
  position: relative;
  background-image: url(/public/assets/images/360_F_75270.jpg);
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
  background-color: #030303bd; /* Your overlay color */
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
  background: linear-gradient(rgba(2, 2, 2, 0.75), rgba(0, 0, 0, 0.75)), url("/public/assets/images/what-is-web-design-infographic.jpg") fixed center center;
    background-size: auto, auto;
  background-size: cover;
  padding: 120px 0;
}
</style>
  