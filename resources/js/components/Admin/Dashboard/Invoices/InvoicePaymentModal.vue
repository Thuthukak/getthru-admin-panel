<template>
    <div v-if="showPaymentModalFlag" class="modal-overlay" @click="closePaymentModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Record Payment</h3>
          <button @click="closePaymentModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="recordPayment">
            <div class="form-group">
              <label>Amount *</label>
              <input 
                v-model="paymentForm.amount" 
                type="number" 
                step="0.01" 
                :max="selectedInvoice?.balance"
                required 
                class="form-input" 
              />
              <small>Maximum: R{{ selectedInvoice?.balance }}</small>
            </div>
            
            <div class="form-group">
              <label>Payment Method</label>
              <input v-model="paymentForm.payment_method" type="text" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Notes</label>
              <textarea v-model="paymentForm.payment_notes" class="form-textarea" rows="3"></textarea>
            </div>

            <div class="modal-footer">
              <button type="button" @click="closePaymentModal" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Recording...' : 'Record Payment' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'

export default {
  name: 'InvoicePaymentModal',
  props: {
    showPaymentModalFlag: {
      type: Boolean,
      default: false
    },
    selectedInvoice: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const saving = ref(false)
    const paymentForm = reactive({
      amount: 0,
      payment_method: '',
      payment_notes: ''
    })

    const closePaymentModal = () => {
      emit('close')
    }

    const recordPayment = async () => {
      saving.value = true
      try {
        await api.post(`/${props.selectedInvoice.id}/record-payment`, paymentForm)
        closePaymentModal()
        loadInvoices()
        loadStatistics()
      } catch (error) {
        console.error('Error recording payment:', error)
      } finally {
        saving.value = false
      }
    }

    return {
      saving,
      paymentForm,
      closePaymentModal,
      recordPayment
    }
  }
}
</script>