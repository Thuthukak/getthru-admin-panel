<template>
  <div class="packages-management">
    <div class="header">
      <h1>Package Management</h1>
      <button @click="openModal()" class="btn btn-primary">
        Add New Package
      </button>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <label for="serviceFilter">Filter by Service Type:</label>
        <select id="serviceFilter" v-model="selectedServiceFilter" class="form-control">
          <option value="">All Services</option>
          <option v-for="service in serviceTypes" :key="service" :value="service">
            {{ service }}
          </option>
        </select>
      </div>
      <div class="search-group">
        <label for="search">Search Packages:</label>
        <input 
          id="search"
          type="text" 
          v-model="searchTerm" 
          placeholder="Search by package name..." 
          class="form-control"
        >
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading packages...
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Packages Table -->
    <div v-if="!loading && !error" class="table-container">
      <table class="packages-table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Package</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pkg in filteredPackages" :key="pkg.id">
            <td>{{ pkg.service_type }}</td>
            <td>{{ pkg.package }}</td>
            <td>
              <div class="description-cell">
                {{ pkg.description || 'No description' }}
              </div>
            </td>
            <td>R{{ formatPrice(pkg.price) }}</td>
            <td class="actions">
              <button @click="editPackage(pkg)" class="btn btn-sm btn-secondary">
                Edit
              </button>
              <button @click="deletePackage(pkg)" class="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredPackages.length === 0" class="no-results">
        No packages found matching your criteria.
      </div>
    </div>

    <!-- Modal for Add/Edit Package -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Package' : 'Add New Package' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="savePackage" class="modal-body">
          <div class="form-group">
            <label for="serviceType">Service Type:</label>
            <input 
              id="serviceType"
              type="text" 
              v-model="form.service_type" 
              required 
              class="form-control"
              :class="{ 'error': errors.service_type }"
            >
            <span v-if="errors.service_type" class="error-text">
              {{ errors.service_type[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="packageName">Package Name:</label>
            <input 
              id="packageName"
              type="text" 
              v-model="form.package" 
              required 
              class="form-control"
              :class="{ 'error': errors.package }"
            >
            <span v-if="errors.package" class="error-text">
              {{ errors.package[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea 
              id="description"
              v-model="form.description" 
              class="form-control textarea"
              :class="{ 'error': errors.description }"
              placeholder="Optional description of the package..."
              rows="3"
              maxlength="1000"
            ></textarea>
            <small class="char-count">{{ (form.description || '').length }}/1000 characters</small>
            <span v-if="errors.description" class="error-text">
              {{ errors.description[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="price">Price:</label>
            <input 
              id="price"
              type="number" 
              step="0.01" 
              min="0" 
              v-model="form.price" 
              required 
              class="form-control"
              :class="{ 'error': errors.price }"
            >
            <span v-if="errors.price" class="error-text">
              {{ errors.price[0] }}
            </span>
          </div>

          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" :disabled="saving" class="btn btn-primary">
              {{ saving ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Packages',
  data() {
    return {
      packages: [],
      serviceTypes: [],
      showModal: false,
      isEditing: false,
      loading: true,
      saving: false,
      error: null,
      searchTerm: '',
      selectedServiceFilter: '',
      form: {
        service_type: '',
        package: '',
        description: '',
        price: ''
      },
      errors: {}
    };
  },
  computed: {
    filteredPackages() {
      let filtered = this.packages;
      
      // Filter by service type
      if (this.selectedServiceFilter) {
        filtered = filtered.filter(pkg => 
          pkg.service_type === this.selectedServiceFilter
        );
      }
      
      // Filter by search term
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(pkg => 
          pkg.package.toLowerCase().includes(term) ||
          pkg.service_type.toLowerCase().includes(term) ||
          (pkg.description && pkg.description.toLowerCase().includes(term))
        );
      }
      
      return filtered;
    }
  },
  async mounted() {
    await this.fetchPackages();
    await this.fetchServiceTypes();
  },
  methods: {
    async fetchPackages() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get('/api/packages');
        this.packages = response.data;
      } catch (error) {
        this.error = 'Failed to fetch packages. Please try again.';
        console.error('Error fetching packages:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchServiceTypes() {
      try {
        const response = await axios.get('/api/packages/service-types');
        this.serviceTypes = response.data;
      } catch (error) {
        console.error('Error fetching service types:', error);
      }
    },
    
    openModal() {
      this.showModal = true;
      this.isEditing = false;
      this.resetForm();
    },
    
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    
    resetForm() {
      this.form = {
        service_type: '',
        package: '',
        description: '',
        price: ''
      };
      this.errors = {};
    },
    
    editPackage(pkg) {
      this.isEditing = true;
      this.showModal = true;
      this.form = {
        id: pkg.id,
        service_type: pkg.service_type,
        package: pkg.package,
        description: pkg.description || '',
        price: pkg.price
      };
      this.errors = {};
    },
    
    async savePackage() {
      try {
        this.saving = true;
        this.errors = {};
        
        const payload = {
          service_type: this.form.service_type,
          package: this.form.package,
          description: this.form.description || null,
          price: this.form.price
        };
        
        if (this.isEditing) {
          const response = await axios.put(`/api/packages/${this.form.id}`, payload);
          
          // Update the package in the list
          const index = this.packages.findIndex(p => p.id === this.form.id);
          if (index !== -1) {
            this.packages.splice(index, 1, response.data);
          }
        } else {
          const response = await axios.post('/api/packages', payload);
          
          // Add the new package to the list
          this.packages.push(response.data);
        }
        
        // Refresh service types in case a new one was added
        await this.fetchServiceTypes();
        
        this.closeModal();
        this.$emit('success', `Package ${this.isEditing ? 'updated' : 'created'} successfully!`);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          this.error = 'Failed to save package. Please try again.';
        }
        console.error('Error saving package:', error);
      } finally {
        this.saving = false;
      }
    },
    
    async deletePackage(pkg) {
      if (!confirm(`Are you sure you want to delete the package "${pkg.package}" for ${pkg.service_type}?`)) {
        return;
      }
      
      try {
        await axios.delete(`/api/packages/${pkg.id}`);
        
        // Remove from the list
        const index = this.packages.findIndex(p => p.id === pkg.id);
        if (index !== -1) {
          this.packages.splice(index, 1);
        }
        
        // Refresh service types in case this was the last package for a service
        await this.fetchServiceTypes();
        
        this.$emit('success', 'Package deleted successfully!');
      } catch (error) {
        this.error = 'Failed to delete package. Please try again.';
        console.error('Error deleting package:', error);
      }
    },
    
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
.packages-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin: 0;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
}

.filter-group, .search-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.filter-group label, .search-group label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-control {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  font-size: 12px;
  color: #666;
  text-align: right;
  display: block;
  margin-top: 2px;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,.25);
}

.form-control.error {
  border-color: #dc3545;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.alert {
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.table-container {
  background: white;
  border-radius: 5px;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.packages-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.packages-table th,
.packages-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.packages-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #495057;
}

.packages-table tbody tr:hover {
  background-color: #f5f5f5;
}

.description-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description-cell:hover {
  white-space: normal;
  overflow: visible;
  word-wrap: break-word;
}

.actions {
  display: flex;
  gap: 8px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 5px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .packages-table {
    font-size: 12px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .description-cell {
    max-width: 150px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
}
</style>