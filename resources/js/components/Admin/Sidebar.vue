<template>
  <aside class="bg-dark text-white h-full flex flex-col p-3 relative">

    <!-- Logo Section -->
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-white text-white flex items-center justify-center rounded-lg min-w-[40px] h-10 p-1">
        <img 
          v-if="collapsed" 
          src="/assets/images/p-logo.png" 
          alt="Logo" 
          class="w-8 h-8"
        >
        <img 
          v-else 
          src="/assets/images/penda_logo2.png" 
          alt="Logo" 
          class="w-40 h-8"
        >
      </div>
    </div>

    <!-- Navigation Links -->
    <ul class="list-none flex-grow space-y-1">
      <li v-for="item in navigationItems" :key="item.path">
        <router-link 
          :to="item.path" 
          class="flex items-center text-white p-2 rounded hover-effect group relative"
          :class="{ 'justify-center': collapsed }"
        >
          <font-awesome-icon :icon="item.icon" class="min-w-[20px]" />
          <span 
            v-if="!collapsed" 
            class="ml-2 transition-opacity duration-300"
          >
            {{ item.label }}
          </span>
          <!-- Tooltip for collapsed state -->
          <div 
            v-if="collapsed"
            class="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20"
          >
            {{ item.label }}
          </div>
        </router-link>
      </li>
    </ul>

    <!-- Logout Button -->
    <div class="mt-auto">
      <button 
        @click="logout" 
        class="flex items-center w-full text-white p-2 rounded hover-effect text-red-400 group relative"
        :class="{ 'justify-center': collapsed }"
      >
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="min-w-[20px]" />
        <span 
          v-if="!collapsed" 
          class="ml-2 transition-opacity duration-300"
        >
          Logout
        </span>
        <!-- Tooltip for collapsed state -->
        <div 
          v-if="collapsed"
          class="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20"
        >
          Logout
        </div>
      </button>
    </div>
  </aside>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';

export default {
  name: "Sidebar",
  components: {
    FontAwesomeIcon,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
  data() {
    return {
      navigationItems: [
        {
          path: '/admin/dashboard',
          label: 'Dashboard',
          icon: ['fas', 'home'],
        },
        {
          path: '/admin/quotations',
          label: 'Quotations',
          icon: ['fas', 'clipboard-list'],
        },
        {
          path: '/admin/invoices',
          label: 'Invoices',
          icon: ['fas', 'file-invoice-dollar'],
        },
        {
          path: '/admin/services',
          label: 'Services',
          // graphic design services
          icon: ['fas', 'paint-brush'],
          
        },
        {
          path: '/admin/settings',
          label: 'Settings',
          icon: ['fas', 'cog'],
        },
      ],
    };
  },
  methods: {
    logout() {
      axios.post('/logout').then(() => {
        window.location.href = '/login';
      }).catch((error) => {
        console.error('Logout error:', error);
        // Fallback logout
        window.location.href = '/login';
      });
    },
  },
};
</script>

<style scoped>
/* Hover effect for links */
.hover-effect {
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.hover-effect:hover {
  background-color: rgba(59, 130, 246, 0.3);
  transform: translateX(2px);
}

.router-link-active {
  background-color: rgba(59, 130, 246, 0.5);
}

/* Smooth transitions */
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
ul {
  padding-left:0rem !important;
  color: #ffffff !important;
}
</style>