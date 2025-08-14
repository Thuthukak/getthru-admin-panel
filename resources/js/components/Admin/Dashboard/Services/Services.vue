<template>
  <div class="container py-4">
    <!-- Header with add button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Services</h2>
      <button class="btn btn-primary" @click="openAddModal">
        <i class="bi bi-plus-circle me-1"></i> Add Service
      </button>
    </div>

    <!-- Search and Filter Controls -->
    <div class="row mb-4">
      <!-- Search bar -->
      <div class="col-md-6 mb-3">
        <div class="input-group">
          <span class="input-group-text bg-light">
            <i class="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search services..." 
            v-model="searchQuery"
            @input="debounceSearch"
          >
        </div>
      </div>

      <!-- Status filter -->
      <div class="col-md-3 mb-3">
        <select class="form-select" v-model="statusFilter" @change="fetchServices">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Items per page -->
      <div class="col-md-3 mb-3">
        <select class="form-select" v-model="perPage" @change="fetchServices">
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>

    <!-- Sort Controls -->
    <div class="row mb-3">
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <label class="form-label me-2 mb-0">Sort by:</label>
          <select class="form-select form-select-sm" v-model="sortBy" @change="fetchServices">
            <option value="created_at">Date Created</option>
            <option value="name">Service</option>
            <option value="base_price">Price</option>
            <option value="updated_at">Last Updated</option>
          </select>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-flex align-items-center">
          <label class="form-label me-2 mb-0">Order:</label>
          <select class="form-select form-select-sm" v-model="sortOrder" @change="fetchServices">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      <div class="col-md-5 text-end">
        <span class="text-muted small" v-if="paginationData">
          Showing {{ paginationData.from || 0 }}-{{ paginationData.to || 0 }} of {{ paginationData.total || 0 }} results
        </span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading services...</p>
    </div>

    <!-- No services message -->
    <div v-else-if="services.length === 0" class="text-center my-5">
      <i class="bi bi-inbox display-4 text-muted"></i>
      <p class="lead mt-3">No services found</p>
      <p class="text-muted" v-if="searchQuery || statusFilter">Try changing your search criteria</p>
      <button v-else class="btn btn-outline-primary mt-2" @click="openAddModal">
        Add your first service
      </button>
    </div>

    <!-- Services table for desktop -->
    <div v-else class="d-none d-md-block">
      <div class="table-responsive rounded">
        <table class="table table-hover border">
          <thead class="table-light">
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id" class="align-middle">
              <td class="fw-medium">{{ service.name }}</td>
              <td>
                <span :title="service.description">
                  {{ truncateText(service.description, 100) }}
                </span>
              </td>
              <td>R{{ service.base_price }}</td>
              <td>
                <span :class="service.is_active ? 'badge bg-success' : 'badge bg-secondary'">
                  {{ service.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button 
                    class="btn btn-outline-primary btn-sm" 
                    @click="openEditModal(service)"
                    title="Edit service"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button 
                    class="btn btn-outline-danger btn-sm" 
                    @click="openDeleteModal(service)"
                    title="Delete service"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile card layout -->
    <div class="d-block d-md-none">
      <div class="row g-3">
        <div class="col-12" v-for="service in services" :key="service.id">
          <div class="card service-card">
            <div class="card-body">
              <div class="d-flex mb-3">
                <!-- Service Info -->
                <div class="flex-grow-1 min-width-0">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0 text-truncate me-2">{{ service.name }}</h5>
                    <div class="btn-group flex-shrink-0">
                      <button 
                        class="btn btn-outline-primary btn-sm" 
                        @click="openEditModal(service)"
                        title="Edit service"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button 
                        class="btn btn-outline-danger btn-sm" 
                        @click="openDeleteModal(service)"
                        title="Delete service"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  <p class="card-text text-muted mb-3" :title="service.description">
                    {{ truncateText(service.description, 120) }}
                  </p>
                </div>
              </div>
              
              <div class="row g-2">
                <div class="col-6">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-currency-dollar text-success me-2"></i>
                    <div>
                      <small class="text-muted d-block">Price</small>
                      <strong>R{{ service.base_price }}</strong>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-clock text-primary me-2"></i>
                    <div>
                      <small class="text-muted d-block">Status</small>
                      <span :class="service.is_active ? 'badge bg-success' : 'badge bg-secondary'">
                        {{ service.is_active ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="paginationData && paginationData.last_page > 1" class="d-flex justify-content-center mt-4">
      <nav aria-label="Services pagination">
        <ul class="pagination">
          <!-- Previous button -->
          <li class="page-item" :class="{ disabled: paginationData.current_page === 1 }">
            <button 
              class="page-link" 
              @click="goToPage(paginationData.current_page - 1)"
              :disabled="paginationData.current_page === 1"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>

          <!-- Page numbers -->
          <li 
            v-for="page in visiblePages" 
            :key="page"
            class="page-item" 
            :class="{ active: page === paginationData.current_page }"
          >
            <button class="page-link" @click="goToPage(page)" v-if="page !== '...'">
              {{ page }}
            </button>
            <span class="page-link" v-else>{{ page }}</span>
          </li>

          <!-- Next button -->
          <li class="page-item" :class="{ disabled: paginationData.current_page === paginationData.last_page }">
            <button 
              class="page-link" 
              @click="goToPage(paginationData.current_page + 1)"
              :disabled="paginationData.current_page === paginationData.last_page"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Toast notification -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1060">
      <div 
        v-if="showToast"
        class="toast align-items-center text-white show" 
        :class="toastClass" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ toastMessage }}
          </div>
          <button type="button" class="btn-close me-2 m-auto" @click="hideToast"></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Service Modal -->
  <ServiceCreateEditModal
    :show="showServiceModal"
    :service="currentService"
    :is-submitting="isSubmitting"
    @close="closeModal"
    @submit="handleServiceSubmit"
    ref="serviceModal"
  />

  <!-- Delete Confirmation Modal -->
  <ServiceDeleteConfirmationModal
    :show="showDeleteModal"
    :service="serviceToDelete"
    :is-deleting="isDeleting"
    @close="closeDeleteConfirmModal"
    @confirm="deleteService"
  />
</template>

<script>
import axios from "axios";
import ServiceCreateEditModal from "./ServiceCreateEditModal.vue";
import ServiceDeleteConfirmationModal from "./ServiceDeleteConfirmationModal.vue";


export default {
  components: {
    ServiceCreateEditModal,
    ServiceDeleteConfirmationModal
  },

  data() {
    return {
      services: [],
      paginationData: null,
      searchQuery: "",
      statusFilter: "",
      sortBy: "created_at",
      sortOrder: "desc",
      perPage: 15,
      currentPage: 1,
      loading: true,
      isSubmitting: false,
      isDeleting: false,
      currentService: null,
      serviceToDelete: null,
      showServiceModal: false,
      showDeleteModal: false,
      showToast: false,
      toastMessage: "",
      toastClass: "bg-success",
      searchTimeout: null,
    };
  },

  computed: {
    visiblePages() {
      if (!this.paginationData) return [];
      
      const current = this.paginationData.current_page;
      const last = this.paginationData.last_page;
      const pages = [];
      
      // Show first page
      if (current > 3) {
        pages.push(1);
        if (current > 4) pages.push('...');
      }
      
      // Show pages around current
      for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
        pages.push(i);
      }
      
      // Show last page
      if (current < last - 2) {
        if (current < last - 3) pages.push('...');
        pages.push(last);
      }
      
      return pages;
    }
  },

  mounted() {
    this.fetchServices();
  },

  methods: {
    async fetchServices() {
      this.loading = true;
      try {
        const params = {
          page: this.currentPage,
          per_page: this.perPage,
          sort_by: this.sortBy,
          sort_order: this.sortOrder,
        };

        // Add search if present
        if (this.searchQuery.trim()) {
          params.search = this.searchQuery.trim();
        }

        // Add status filter if present
        if (this.statusFilter) {
          params.status = this.statusFilter;
        }

        const response = await axios.get("/api/services", { params });
        
        // Handle paginated response
        if (response.data.data) {
          this.services = response.data.data;
          this.paginationData = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            per_page: response.data.per_page,
            total: response.data.total,
            from: response.data.from,
            to: response.data.to
          };
        } else {
          // Handle non-paginated response (when per_page is not set)
          this.services = response.data;
          this.paginationData = null;
        }
      } catch (error) {
        this.displayToast("Error fetching services. Please try again.", "bg-danger");
        console.error("Error fetching services:", error);
      } finally {
        this.loading = false;
      }
    },

    debounceSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1; // Reset to first page when searching
        this.fetchServices();
      }, 500);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.paginationData.last_page && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchServices();
      }
    },

    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
    },

    openAddModal() {
      this.currentService = null;
      this.showServiceModal = true;
    },

    openEditModal(service) {
      this.currentService = service;
      this.showServiceModal = true;
    },

    openDeleteModal(service) {
      this.serviceToDelete = service;
      this.showDeleteModal = true;
    },

    closeModal() {
      this.showServiceModal = false;
      this.currentService = null;
    },

    closeDeleteConfirmModal() {
      this.showDeleteModal = false;
      this.serviceToDelete = null;
    },

    async handleServiceSubmit(formData) {
      this.isSubmitting = true;

      try {
        if (this.currentService) {
          await this.updateService(formData);
        } else {
          await this.createService(formData);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        
        if (error.response && error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          this.$refs.serviceModal.setErrors(serverErrors);
        } else {
          this.displayToast(
            `Error ${this.currentService ? 'updating' : 'creating'} service. Please try again.`, 
            "bg-danger"
          );
        }
      } finally {
        this.isSubmitting = false;
      }
    },

    async createService(formData) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('base_price', formData.base_price);
      data.append('is_active', formData.is_active);

      await axios.post("/api/services", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh the list
      this.fetchServices();
      
      this.closeModal();
      this.displayToast("Service added successfully!", "bg-success");
    },

    async updateService(formData) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('base_price', formData.base_price);
      data.append('is_active', formData.is_active);
      data.append('_method', 'PUT');

      await axios.post(`/api/services/${this.currentService.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh the list
      this.fetchServices();
      
      this.closeModal();
      this.displayToast("Service updated successfully!", "bg-success");
    },

    async deleteService() {
      if (!this.serviceToDelete) return;
      
      this.isDeleting = true;
      
      try {
        await axios.delete(`/api/services/${this.serviceToDelete.id}`);
        
        // Refresh the list
        this.fetchServices();
        
        this.closeDeleteConfirmModal();
        this.displayToast("Service deleted successfully!", "bg-success");
      } catch (error) {
        console.error("Error deleting service:", error);
        this.displayToast("Error deleting service. Please try again.", "bg-danger");
      } finally {
        this.isDeleting = false;
      }
    },

    displayToast(message, colorClass = "bg-success") {
      this.toastMessage = message;
      this.toastClass = colorClass;
      this.showToast = true;
      
      setTimeout(() => {
        this.hideToast();
      }, 5000);
    },
    
    hideToast() {
      this.showToast = false;
    }
  }
};
</script>

<style scoped>
.table th {
  font-weight: 600;
}

.toast {
  min-width: 250px;
}

.service-card {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
}

.service-card:hover {
  border-color: #0d6efd;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.service-card .card-title {
  color: #212529;
  font-size: 1.1rem;
  font-weight: 600;
}

.service-card .card-text {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Pagination styling */
.pagination {
  margin-bottom: 0;
}

.page-link {
  color: #0d6efd;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.page-link:hover {
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.min-width-0 {
  min-width: 0;
}

/* Mobile responsive */
@media (max-width: 576px) {
  .btn-group .btn {
    padding: 0.25rem 0.5rem;
  }
  
  .pagination {
    font-size: 0.875rem;
  }
}

@media (max-width: 575px) {
  .btn-group {
    flex-direction: column;
  }
  
  .btn-group .btn {
    border-radius: 0.375rem !important;
    margin-bottom: 0.25rem;
  }
  
  .btn-group .btn:last-child {
    margin-bottom: 0;
  }
}
</style>