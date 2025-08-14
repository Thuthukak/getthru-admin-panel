<template>
  <Layout>
    <section class="container mx-auto p-4">
      <div class="grid grid-cols-2 gap-6">
        <!-- Booking Queue -->
        <div class="border rounded-md p-4 overflow-y-auto max-h-96">
          <h2 class="text-xl font-bold mb-4">Queue</h2>
          <ul>
            <li v-for="booking in bookings" 
              :key="booking.id" 
              class="p-2 border-b"
              >
              <strong>{{ booking.reference }} - {{ booking.client_name }}</strong> 
              <br>
              Time Remaining: {{ formatTime(booking.timeRemaining) }}
            </li>
          </ul>
        </div>

        <!-- Check Position -->
        <div class="p-4 border rounded-md">
          <h2 class="text-xl font-bold mb-4">Check Position</h2>
          <input v-model="searchQuery" type="text" class="border p-2 w-full" placeholder="Enter Name or Reference">
          <button @click="searchQueue" class="mt-2 p-2 bg-blue-500 text-white w-full">Search</button>
          
          <div v-if="searchResult">
            <p>Your position: {{ searchResult.position }}</p>
            <p>Time remaining: {{ formatTime(searchResult.timeRemaining) }}</p>
          </div>
          
          <button @click="openBookingModal" class="mt-4 p-2 bg-green-500 text-white w-full">Book Now</button>
        </div>
      </div>
    </section>
  </Layout>
  <BookingModal :isOpen="showBookingModal" @close="closeBookingModal" />
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Layout from "../../Layouts/HomeLayout.vue";
import BookingModal from "@/components/Home/BookingModal.vue";

export default {
components: { Layout, BookingModal },

setup() {
  const bookings = ref([]);
  const searchQuery = ref("");
  const searchResult = ref(null);
  const showBookingModal = ref(false);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings");
      bookings.value = response.data;
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  const searchQueue = () => {
    const found = bookings.value.find((b, index) => 
      b.client_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      b.reference.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    if (found) {
      searchResult.value = {
        position: bookings.value.indexOf(found) + 1,
        remainingTime: found.remainingTime
      };
    } else {
      searchResult.value = null;
    }
  };

  const openBookingModal = () => {
    showBookingModal.value = true;
  };
  const closeBookingModal = () => {
    showBookingModal.value = false;
  };

  // Fetch queue every 60 seconds
  onMounted(() => {
    fetchBookings();
    setInterval(fetchBookings, 60000);
  });

  const formatTime = (minutes) => {
  const roundedMinutes = Math.max(0, Math.round(minutes)); // Ensure no negative values
  return `${Math.floor(roundedMinutes / 60)}h ${roundedMinutes % 60}m`;
};

  return {
    bookings,
    searchQuery,
    searchResult,
    showBookingModal,
    openBookingModal,
    closeBookingModal,
    searchQueue,
    formatTime
  };
}
};
</script>

<style scoped>
/* Add styling */
</style>
