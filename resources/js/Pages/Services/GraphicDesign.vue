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
          <h1 class="fw-bold">Graphic Design</h1>
          <p> we believe in the power of visual storytelling to captivate audiences and leave a lasting impression. Our expert graphic designers specialize in creating eye-catching designs that reflect your brand identity and convey your message with impact.</p>
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
            <h2 class="fw-bold ">Graphic design process</h2>
            <p>Discover the essence of your brand with Penda Graphics’ meticulously crafted graphic design process. Beginning with in-depth discussions and research, we delve into your brand’s identity and objectives, laying the foundation for our creative journey. Through brainstorming and ideation, we explore diverse concepts and styles, refining them into visually striking designs. Collaboration with our team ensures alignment with your vision, as we meticulously craft each detail to perfection. With your feedback, we make revisions until we achieve the ideal design. Upon approval, we finalize the design and deliver the files, ready for use across various platforms. Our commitment extends beyond delivery, providing ongoing support to ensure your designs continue to reflect your brand’s essence</p>
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
            <i class="fas fa-paint-brush"></i>
            </div>
            <div>
            <h3 class="fw-bold mb-1">Creative Concepts</h3>
            <p class="mb-0">We bring your ideas to life with unique designs.</p>
          </div>
          
        </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
            <div class="icon-circle">
            <i class="fas fa-vector-square"></i>
            </div>
            <div>
            <h3 class="fw-bold mb-1">Precision Design</h3>
            <p class="mb-0">Every detail is carefully crafted for visual impact.</p>
          </div>
         
        </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
            <div class="icon-circle">
            <i class="fas fa-bullhorn"></i>
            </div>
            <div>
            <h3 class="fw-bold mb-1">Brand Messaging</h3>
            <p class="mb-0">Clear, consistent communication that resonates.</p>
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
            <h1 class="fw-bold ">Case Studies</h1>
            <p>Discover how we’ve helped businesses of all sizes elevate their presence, forge strong connections with their audience, and leave a lasting impression in their respective industries. With every case study, we invite you to witness the artistry and innovation behind our logo designs, where each mark is a testament to our passion for visual storytelling and brand strategy
            </p>
          </div>
          </div>
          <div class="col-md-6">
            <GraphicDesignCarousel />
          </div>
        </div>
      </div>
    </section>

    
  
    <Footer :seo="seo" />
  </template>
  
  <script setup>
  import { Head } from "@inertiajs/vue3";
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";
  import GraphicDesignCarousel from "@/components/Home/Services/GraphicDesignCarousel.vue";
  
  const props = defineProps({
    seo: Object,
  });
  
  console.log('SEO Data received:', props.seo);


  </script>

  <style scoped>
  .hero {
  height: 75vh; /* Adjust height as needed */
  overflow: hidden;
  position: relative;
}

.banner-image {
  position: relative;
  background-image: url(/public/assets/images/graphic.png);
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
  background: linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)), url("/public/assets/images/web-design-banner.jpg") fixed center center;
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
  