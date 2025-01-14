<template>
  <v-container>
    <h1>Orders Management</h1>
    <p>Here you can manage all the orders.</p>

    <!-- Vuetify Data Table -->
    <v-card>
      <v-card-title>Orders List</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
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
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>



<script>
import axios from "../axios"; 

export default {
  data() {
    return {
      orders: [], 
      loading: false, 
      headers: [
        { text: "Order ID", value: "id" },
        { text: "Customer Name", value: "customer_name" },
        { text: "Total Price", value: "total_price" },
        { text: "Status", value: "status" },
        { text: "Created At", value: "created_at" },
      ],
    };
  },
  methods: {
   
    async fetchOrders() {
      this.loading = true; 
      try {
        const response = await axios.get("/admin/orders"); 
        this.orders = response.data.data; 
        console.log("Fetched Orders:", this.orders); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        this.loading = false; 
      }
    },
    // Navigate to single order page
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
