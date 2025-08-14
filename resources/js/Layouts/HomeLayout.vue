<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :seo="seo" />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <Footer :seo="seo" />
  </div>
</template>
  
  <script>
  import Navbar from "@/components/Home/Navbar.vue";
  import Footer from "@/components/Home/Footer.vue";
  
  export default {
    components: {  Navbar, Footer },
    props: {
      seo: Object,
    },
  };
  
  </script>