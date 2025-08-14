<template>
    <div class="max-w-5xl mx-auto mt-8">
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
      <div class="flex mt-4 gap-2 justify-center min-w-max px-2">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img"
          @click="activeIndex = index"
          class="w-24 h-16 object-cover rounded cursor-pointer border-2"
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
    '/assets/images/identity-carousel/Logo-mockup-scaled.jpg',
    '/assets/images/identity-carousel/bakili-2.jpg',
    '/assets/images/identity-carousel/bakili-3.jpg',
    '/assets/images/identity-carousel/bakili-4.jpg',
    '/assets/images/identity-carousel/bakili-5.jpg',
    '/assets/images/identity-carousel/bakili-business-cards.jpg',
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
  /* Optional: Add hover/transition styles if you like */
  </style>
  