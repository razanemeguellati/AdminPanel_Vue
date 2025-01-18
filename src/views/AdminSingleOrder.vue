<template>
    <v-container>
      <!-- Use v-if to ensure elements are rendered only after data is loaded -->
      <v-card v-if="order">
        <v-card-title>Order Details</v-card-title>
        <v-card-text>
          <p><strong>Order ID:</strong> {{ order.id }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
          <p><strong>Total Price:</strong> {{ order.price }}</p>
          <p><strong>Customer name:</strong> {{ order.user.name }}</p>
          <p><strong>Customer Email:</strong> {{ order.user.email }}</p>
          <br>
  
          <h4>Products of the order:</h4>
          <!-- Products Table -->
          <v-data-table
            :headers="productHeaders"
            :items="order.products"
            class="elevation-1"
            dense
          >
            <template v-slot:[`item.name`]="{ item }">
              {{ item.name }}
            </template>
            <template v-slot:[`item.quantity`]="{ item }">
              {{ item.quantity }}
            </template>
            <template v-slot:[`item.price`]="{ item }">
              {{ item.price }}
            </template>
          </v-data-table>
  
          <!-- Update Order Button -->
          <v-btn v-if="order.status=='pending'"
            color="primary" 
            @click="updateOrder" 
            block
          >
            Accept Order
          </v-btn>

           <!-- Delete Order Button -->
        <v-btn color="error" @click="deleteOrder" block>
          Delete Order
        </v-btn>


        </v-card-text>
      </v-card>
  
      
      <!-- Show a loading indicator while order data is being fetched -->
      <p v-else>Loading order details...</p>
    </v-container>
  </template>
  
  <script>
  import axios from "../axios"; // Adjust the path to your Axios instance
  
  export default {
    data() {
      return {
        order: null, // Initialize order as null
        productHeaders: [
          { text: "Product Name", value: "name" },
          { text: "Quantity", value: "quantity" },
          { text: "Price", value: "price" },
        ],
      };
    },
    methods: {
      async fetchOrder() {
        const orderId = this.$route.params.id; // Get order ID from route
        try {
          const response = await axios.get(`/admin/orders/${orderId}`);
          this.order = response.data.order; // Assign the fetched order data
        } catch (error) {
          console.error("Error fetching order details:", error);
          alert("Failed to fetch order details. Please try again.");
        }
      },

      async updateOrder() {
        if (confirm(`Are you sure you want to accept order #${this.order.id}?`)) {
          try {
            await axios.post(`/admin/orders/${this.order.id}/update-order`, {
              status: "accepted",
            });
            alert("Order status updated to accepted successfully!");
            this.fetchOrder(); // Refresh order data
          } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update the order status. Please try again.");
          }
        }
      },
    },

    async deleteOrder() {
        console.log(this.order.id);
      if (confirm("Are you sure you want to delete this order?")) {
        try {
          await axios.post(`/admin/orders/${this.order.id}/delete`);
          console.log(this.order.id);
          alert("Order deleted successfully!");
          this.$router.push("/admin/orders"); // Redirect to the orders list
        } catch (error) {
          console.error("Error deleting order:", error);
          alert("Failed to delete the order. Please try again.");
        }
      }
    },

    async created() {
      this.fetchOrder(); // Fetch the order data on component creation
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  