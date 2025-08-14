<template>
  <nav class="flex justify-around items-center py-2 px-1 bg-dark text-white">
    <router-link
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center p-2 min-w-[60px] text-center transition-colors duration-200"
      :class="[
        'hover:text-blue-300',
        $route.path === item.path ? 'text-blue-400' : 'text-gray-300'
      ]"
      active-class="text-blue-400"
    >
      <font-awesome-icon 
        :icon="item.icon" 
        class="text-lg mb-1"
        :class="[$route.path === item.path ? 'text-blue-400' : 'text-gray-300']"
      />
      <span class="text-xs font-medium leading-tight">{{ item.label }}</span>
    </router-link>
    
    <!-- More/Menu Button -->
    <button
      @click="showMoreMenu = !showMoreMenu"
      class="flex flex-col items-center justify-center p-2 min-w-[60px] text-center transition-colors duration-200 text-gray-300 hover:text-blue-300 relative"
    >
      <font-awesome-icon 
        :icon="['fas', 'ellipsis-h']" 
        class="text-lg mb-1"
      />
      <span class="text-xs font-medium leading-tight">More</span>
      
      <!-- More Menu Popup -->
      <div
        v-if="showMoreMenu"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-gray-800 rounded  shadow border py-2 min-w-[250px]"
      >
        <button
          v-for="item in moreItems"
          :key="item.action"
          @click="handleMoreAction(item.action)"
          class="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          <font-awesome-icon :icon="item.icon" class="mr-3 text-gray-500" />
          {{ item.label }}
        </button>
      </div>
    </button>

    <!-- Backdrop for closing more menu -->
    <div
      v-if="showMoreMenu"
      class="fixed inset-0 z-[-1]"
      @click="showMoreMenu = false"
    ></div>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';

export default {
  name: "MobileBottomNav",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      showMoreMenu: false,
      navigationItems: [
        {
          path: '/admin/dashboard',
          label: 'Dashboard',
          icon: ['fas', 'home'],
        },
        {
          path: '/admin/QueueManagement',
          label: 'Queue',
          icon: ['fas', 'user-plus'],
        },
        {
          path: '/admin/bookings',
          label: 'Bookings',
          icon: ['fas', 'calendar-alt'],
        },
        {
          path: '/admin/services',
          label: 'Services',
          icon: ['fas', 'cut'],
        },
      ],
      moreItems: [
        {
          action: 'settings',
          label: 'Settings',
          icon: ['fas', 'cog'],
        },
        {
          action: 'profile',
          label: 'Profile',
          icon: ['fas', 'user'],
        },
        {
          action: 'notifications',
          label: 'Notifications',
          icon: ['fas', 'bell'],
        },
        {
          action: 'home',
          label: 'Go Home',
          icon: ['fas', 'home'],
        },
        {
          action: 'logout',
          label: 'Logout',
          icon: ['fas', 'sign-out-alt'],
        },
      ],
    };
  },
  methods: {
    handleMoreAction(action) {
      this.showMoreMenu = false;
      
      switch (action) {
        case 'settings':
          this.$router.push('/admin/settings');
          break;
        case 'profile':
          this.$router.push('/admin/profile');
          break;
        case 'notifications':
          console.log('View notifications');
          break;
        case 'home':
          this.$router.push('/');
          break;
        case 'logout':
          this.logout();
          break;
        default:
          console.log('Unknown action:', action);
      }
    },
    
    async logout() {
      try {
        await axios.post('/logout');
        window.location.href = '/';
      } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/';
      }
    },
  },
};
</script>

<style scoped>
/* Active link styling */
.router-link-active {
  color: #60a5fa !important;
}

.router-link-active .fa-icon {
  color: #60a5fa !important;
}

/* Safe area for phones with home indicators */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  nav {
    padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
  }
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
a{
  text-decoration: none ! important;
  color: inherit ! important;
}
</style>