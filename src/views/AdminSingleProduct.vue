<template>
    <v-container>
      <v-card>
        <v-card-title>Product Details</v-card-title>
        <v-card-text>
          <p><strong>ID:</strong> {{ product.id }}</p>
          <p><strong>Name:</strong> {{ product.name }}</p>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Price:</strong> {{ product.price }}</p>
          <p><strong>Quantity:</strong> {{ product.quantity }}</p>
          <p><strong>In Stock:</strong> {{ product.in_stock ? "Yes" : "No" }}</p>
          <p><strong>In Order:</strong> {{ product.in_order ? "Yes" : "No" }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "../axios"; // Adjust the path to your Axios instance
  
  export default {
    data() {
      return {
        product: {}, // Product data
      };
    },
    async created() {
      const productId = this.$route.params.id; // Get product ID from the route
      try {
        const response = await axios.get(`/admin/products/${productId}`);
        this.product = response.data.data; // Assign the 'data' key from the response to product
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  