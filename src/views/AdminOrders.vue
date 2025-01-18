<template>
  <v-container>
    <h1>Orders Management</h1>
    <p>Here you can manage all the orders.</p>

    <!-- Vuetify Data Table -->
    <v-card>
      <v-card-title>Orders List</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="ordersheaders"
          :items="orders"
          :loading="loading"
          loading-text="Loading orders..."
          class="elevation-1"
          dense
        >
          <!-- Link to Single Order Page -->
          <template v-slot:[`item.id`]="{ item }">
            <v-btn
              text
              color="primary"
              @click="viewOrder(item.id)"
            >
              Order #{{ item.id }}
            </v-btn>
          </template>
         
          <template v-slot:[`item.status`]="{ item }">
            {{ item.status }}
          </template>
         
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "../axios"; // Adjust the path to your Axios instance

export default {
  data() {
    return {
      orders: [], // Orders data
      loading: false, // Indicates loading state
      ordersheaders: [
        { text: "Order ID", value: "id" },
        { text: "Customer Name", value: "user.name" }, // Ensure this matches your API response
        { text: "Status", value: "status" },
   
      ],
    };
  },
  methods: {
    async fetchOrders() {
      this.loading = true; // Start loading
      try {
        const response = await axios.get("/admin/orders"); // Adjust API endpoint
        this.orders = response.data.data; // Map API response
        console.log("Fetched Orders:", this.orders); // Debugging
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },
    viewOrder(orderId) {
      this.$router.push(`/admin/orders/${orderId}`); // Navigate to order details page
    },
  },
  created() {
    this.fetchOrders(); // Fetch orders on component creation
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
