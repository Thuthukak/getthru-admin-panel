<template>
  <div class="pagination">
    <button 
      @click="$emit('change-page', pagination.current_page - 1)"
      :disabled="pagination.current_page <= 1"
      class="btn btn-outline btn-sm"
    >
      Previous
    </button>
    <span class="page-info">
      Page {{ pagination.current_page }} of {{ pagination.last_page }}
      ({{ pagination.total }} total)
    </span>
    <button 
      @click="$emit('change-page', pagination.current_page + 1)"
      :disabled="pagination.current_page >= pagination.last_page"
      class="btn btn-outline btn-sm"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  emits: ['change-page']
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px;
}

.page-info {
  color: #6b7280;
  font-size: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-outline:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}
</style>