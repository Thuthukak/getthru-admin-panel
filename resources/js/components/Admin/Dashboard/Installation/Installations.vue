<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold mb-0">Installations</h1>
      <button @click="goToAddInstallation" class="btn btn-primary">
        <i class="bi bi-plus-circle me-1"></i> Add Installation
      </button>
    </div>
    
    <!-- Filters Section -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Filters</h5>
        <div class="row g-3">
          <div class="col-md-3">
            <label for="statusFilter" class="form-label">Status</label>
            <select v-model="filters.status" class="form-select" id="statusFilter">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="processed">Processed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="serviceFilter" class="form-label">Service Type</label>
            <select v-model="filters.service_type" class="form-select" id="serviceFilter">
              <option value="">All Services</option>
              <option v-for="service in serviceTypes" :key="service" :value="service">
                {{ service }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="dateFromFilter" class="form-label">Date From</label>
            <input v-model="filters.date_from" type="date" class="form-control" id="dateFromFilter">
          </div>
          <div class="col-md-3">
            <label for="dateToFilter" class="form-label">Date To</label>
            <input v-model="filters.date_to" type="date" class="form-control" id="dateToFilter">
          </div>
        </div>
        <div class="row g-3 mt-2">
          <div class="col-md-6">
            <label for="searchFilter" class="form-label">Search</label>
            <input 
              v-model="filters.search" 
              type="text" 
              class="form-control" 
              id="searchFilter" 
              placeholder="Search by name, email, phone..."
            >
          </div>
          <div class="col-md-6 d-flex align-items-end">
            <button @click="clearFilters" class="btn btn-outline-secondary me-2">Clear Filters</button>
            <button @click="fetchInstallations" class="btn btn-primary">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Installations Table -->
    <div v-else class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Installation Date</th>
                <th>Status</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="installation in installations" :key="installation.id">
                <td>
                  <div>
                    <strong>{{ installation.name }} {{ installation.surname }}</strong>
                    <br>
                    <small class="text-muted">{{ installation.location }}</small>
                  </div>
                </td>
                <td>
                  <div>
                    <i class="bi bi-telephone"></i> {{ installation.phone }}
                    <br v-if="installation.alternative_phone">
                    <small v-if="installation.alternative_phone" class="text-muted">
                      Alt: {{ installation.alternative_phone }}
                    </small>
                    <br>
                    <i class="bi bi-envelope"></i> {{ installation.email }}
                  </div>
                </td>
                <td>
                  <div>
                    <strong>{{ installation.service_type }}</strong>
                    <br>
                    <small class="text-muted">{{ installation.package }}</small>
                  </div>
                </td>
                <td>
                  {{ formatDate(installation.installation_date) }}
                </td>
                <td>
                  <select 
                    v-model="installation.status" 
                    @change="updateStatus(installation)"
                    class="form-select form-select-sm"
                    :class="getStatusClass(installation.status)"
                    :disabled="!canChangeStatus(installation)"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="processed" :disabled="!installation.images_uploaded">Processed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div v-if="installation.status === 'in_progress' && !installation.images_uploaded" class="text-warning small mt-1">
                    <i class="bi bi-exclamation-triangle"></i> Images required
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="badge me-2" :class="getImagesBadgeClass(installation)">
                      {{ installation.images_count || 0 }}/3
                    </span>
                    <button 
                      v-if="installation.status === 'in_progress'" 
                      @click="openImageUpload(installation)"
                      class="btn btn-sm btn-outline-info"
                      title="Upload Images"
                    >
                      <i class="bi bi-camera"></i>
                    </button>
                    <button 
                      v-if="installation.images_count > 0"
                      @click="viewImages(installation)"
                      class="btn btn-sm btn-outline-secondary ms-1"
                      title="View Images"
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <button 
                    @click="viewDetails(installation)" 
                    class="btn btn-sm btn-outline-primary me-1"
                    title="View Details"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button 
                    @click="deleteInstallation(installation.id)" 
                    class="btn btn-sm btn-outline-danger"
                    title="Delete"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                <button @click="changePage(pagination.current_page - 1)" class="page-link">Previous</button>
              </li>
              <li 
                v-for="page in getPageNumbers()" 
                :key="page" 
                class="page-item" 
                :class="{ active: page === pagination.current_page }"
              >
                <button @click="changePage(page)" class="page-link">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                <button @click="changePage(pagination.current_page + 1)" class="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Installation Details Modal Component -->
    <InstallationDetailsModal 
      :isOpen="showDetailsModal" 
      :installation="selectedInstallation"
      @close="closeDetailsModal"
      @edit="handleEditInstallation"
    />

    <ImageUploadModal 
        :isOpen="showImageUpload" 
        :installation="selectedInstallation"
        @close="closeImageUpload"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />

    <!-- Image Viewer Modal -->
    <div v-if="showImageViewer" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.8)">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Installation Images - {{ selectedInstallation?.name }} {{ selectedInstallation?.surname }}
            </h5>
            <button @click="closeImageViewer" type="button" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div v-if="installationImages.length > 0" class="row g-3">
              <div v-for="image in installationImages" :key="image.id" class="col-md-4">
                <div class="card">
                  <div class="card-header text-center">
                    <strong>{{ formatImageType(image.image_type) }}</strong>
                    <small class="text-muted d-block">{{ formatDate(image.uploaded_at) }}</small>
                  </div>
                  <div class="card-body p-0">
                    <img 
                      :src="'/storage/' + image.image_path" 
                      class="img-fluid w-100"
                      style="max-height: 300px; object-fit: contain;"
                      :alt="formatImageType(image.image_type)"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              <p class="text-muted">No images uploaded yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import InstallationDetailsModal from './InstallationDetailsModal.vue'
