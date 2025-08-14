<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

  <script>
  import Footer from "@/components/Home/Footer.vue";    
  import Navbar from "@/components/Home/Navbar.vue";
  
  export default {
    components: { Footer, Navbar },
  };
  </script>