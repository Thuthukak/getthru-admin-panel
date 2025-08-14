<template>
  <nav class="bg-shape-primary shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Desktop Navigation -->
      <div class="hidden md:flex justify-between items-center py-4">
        <!-- Logo -->
        <a href="/" class="text-xl font-bold">
          <img 
            :src="seo.og_image"
            alt="Logo" 
            class="w-40 h-auto" />
        </a>

        <!-- Navigation Links -->
        <div class="flex space-x-6 items-center">
          <a href="/" class="nav-item">Home</a>
          <a href="/about-us" class="nav-item">About Us</a>

          <!-- Services Dropdown -->
          <div class="relative dropdown-container">
            <button @click.stop="toggleDropdown" class="nav-item dropdown flex items-center">
              Services
              <svg class="w-4 h-4 ml-1 transition-transform duration-200" 
                   :class="{ 'rotate-180': isDropdownOpen }"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="isDropdownOpen" class="absolute left-0 top-full bg-white shadow-lg py-2 w-48 rounded-lg z-50 border" @click.stop>
              <a href="/services/web-design" class="dropdown-item">Web Design</a>
              <a href="/services/graphic-design" class="dropdown-item">Graphic Design</a>
              <a href="/services/product-design" class="dropdown-item">Product Design</a>
              <a href="/services/identity-design" class="dropdown-item">Identity Design</a>
              <a href="/services/e-commerce" class="dropdown-item">E-Commerce</a>
              <a href="/services/digital-marketing" class="dropdown-item">Digital Marketing</a>
            </div>
          </div>

          <a href="/faq" class="nav-item">FAQ</a>
          <a href="/contact-us" class="nav-item">Contact Us</a>
          <button @click="openQuoteModal" class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition cursor-pointer">
            Get Free Quote
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden flex justify-between items-center py-3">
        <!-- Mobile Logo -->
        <a href="/" class="text-xl font-bold">
          <img 
            :src="seo.og_image"
            alt="Logo" 
            class="w-32 h-auto" />
        </a>

        <!-- Mobile Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Mobile Quote Button -->
          <button @click="openQuoteModal" class="bg-blue-500 px-3 py-1.5 rounded text-white text-sm hover:bg-blue-600 transition">
            Quote
          </button>
          
          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 transition">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="py-2 space-y-1">
          <a href="/" class="mobile-nav-item">Home</a>
          <a href="/about-us" class="mobile-nav-item">About Us</a>
          
          <!-- Mobile Services -->
          <div>
            <button @click="toggleMobileServices" class="mobile-nav-item mobile-services-button">
              <span>Services</span>
              <svg class="w-4 h-4 transition-transform duration-200" 
                   :class="{ 'rotate-180': isMobileServicesOpen }"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="isMobileServicesOpen" class="bg-gray-50 border-l-2 border-blue-500 ml-4">
              <a href="/services/web-design" class="mobile-sub-item">Web Design</a>
              <a href="/services/graphic-design" class="mobile-sub-item">Graphic Design</a>
              <a href="/services/product-design" class="mobile-sub-item">Product Design</a>
              <a href="/services/identity-design" class="mobile-sub-item">Identity Design</a>
              <a href="/services/e-commerce" class="mobile-sub-item">E-Commerce</a>
              <a href="/services/digital-marketing" class="mobile-sub-item">Digital Marketing</a>
            </div>
          </div>
          
          <a href="/faq" class="mobile-nav-item">FAQ</a>
          <a href="/contact-us" class="mobile-nav-item">Contact Us</a>
        </div>
      </div>
    </div>
  </nav>

  <EstimateModal :isOpen="isModalOpen" @close="closeQuoteModal" />
</template>

<script>
import EstimateModal from './EstimateModal.vue';

export default {
  name: 'Navbar',
  components: {
    EstimateModal
  },
  props: {
    seo: Object,
  },
  data() {
    return {
      isDropdownOpen: false,
      isMobileMenuOpen: false,
      isMobileServicesOpen: false,
      isModalOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      // Close services dropdown when mobile menu closes
      if (!this.isMobileMenuOpen) {
        this.isMobileServicesOpen = false;
      }
    },
    toggleMobileServices() {
      this.isMobileServicesOpen = !this.isMobileServicesOpen;
    },
    openQuoteModal() {
      this.isModalOpen = true;
    },
    closeQuoteModal() {
      this.isModalOpen = false;
    },
    // Close dropdowns when clicking outside
    handleClickOutside(event) {
      // Check if click is outside the dropdown container
      if (!event.target.closest('.dropdown-container')) {
        this.isDropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.bg-shape-primary {
  background-color: #ffffff !important;
}

/* Desktop Navigation Styles */
.nav-item {
  color: #374151;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  color: #2563eb;
  background-color: #f9fafb;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

/* Mobile Navigation Styles */
.mobile-nav-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-nav-item:hover {
  background-color: #f9fafb;
  color: #2563eb;
}

.mobile-services-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: none;
  border: none;
  font-size: inherit;
  cursor: pointer;
}

.mobile-sub-item {
  display: block;
  padding: 0.5rem 1.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-sub-item:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

/* Remove default link styling */
a {
  text-decoration: none !important;
}

/* Smooth animations */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Ensure dropdown appears above other content */
.dropdown {
  position: relative;
}

/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>