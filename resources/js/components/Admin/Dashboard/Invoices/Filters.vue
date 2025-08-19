<template>
  <div class="filters-section">
    <div class="filters-row">
      <div class="filter-group">
        <input 
          :value="filters.search"
          @input="updateFilter('search', $event.target.value)"
          placeholder="Search invoices..."
          class="input-field"
        >
      </div>
      <div class="filter-group">
        <select 
          :value="filters.status"
          @change="updateFilter('status', $event.target.value)"
          class="select-field"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="filter-group">
        <select 
          :value="filters.service_type"
          @change="updateFilter('service_type', $event.target.value)"
          class="select-field"
        >
          <option value="">All Services</option>
          <option value="Home Internet">Home Internet</option>
          <option value="Business Internet">Business Internet</option>
        </select>
      </div>
      <div class="filter-group">
        <input 
          :value="filters.date_from"
          @change="updateFilter('date_from', $event.target.value)"
          type="date"
          class="input-field"
        >
      </div>
      <div class="filter-group">
        <input 
          :value="filters.date_to"
          @change="updateFilter('date_to', $event.target.value)"
          type="date"
          class="input-field"
        >
      </div>
      <div class="filter-group">
        <label class="checkbox-label">
          <input 
            :checked="filters.overdue"
            @change="updateFilter('overdue', $event.target.checked)"
            type="checkbox"
          >
          Overdue Only
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  emits: ['update:filters', 'apply-filters', 'search'],
  methods: {
    updateFilter(key, value) {
      const updatedFilters = { ...this.filters, [key]: value }
      this.$emit('update:filters', updatedFilters)
      
      if (key === 'search') {
        this.$emit('search')
      } else {
        this.$emit('apply-filters')
      }
    }
  }
}
</script>

<style scoped>
.filters-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: end;
}

.filter-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 5px;
}

.input-field,
.select-field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.input-field:focus,
.select-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

@media (max-width: 768px) {
  .filters-row {
    grid-template-columns: 1fr;
  }
}
</style>