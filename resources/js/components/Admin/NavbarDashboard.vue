<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 py-2 relative z-40">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Left Section: Sidebar Toggle (Desktop only) -->
      <div class="d-flex align-items-center">
        <button 
          v-if="!isMobile"
          @click="$emit('toggleSidebar')" 
          class="btn text-secondary me-3"
        >
          <font-awesome-icon :icon="icons.faBars" />
        </button>
        
        <!-- Mobile Logo -->
        <div v-if="isMobile" class="d-flex align-items-center">
          <div class="bg-white text-white d-flex align-items-center justify-content-center  me-2">
            <img src="/public/assets/images/penda_logo2.png" alt="Logo" class="w-32 h-8">
          </div>
        </div>
      </div>

      <!-- Right Section: Dark Mode, Language, Profile -->
      <div class="d-flex align-items-center gap-2 gap-md-3">
        
        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="btn text-secondary p-2">
          <font-awesome-icon :icon="darkMode ? icons.faSun : icons.faMoon" />
        </button>

        <!-- Language Switcher -->
        <button @click="changeLocale" class="btn text-secondary p-2">
          <font-awesome-icon :icon="icons.faGlobe" />
        </button>

        <!-- Profile Dropdown -->
        <div class="position-relative">
          <button 
            class="btn d-flex align-items-center p-1"
            @click="toggleDropdown"
            :disabled="loadingUser"
          >
            <div class="position-relative">
              <img 
                :src="currentAvatar" 
                alt="Profile" 
                class="rounded-circle me-2" 
                width="35" 
                height="35"
                @error="handleImageError"
              />
              <div 
                v-if="loadingUser" 
                class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light rounded-circle"
                style="opacity: 0.8;"
              >
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <span class="d-none d-sm-inline text-dark">
              {{ displayName }}
            </span>
            <font-awesome-icon :icon="icons.faChevronDown" class="ms-2 text-muted small" />
          </button>

          <!-- Dropdown Menu -->
          <ul 
            v-if="dropdownOpen" 
            class="dropdown-menu show position-absolute end-0 mt-2 shadow rounded border-0"
            style="min-width: 200px;"
          >
            <li class="px-3 py-2 border-bottom">
              <div class="d-flex align-items-center">
                <img 
                  :src="currentAvatar" 
                  alt="Profile" 
                  class="rounded-circle me-2" 
                  width="40" 
                  height="40"
                  @error="handleImageError"
                />
                <div>
                  <div class="fw-semibold">{{ user.name || 'User' }}</div>
                  <small class="text-muted">{{ user.email || 'No email' }}</small>
                </div>
              </div>
            </li>

            <li>
              <button class="dropdown-item d-flex align-items-center py-2" @click="goToProfile">
                <font-awesome-icon :icon="icons.faUser" class="me-2 text-muted" /> 
                Profile
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center py-2" @click="viewNotifications">
                <font-awesome-icon :icon="icons.faBell" class="me-2 text-muted" /> 
                Notifications
                <span v-if="notifications.count > 0" class="badge bg-danger rounded-pill ms-auto small">
                  {{ notifications.count }}
                </span>
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center py-2" @click="goToSettings">
                <font-awesome-icon :icon="icons.faCog" class="me-2 text-muted" /> 
                Settings
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center py-2" @click="goHome">
                <font-awesome-icon :icon="icons.faHome" class="me-2 text-muted" /> 
                Home
              </button>
            </li>
            <li><hr class="dropdown-divider my-1"></li>
            <li>
              <button class="dropdown-item d-flex align-items-center py-2 text-danger" @click="logout">
                <font-awesome-icon :icon="icons.faSignOutAlt" class="me-2" /> 
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Click outside to close dropdown -->
    <div 
      v-if="dropdownOpen" 
      class="position-fixed top-0 start-0 w-100 h-100"
      style="z-index: -1;"
      @click="dropdownOpen = false"
    ></div>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
  faBars, 
  faMoon, 
  faSun, 
  faGlobe, 
  faUser, 
  faBell, 
  faCog, 
  faHome, 
  faSignOutAlt,
  faChevronDown 
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default {
  name: "Navbar",
  components: { FontAwesomeIcon },
  props: {
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggleSidebar'],
  data() {
    return {
      darkMode: false,
      dropdownOpen: false,
      loadingUser: true,
      apiStatus: 'pending',
      user: {
        name: "",
        email: "",
        profile_picture: "",
      },
      notifications: {
        count: 0,
      },
      defaultAvatar: "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=100",
      icons: { 
        faBars, 
        faMoon, 
        faSun, 
        faGlobe, 
        faUser, 
        faBell, 
        faCog, 
        faHome, 
        faSignOutAlt,
        faChevronDown 
      },
    };
  },
  computed: {
    displayName() {
      if (this.loadingUser) return 'Loading...';
      return this.user.name || 'User';
    },
    currentAvatar() {
      return this.user.profile_picture || this.defaultAvatar;
    }
  },
  async mounted() {
    await this.fetchUserData();
    this.checkDarkMode();
  },
  methods: {
    async fetchUserData() {
      try {
        this.loadingUser = true;
        this.apiStatus = 'loading';
        
        console.log('Fetching user data from /api/profile/data...');
        
        // Add timeout and better error handling
        const response = await axios.get('/api/profile/data', {
          timeout: 10000, // 10 second timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        console.log('API Response:', response);
        console.log('Response Data:', response.data);
        
        if (response.data) {
          // Handle different possible response structures
          let userData = response.data;
          
          // If the user data is nested under a 'user' property
          if (response.data.user) {
            userData = response.data.user;
          }
          
          // If the user data is nested under 'data' property
          if (response.data.data && response.data.data.user) {
            userData = response.data.data.user;
          }
          
          console.log('Processed user data:', userData);
          
          this.user = {
            name: userData.name || userData.first_name || userData.username || '',
            email: userData.email || '',
            profile_picture: userData.profile_picture || userData.profile_photo_url || userData.avatar || '',
          };
          
          console.log('Final user object:', this.user);
          
          // Update default avatar with user's name
          if (!this.user.profile_picture && this.user.name) {
            this.defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.user.name)}&background=6366f1&color=fff&size=100`;
          }
          
          this.apiStatus = 'success';
        } else {
          throw new Error('No data received from API');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        this.apiStatus = 'error';
        
        // Log detailed error information
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        
        // Set fallback data
        this.user = {
          name: 'User',
          email: 'user@example.com',
          profile_picture: '',
        };
      } finally {
        this.loadingUser = false;
      }
    },
    
    handleImageError(event) {
      console.log('Image failed to load, using default avatar');
      event.target.src = this.defaultAvatar;
    },
    
    checkDarkMode() {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        this.darkMode = savedMode === 'true';
      } else {
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyDarkMode();
    },
    
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode.toString());
      this.applyDarkMode();
    },
    
    applyDarkMode() {
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("bg-dark", "text-light",);
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("bg-dark", "text-light");
      }
    },
    
    changeLocale() {
      console.log("Change language");
    },
    
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    
    goToProfile() {
      this.dropdownOpen = false;
      this.$router.push('/admin/profile');
    },
    
    viewNotifications() {
      this.dropdownOpen = false;
      console.log("View Notifications");
    },
    
    goToSettings() {
      this.dropdownOpen = false;
      this.$router.push('/admin/settings');
    },
    
    async goHome() {
      this.dropdownOpen = false;
      try {
        await axios.get('/');
        window.location.href = '/';
      } catch (error) {
        console.error('Error:', error);
      }
    },
    
    async logout() {
      try {
        await axios.post("/logout");
        window.location.href = "/";
      } catch (error) {
        console.error('Logout error:', error);
        window.location.href = "/";
      }
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  display: block;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  transform: translateY(-10px);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  transition: background-color 0.2s ease-in-out;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.btn:focus {
  box-shadow: none;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>