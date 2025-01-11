<template>
  <v-container>
    <v-card>
      <v-card-title>Product Details</v-card-title>
      <v-card-text>
        <p><strong>ID:</strong> {{ product.id }}</p>
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Category:</strong> Category {{ product.category_id }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Price:</strong> {{ product.price }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity }}</p>
        <p><strong>In Stock:</strong> {{ product.in_stock ? "Yes" : "No" }}</p>
        <p><strong>In Order:</strong> {{ product.in_order ? "Yes" : "No" }}</p>

        <!-- Display Images -->
        <div>
          <p><strong>Images:</strong></p>
          <div v-if="product.file && product.file.length">
            <v-row dense>
              <v-col
                v-for="(image, index) in product.file"
                :key="index"
                cols="12"
                md="4"
              >
                <v-img
                  :src="getImageUrl(image)"
                  alt="Product Image"
                  class="mb-2"
                  max-height="150"
                ></v-img>
              </v-col>
            </v-row>
          </div>
          <p v-else>No images available for this product.</p>
        </div>

        <!-- Delete Product Button -->
        <v-btn color="error" @click="deleteProduct" block>Delete Product</v-btn>
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
  methods: {
    getImageUrl(image) {
      // Construct the full URL for the image
      return `http://192.168.1.17:8000/api/admin/products/${image}`; // Replace with your actual backend URL
    },
    async deleteProduct() {
      const productId = this.$route.params.id; // Get product ID from the route
      const confirmDelete = confirm(
        `Are you sure you want to delete the product: ${this.product.name}?`
      ); // Ask for user confirmation

      if (!confirmDelete) {
        return; // Exit if user cancels
      }

      try {
        const response = await axios.post(
          `/admin/products/${productId}/delete-product`
        );
        console.log("Delete Response:", response.data);

        // Navigate back to the products list or display a success message
        alert("Product deleted successfully!");
        this.$router.push("/admin/products");
      } catch (error) {
        console.error("Error deleting product:", error.response || error);
        alert("Failed to delete the product. Please try again.");
      }
    },
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
