<template>
  <section class=" bg-blue section portfolio ">
    <div>
      <h2 class="fw-bold text-center mb-4 mt-4">Portfolio</h2>
    </div>
    <div class="portfolio container my-5">
      <!-- Tabs -->
      <div class="tabs d-flex flex-wrap justify-content-center mb-4">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['btn m-2', selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary']"
        >
          {{ cat }}
        </button>
      </div>
  
      <!-- Gallery Grid -->
      <div class="row">
        <div
          class="col-md-4 mb-4"
          v-for="item in filteredItems"
          :key="item.id"
        >
          <div class="portfolio-item position-relative overflow-hidden rounded shadow-sm">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-100 h-100 object-cover"
            />
            <div class="overlay d-flex flex-column justify-content-center align-items-center text-white text-center px-3">
              <h5>{{ item.title }}</h5>
              <p class="small">{{ item.description }}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-light" @click="zoomImage(item.image)">Zoom</button>
                <a :href="item.link" target="_blank" class="btn btn-sm btn-light">Visit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Zoom -->
      <div
        v-if="zoomedImage"
        class="modal-backdrop"
        @click="zoomedImage = null"
      >
        <img :src="zoomedImage" class="zoomed-img" />
      </div>
    </div>
  </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const selectedCategory = ref('All')
  const zoomedImage = ref(null)
  
  const categories = [
    'All',
    'Web Design',
    'Product Design',
    'Graphic Design',
    'Digital Marketing',
    'Identity Design',
    'Logo Design'
  ]
  
  const items = ref([
    {
      id: 1,
      category: 'Web Design',
      title: 'Landing Page Design',
      description: 'Modern and responsive E-commerce website.',
      image: '/assets/images/portfolio/kmcollect.jpg',
      link: '#'
    },
    {
      id: 2,
      category: 'Product Design',
      title: 'Mobile App Mockup',
      description: 'Clean and intuitive mobile UI design.',
      image: '/assets/images/portfolio/mabura.jpg',
      link: '#'
    },
    {
      id: 3,
      category: 'Logo Design',
      title: 'Mkay Aqua',
      description: 'Eye-catching poster for music event.',
      image: '/assets/images/portfolio/mkay-aqua.jpg',
      link: '#'
    },
    {
      id: 4,
      category: 'Logo Design',
      title: 'ETAERC',
      description: 'ETAERC Logo',
      image: '/assets/images/portfolio/ETAERC_Logov2.png',
      link: '#'
    },
    {
      id: 5,
      category: 'Identity Design',
      title: 'Logo & Branding',
      description: 'Custom branding for tech startup.',
      image: '/assets/images/portfolio/bakili.jpg',
      link: '#'
    },
    {
      id: 6,
      category: 'Web Design',
      title: 'Ramohlale Industries',
      description: 'Custom website for an industrial company.',
      image: '/assets/images/portfolio/ramohlale.jpg',
      link: '#'
    },
    {
      id: 7,
      category: 'Logo Design',
      title: 'Logos',
      description: 'Mahloma Tsebo Solutions',
      image: '/assets/images/portfolio/Mahloma_Tsebo_logo_color darkerPurple@2x-80.jpg',
      link: '#'
    },
    {
      id: 8,
      category: 'Web Design',
      title: 'SHAPE CRM',
      description: 'A custom CRM Application for a international scholarships and internships.',
      image: '/assets/images/portfolio/Screenshot 2025-07-25 at 22.55.57.png',
      link: '#'
    },
    {
      id: 9,
      category: 'Graphic Design',
      title: 'Graphic asset',
      description: 'Mahloma Tsebo Solutions',
      image: '/assets/images/portfolio/1.png',
      link: '#'
    },
    {
      id: 10,
      category: 'Digital Marketing',
      title: 'Social Media Campaign',
      description: 'Ad creatives and strategy.',
      image: '/assets/images/portfolio/seo.jpg',
      link: '#'
    },
    {
      id: 11,
      category: 'Logo Design',
      title: 'Seloko Guest lodge logo',
      description: 'Seloko Guest lodge logo',
      image: '/assets/images/portfolio/Seloko.png',
      link: '#'
    },
    {
      id: 12,
      category: 'Product Design',
      title: 'MK Aqua bottle Mockup',
      description: 'MK Aqua bottle Mockup',
      image: '/assets/images/portfolio/mk_aqua_bottle.jpeg',
      link: '#'
    },
  ])
  
  const filteredItems = computed(() => {
    if (selectedCategory.value === 'All') return items.value
    return items.value.filter(i => i.category === selectedCategory.value)
  })
  
  function zoomImage(src) {
    zoomedImage.value = src
  }
  </script>
  
  <style scoped>
  .bg-blue{
    background-color: #b0d7ff3f !important;
  }
  .portfolio-item {
    height: 250px;
    position: relative;
  }
  
  .portfolio-item img {
    transition: transform 0.3s ease;
    height: 100%;
    object-fit: cover;
  }
  
  .portfolio-item:hover img {
    transform: scale(1.1);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .portfolio-item:hover .overlay {
    opacity: 1;
  }
  
  /* Zoom Modal */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1050;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .zoomed-img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    box-shadow: 0 0 20px #000;
  }
  </style>
  