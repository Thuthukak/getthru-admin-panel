<template>
  <div class="bulk-actions">
    <span>{{ selectedCount }} selected</span>
    <button @click="$emit('send-bulk')" class="btn btn-outline">
      Send Selected
    </button>
    <button @click="$emit('clear-selection')" class="btn btn-outline">
      Clear Selection
    </button>
  </div>
</template>

<script>
export default {
  name: 'BulkActions',
  props: {
    selectedCount: {
      type: Number,
      required: true
    }
  },
  emits: ['send-bulk', 'clear-selection']
}
</script>

<style scoped>
.bulk-actions {
  background: #f3f4f6;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
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

.btn-outline {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-outline:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

@media (max-width: 768px) {
  .bulk-actions {
    flex-direction: column;
    gap: 10px;
    align-items: start;
  }
}
</style>