import ImageUploadModal from './ImageUploadModal.vue'

export default {
  name: 'Installations',
  components: {
    InstallationDetailsModal,
    ImageUploadModal
  },
  data() {
    return {
      installations: [],
      loading: false,
      filters: {
        status: '',
        service_type: '',
        date_from: '',
        date_to: '',
        search: ''
      },
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0
      },
      serviceTypes: [],
      selectedInstallation: null,
      showDetailsModal: false,
      showImageUpload: false,
      showImageViewer: false,
      installationImages: [],
    }
  },
  computed: {
   
  },
  mounted() {
    this.fetchInstallations()
    this.fetchServiceTypes()
  },
  methods: {
    //go to add installation page
    goToAddInstallation() {
      window.location.href = '/reg-form';
    },
    
    // Fetch installations
    async fetchInstallations(page = 1) {
      this.loading = true
      try {
        const params = {
          page,
          per_page: this.pagination.per_page,
          ...this.filters
        }
        
        const response = await axios.get('/api/installations', { params })
        this.installations = response.data.data
        this.pagination = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to
        }
      } catch (error) {
        console.error('Error fetching installations:', error)
        this.showError('Failed to fetch installations')
      } finally {
        this.loading = false
      }
    },
    
    async fetchServiceTypes() {
      try {
        const response = await axios.get('/api/installations/service-types')
        this.serviceTypes = response.data
      } catch (error) {
        console.error('Error fetching service types:', error)
      }
    },
    
    async updateStatus(installation) {
      // Prevent changing to processed if images not uploaded
      if (installation.status === 'processed' && !installation.images_uploaded) {
        this.showError('Cannot mark as processed without uploading installation images')
        this.fetchInstallations(this.pagination.current_page)
        return
      }
      
      try {
        await axios.patch(`/api/installations/${installation.id}/status`, {
          status: installation.status
        })
        this.showSuccess('Status updated successfully')
      } catch (error) {
        console.error('Error updating status:', error)
        this.showError('Failed to update status')
        // Revert the change
        this.fetchInstallations(this.pagination.current_page)
      }
    },
    
    canChangeStatus(installation) {
      // Allow changing to processed only if images are uploaded
      return !(installation.status === 'processed' && !installation.images_uploaded)
    },
    
    async deleteInstallation(id) {
      if (confirm('Are you sure you want to delete this installation?')) {
        try {
          await axios.delete(`/api/installations/${id}`)
          this.showSuccess('Installation deleted successfully')
          this.fetchInstallations(this.pagination.current_page)
        } catch (error) {
          console.error('Error deleting installation:', error)
          this.showError('Failed to delete installation')
        }
      }
    },
    
    viewDetails(installation) {
      this.selectedInstallation = installation
      this.showDetailsModal = true
    },
    
    closeDetailsModal() {
      this.showDetailsModal = false
      this.selectedInstallation = null
    },
    
    handleEditInstallation(installation) {
      console.log('Edit installation:', installation)
      this.showSuccess(`Edit functionality for ${installation.name} ${installation.surname} would be implemented here`)
    },
    
    // Image upload methods
    openImageUpload(installation) {
      this.selectedInstallation = installation
      this.showImageUpload = true
      this.uploadedImages = {}
    },
    
    closeImageUpload() {
      this.showImageUpload = false
      this.selectedInstallation = null
      this.uploadedImages = {}
      this.uploadProgress = 0
    },

    
    async viewImages(installation) {
      this.selectedInstallation = installation
      this.showImageViewer = true
      
      try {
        const response = await axios.get(`/api/installations/${installation.id}/images`)
        this.installationImages = response.data
      } catch (error) {
        console.error('Error fetching images:', error)
        this.showError('Failed to load images')
      }
    },
    
    closeImageViewer() {
      this.showImageViewer = false
      this.selectedInstallation = null
      this.installationImages = []
    },
    
    clearFilters() {
      this.filters = {
        status: '',
        service_type: '',
        date_from: '',
        date_to: '',
        search: ''
      }
      this.fetchInstallations(1)
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchInstallations(page)
      }
    },
    
    getPageNumbers() {
      const pages = []
      const current = this.pagination.current_page
      const last = this.pagination.last_page
      
      if (current > 3) pages.push(1)
      if (current > 4) pages.push('...')
      
      for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
        pages.push(i)
      }
      
      if (current < last - 3) pages.push('...')
      if (current < last - 2) pages.push(last)
      
      return pages
    },
    
    getStatusClass(status) {
      const classes = {
        'pending': 'text-warning',
        'confirmed': 'text-info',
        'in_progress': 'text-primary',
        'processed': 'text-success',
        'cancelled': 'text-danger'
      }
      return classes[status] || ''
    },
    
    getImagesBadgeClass(installation) {
      const count = installation.images_count || 0
      if (count === 3) return 'bg-success'
      if (count > 0) return 'bg-warning'
      return 'bg-secondary'
    },
    
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString()
    },
    
    formatImageType(type) {
      const types = {
        'before': 'Before Installation',
        'during': 'During Installation', 
        'after': 'After Installation'
      }
      return types[type] || type
    },
    
    showSuccess(message) {
      alert(message)
    },
    
    showError(message) {
      alert(message)
    }
  }
}
</script>

<style scoped>
.table th {
  font-weight: 600;
}

.pagination {
  margin-bottom: 0;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.modal {
  z-index: 1050;
}

.upload-placeholder {
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-placeholder:hover {
  background-color: #e9ecef !important;
}

.progress {
  height: 1rem;
}
</style>