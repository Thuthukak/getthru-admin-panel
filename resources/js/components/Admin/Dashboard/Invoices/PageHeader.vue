<template>
  <div class="page-header">
    <h1 class="page-title">Invoice Management</h1>
    <div class="header-actions">
      <button 
        @click="$emit('generate-recurring')" 
        class="btn btn-outline"
        :disabled="loading"
      >
        Generate Recurring
      </button>
      <button 
        @click="$emit('send-automatic')" 
        class="btn btn-outline"
        :disabled="loading"
      >
        Send Automatic
      </button>
      <button 
        @click="$emit('mark-overdue')" 
        class="btn btn-outline"
        :disabled="loading"
      >
        Mark Overdue
      </button>
      <button 
        @click="$emit('create-invoice')" 
        class="btn btn-primary"
      >
        Create Invoice
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['generate-recurring', 'send-automatic', 'mark-overdue', 'create-invoice']
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
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

.btn-primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  border-color: #2563eb;
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

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>