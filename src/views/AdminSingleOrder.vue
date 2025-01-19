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
        <br />

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

        <!-- Accept Order Button -->
        <v-btn
          v-if="order.status === 'pending'"
          color="primary"
          @click="dialog = 'accept'"
          block
        >
          Accept Order
        </v-btn>

        <!-- Delete Order Button -->
        <v-btn color="error" @click="dialog = 'delete'" block>
          Delete Order
        </v-btn>

        <!-- Dialog Component -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Confirm Action</v-card-title>
            <v-card-text>
              <div v-if="dialog === 'accept'">
                Are you sure you want to accept the order: <strong>{{ order.id }}</strong>?
              </div>
              <div v-else-if="dialog === 'delete'">
                Are you sure you want to delete the order: <strong>{{ order.id }}</strong>?
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="dialog === 'accept'"
                color="green"
                text
                @click="acceptOrder"
              >
                Yes
              </v-btn>
              <v-btn
                v-else-if="dialog === 'delete'"
                color="red"
                text
                @click="deleteOrder"
              >
                Yes
              </v-btn>
              <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dialog: false, // Dialog state (accept or delete)
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

    async acceptOrder() {
      try {
        await axios.post(`/admin/orders/${this.order.id}/update-order`, {
          status: "accepted",
        });
        
        this.dialog = false; // Close the dialog
        this.fetchOrder(); // Refresh order data
      } catch (error) {
        console.error("Error accepting order:", error);
        this.dialog = false; // Close the dialog even on error
        alert("Failed to accept the order. Please try again.");
      }
    },

    async deleteOrder() {
      try {
        await axios.post(`/admin/orders/${this.order.id}/delete`);
        
        this.dialog = false; 
        this.$router.push("/admin/orders"); // Redirect to the orders list
      } catch (error) {
        console.error("Error deleting order:", error);
        this.dialog = false; // Close the dialog even on error
        alert("Failed to delete the order. Please try again.");
      }
    },
  },

  async created() {
    this.fetchOrder(); // Fetch the order data on component creation
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
