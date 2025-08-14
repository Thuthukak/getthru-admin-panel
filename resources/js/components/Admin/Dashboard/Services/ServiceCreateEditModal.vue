<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Edit Service' : 'Add New Service' }}</h5>
              <button type="button" class="btn-close" @click="$emit('close')"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm">   
                <div class="mb-3">
                  <label for="serviceName" class="form-label">Service Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="serviceName"
                    v-model="formData.name"
                    required
                  >
                  <div v-if="errors.name" class="text-danger mt-1">{{ errors.name }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="serviceDescription" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    id="serviceDescription"
                    rows="3"
                    v-model="formData.description"
                    required
                  ></textarea>
                  <div v-if="errors.description" class="text-danger mt-1">{{ errors.description }}</div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="servicePrice" class="form-label">Price (R)</label>
                    <input
                      type="number"
                      class="form-control"
                      id="servicePrice"
                      v-model="formData.base_price"
                      min="0"
                      step="0.01"
                      required
                    >
                    <div v-if="errors.base_price" class="text-danger mt-1">{{ errors.base_price }}</div>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="serviceStatus" class="form-label">Status</label>
                    <select
                      class="form-control"
                      id="serviceStatus"
                      v-model="formData.is_active"
                      required
                    >
                      <option value="">Select Status</option>
                      <option :value="true">Active</option>
                      <option :value="false">Inactive</option>
                    </select>
                    <div v-if="errors.is_active" class="text-danger mt-1">{{ errors.is_active }}</div>
                  </div>
                </div>
                
                <div class="d-flex flex-column flex-sm-row justify-content-end gap-2">
                  <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
                  <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                    {{ isEditing ? 'Update' : 'Add' }} Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'ServiceCreateEditModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    service: {
      type: Object,
      default: null
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close', 'submit'],

  data() {
    return {
      formData: {
        name: "",
        description: "",
        base_price: "",
        is_active: true,
      },
      errors: {
        name: "",
        description: "",
        base_price: "",
        is_active: "",
      }
    };
  },

  computed: {
    isEditing() {
      return this.service !== null;
    }
  },

  watch: {
    show(newVal) {
      if (newVal) {
        this.resetForm();
        if (this.service) {
          this.formData = { ...this.service };
        }
      }
    },
    service: {
      handler(newVal) {
        if (newVal) {
          this.formData = { ...newVal };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },

  methods: {
    resetForm() {
      this.formData = {
        name: "",
        description: "",
        base_price: "",
        is_active: true,
      };
      this.errors = {
        name: "",
        description: "",
        base_price: "",
        is_active: "",
      };
    },

    submitForm() {
      // Reset errors
      this.errors = {
        name: "",
        description: "",
        base_price: "",  
        is_active: "",
      };

      // Basic validation
      if (!this.formData.name) {
        this.errors.name = "Service name is required";
      }
      if (!this.formData.description) {
        this.errors.description = "Description is required";
      }
      if (!this.formData.base_price || isNaN(this.formData.base_price) || this.formData.base_price < 0) {
        this.errors.base_price = "Valid price is required";
      }
      if (this.formData.is_active === "") {
        this.errors.is_active = "Status is required";
      }

      // If there are errors, don't submit
      if (Object.values(this.errors).some(error => error !== "")) {
        return;
      }

      this.$emit('submit', { ...this.formData });
    },

    setErrors(serverErrors) {
      if (serverErrors) {
        Object.keys(serverErrors).forEach(key => {
          if (this.errors.hasOwnProperty(key)) {
            this.errors[key] = serverErrors[key][0];
          }
        });
      }
    }
  }
};
</script>

<style scoped>
/* Modal styling */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 100%;
  max-width: 500px;
  margin: 1rem;
  z-index: 1055;
}

.modal-lg .modal-container {
  max-width: 800px;
}

.modal-content {
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1rem 1rem 0;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.modal-body {
  padding: 1rem;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close::before {
  content: '×';
  font-weight: bold;
}

/* Mobile responsive */
@media (max-width: 576px) {
  .modal-container {
    margin: 0.5rem;
  }
  
  .btn {
    font-size: 0.875rem;
  }
}

@media (max-width: 575px) {
  .d-flex.flex-column.flex-sm-row .btn {
    width: 100%;
  }
}
</style>