<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Desktop Sidebar - Hidden on mobile -->
    <div 
      v-if="!isMobile"
      :class="[
        'transition-all duration-300 ease-in-out bg-dark text-white h-full flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64'
      ]"
    >
      <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- Navbar -->
      <NavbarDashboard 
        :sidebar-collapsed="sidebarCollapsed" 
        :is-mobile="isMobile"
        @toggle-sidebar="toggleSidebar" 
      />
      
      <!-- Main content area -->
      <main class="flex-1 p-4 md:p-6 overflow-y-auto pb-20 md:pb-4">
        <router-view></router-view>
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div 
      v-if="isMobile"
      class="fixed bottom-0 left-0 right-0 bg-dark text-white border-t border-gray-600 z-50"
    >
      <MobileBottomNav />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Admin/Sidebar.vue";
import NavbarDashboard from "../components/Admin/NavbarDashboard.vue";
import MobileBottomNav from "../components/Admin/Dashboard/MobileBottomNav.vue";

export default {
  name: 'DashboardLayout',
  components: { 
    Sidebar, 
    NavbarDashboard,
    MobileBottomNav 
  },
  data() {
    return {
      sidebarCollapsed: false,
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      // Auto-collapse sidebar on tablet sizes
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        this.sidebarCollapsed = true;
      }
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
};
</script>

<style scoped>
/* Custom scrollbar */
main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: #f1f1f1;
}

main::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>