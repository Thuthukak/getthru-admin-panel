<template>
    <navbar :seo="seo"/>
    <!-- banner -->
    <section id="apply" class="cta">
      <div class="container px-5" data-aos="zoom-in">
        <div class="text-center text-white">
          <h1 class="fw-bold">Digital Marketing That Delivers Results</h1>
          <p>We craft targeted campaigns that boost visibility, drive traffic, and convert clicks into loyal customers — all tailored to your brand’s goals and audience..</p>
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
            <h2 class="fw-bold mb-3"> Reach the Right People, the Right Way</h2>
            <p>We don’t just post and pray — we strategize. From SEO and social media to email campaigns and paid ads, we use data-driven tactics to grow your audience, increase engagement, and drive real business results. It's marketing with purpose and measurable impact.
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
            <div>
                <h3 class="fw-bold mb-1">Organic SEO</h3>
                <p class="mb-0">Let us help you achieve top rankings on the first page of Google and other leading search engines.</p>
            </div>
            </div>
      </div>

      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div>
            <h3 class="fw-bold mb-1">Google Ads</h3>
            <p class="mb-0">Expertly manage and implement all Google AdWords features for optimal performance.</p>
        </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div>
            <h3 class="fw-bold mb-1">Social Media</h3>
            <p class="mb-0">Our dedicated team will oversee your brand’s presence across all major social media platforms and networks.</p>
        </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div>
            <h3 class="fw-bold mb-1">Web Design</h3>
            <p class="mb-0">We specialize in creating professional, user-friendly websites and graphic designs tailored to enhance your business’s online presence.</p>
        </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div>
            <h3 class="fw-bold mb-1">Brand Strategy</h3>
            <p class="mb-0">We strategically position your brand across various platforms, ensuring it stands out and outperforms your competitors.</p>
        </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 mt-4 mb-4">
        <div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box">
        <div>
            <h3 class="fw-bold mb-1">Auto Lead Generation</h3>
            <p class="mb-0">Our main goal is to ensure that you consistently receive a steady stream of leads and grow your business.</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <Footer :seo="seo" />
  </template>
  
  <script setup>
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";


  defineProps({
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
  background-image: url(/public/assets/images/6-must-havr.webp);
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
  background-color: #0d5b5b; /* Your overlay color */
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
  background: linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.692)), url(/assets/images/marketing_digital_transformation.jpg) fixed center center;
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
  