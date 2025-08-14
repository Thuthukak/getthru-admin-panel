<template>
    <div class="max-w-5xl mx-auto mt-8 px-0">
      <!-- Main Image -->
      <div class="relative">
        <img
          :src="images[activeIndex]"
          class="w-full h-96 object-cover rounded-lg"
          alt="Website screenshot"
        />
        <!-- Arrows -->
        <button
          @click="prev"
          class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow"
        >
          ‹
        </button>
        <button
          @click="next"
          class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow"
        >
          ›
        </button>
      </div>
 
      <!-- Thumbnails -->
      <div class="overflow-x-auto mt-4">
        <div class="flex gap-2 justify-center min-w-max px-2">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            @click="activeIndex = index"
            class="w-20 h-12 sm:w-24 sm:h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0"
            :class="{
              'border-blue-500': index === activeIndex,
              'border-transparent': index !== activeIndex
            }"
          />
        </div>
      </div>
    </div>
  </template>
 
  <script setup>
  import { ref } from 'vue'
 
  const images = ref([
    '/assets/images/web-carousel/ramo-home.jpg',
    '/assets/images/web-carousel/ramo-services.jpg',
    '/assets/images/web-carousel/km-home-page.jpg',
    '/assets/images/web-carousel/km-shop-page.jpg',
    '/assets/images/web-carousel/km-login-page.jpg',
  ])
 
  const activeIndex = ref(0)
 
  const prev = () => {
    activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length
  }
 
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % images.value.length
  }
  </script>
 
  <style scoped>
  /* Hide scrollbar but keep functionality */
  .overflow-x-auto {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .overflow-x-auto::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
  </style>