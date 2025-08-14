<template>
  <div 
    v-if="isModalOpen" 
    class="modal fade show d-block" 
    tabindex="-1" 
    role="dialog"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header d-flex justify-content-between align-items-center">
          <h5 class="modal-title">Book</h5>
          <button type="button" class="close ms-auto" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div v-if="errorMessages.length" class="alert alert-danger">
            <ul>
              <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
            </ul>
          </div>

          <form @submit.prevent="submitForm">
            <div class="row">
                  <div class="col-md-6 mt-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="form.name" type="text" class="form-control" placeholder="Name">
                  </div>

                  <div class="col-md-6 mt-3">
                    <label for="phoneNumber" class="form-label">Phone Number (Optional)</label>
                    <input v-model="form.phoneNumber" type="text" class="form-control" placeholder="Phone Number">
                  </div>
     
                  <div class="col-md-6 mt-3">
                    <label for="email" class="form-label">Email (Optional)</label>
                    <input v-model="form.email" type="email" class="form-control" placeholder="Email">
                  </div>
                
                  <div class="col-md-6 mt-3">
                    <label for="service_id" class="form-label">Select Service</label>
                    <select v-model="form.service_id" class="border rounded px-3 py-2 w-full">
                      <option value="" disabled>Select a service</option>
                      <option v-for="service in services" :key="service.id" :value="service.id">
                        {{ service.name }} - {{ service.duration }} mins 
                      </option>
                    </select>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label for="barber_id" class="form-label">Preferred Barber</label>
                    <select v-model="form.barber_id" class="border rounded px-3 py-2 w-full">
                      <option value="" disabled>Select a Barber</option>
                      <option v-for="barber in barbers" :key="barber.id" :value="barber.id">
                        {{ barber.user.name }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="mt-4">
                  <button type="submit" class="btn btn-primary">Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  props: {
    isOpen: Boolean
  },

  emits: ["close"],
  
  setup(props, { emit }) {
    const form = ref({
      name: '',
      phoneNumber: '',
      email: '',
      service_id: '',
      barber_id: '',
    });

    const services = ref([]);
    const barbers = ref([]);
    const errorMessages = ref([]);
    const isModalOpen = computed(() => props.isOpen);

    const closeModal = () => {
      emit('close');
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
        services.value = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchBarbers = async () => {
      try {
        const response = await axios.get("/api/barbers");
        barbers.value = response.data;
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };

    const submitForm = async () => {
      try {
        const response = await axios.post('/book', form.value);
        
        console.log(response.data);

        // Reset form
        form.value = {
          name: '',
          phoneNumber: '',
          email: '',
          service_id: '',
          barber_id: '',
        };

        // Close modal
        closeModal();
      } catch (error) {
        if (error.response && error.response.data.errors) {
          errorMessages.value = Object.values(error.response.data.errors).flat();
        } else {
          console.error("Error submitting form:", error);
        }
      }
    };

    onMounted(() => {
      fetchServices();
      fetchBarbers();
    });

    return {
      form,
      services,
      barbers,
      errorMessages,
      isModalOpen,
      closeModal,
      submitForm
    };
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.close {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
