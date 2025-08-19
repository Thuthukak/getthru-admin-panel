<template>
  <div class="toast-container">
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      :class="`toast toast-${toast.type}`"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastNotifications',
  props: {
    toasts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  animation: slideIn 0.3s ease;
}

.toast-success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.toast-error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.toast-info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .toast-container {
    left: 10px;
    right: 10px;
  }
  
  .toast {
    max-width: none;
  }
}
</style>