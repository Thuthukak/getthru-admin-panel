<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Service</h5>
              <button type="button" class="btn-close" @click="$emit('close')"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete the service: <strong>{{ service?.name }}</strong>?</p>
              <p class="text-danger"><small>This action cannot be undone.</small></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
              <button type="button" class="btn btn-danger" @click="confirmDelete" :disabled="isDeleting">
                <span v-if="isDeleting" class="spinner-border spinner-border-sm me-1"></span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'ServiceDeleteConfirmationModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    service: {
      type: Object,
      default: null
    },
    isDeleting: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close', 'confirm'],

  methods: {
    confirmDelete() {
      this.$emit('confirm', this.service);
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

.modal-footer {
  padding: 0 1rem 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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
  
  .modal-footer .btn {
    font-size: 0.875rem;
  }
}
</style>