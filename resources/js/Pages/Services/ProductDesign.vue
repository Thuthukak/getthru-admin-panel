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
          <h1 class="fw-bold">Product Design</h1>
          <p> we believe in the power of visual storytelling to captivate audiences and leave a lasting impression. Our expert graphic designers specialize in creating eye-catching designs that reflect your brand identity and convey your message with impact.</p>
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
                class="align-self-center"
                loading="lazy"
                style="width:400px; height:400px; object-fit: cover;"  />
          </div>
          <div class="col-md-7 align-self-center">
            <h2 class="fw-bold mb-3">Product Design That Connects</h2>
            <p>We craft visually compelling and functional product designs that captivate your audience and communicate your brand’s identity. From packaging to mockups, every detail is designed to make your product stand out on the shelf and in the digital space.</p>
            <p>Whether you're launching a new product or refreshing an existing one, our design process ensures a perfect balance of creativity, usability, and brand alignment.</p>
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
                <font-awesome-icon icon="lightbulb" />
            </div>
            <div>
                <h3 class="fw-bold mb-1">Innovative Ideas</h3>
                <p class="mb-0">We explore unique design directions that give your product a creative edge.</p>
            </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
            <div class="icon-circle">
                <font-awesome-icon icon="palette" />
            </div>
            <div>
                <h3 class="fw-bold mb-1">Packaging Design</h3>
                <p class="mb-0">Our packaging solutions blend functionality and style to elevate your brand.</p>
            </div>
            </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
            <div class="icon-circle">
                <font-awesome-icon icon="desktop" />
            </div>
            <div>
                <h3 class="fw-bold mb-1">Mockups & Visualization</h3>
                <p class="mb-0">We create realistic product mockups so you can visualize before production.</p>
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
          <div class="col-md-6 ">
          <div class="mt-5">
            <h1 class="fw-bold mb-3">Case Study</h1>
            <h5 class="fw-bold">The Success Story of Maburas Hot Sauce</h5>
            <p>Embark on a fiery journey through our creative collaboration with Mabura Hot Sauce — a bold brand bursting with flavor and attitude. Our mission? To bottle up that intensity in a visual identity that sizzles.</p>
            <p>We kicked things off with a custom-designed logo, blending heat, heritage, and heart into a mark that instantly communicates flavor and fire. Next came a colorful lineup of labels, each one tailored to the unique personality of Mabura’s sauces — from the blazing heat of Habanero to the bright zing of Jalapeño. Every shade, every font, every flame-inspired detail was crafted to stand out on the shelf and ignite curiosity.</p>
            <p>To turn up the heat even more, we designed a bold marketing poster — a visual explosion of spice, flavor, and attitude — to help Mabura command attention both online and on the streets.</p>
            
          </div>
          </div>
          <div class="col-md-6">
            <ProductDesignCarousel />
          </div>
        </div>
      </div>
    </section>

    
  
    <Footer :seo="seo" />
  </template>
  
  <script setup>
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";
  import ProductDesignCarousel from "@/components/Home/Services/ProductDesignCarousel.vue";

  const props = defineProps({
    seo: Object,
  });

  </script>

  <style scoped>
  .hero {
  height: 75vh; /* Adjust height as needed */
  overflow: hidden;
  position: relative;
}

.banner-image {
  position: relative;
  background-image: url(/public/assets/images/product_design_overlay.jpeg);
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
  background-color: #01213b; /* Your overlay color */
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
  background: linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)), url("/public/assets/images/Product-concept-sketches.jpg") fixed center center;
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
  