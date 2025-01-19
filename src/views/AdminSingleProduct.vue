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
        <v-btn color="error" @click="dialog = true" block>Delete Product</v-btn>

        <!-- Delete Confirmation Dialog -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">
              Confirm Deletion
            </v-card-title>
            <v-card-text>
              Are you sure you want to delete the product: <strong>{{ product.name }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="handleDelete">Yes</v-btn>
              <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dialog: false, // Dialog state
    };
  },
  methods: {
    getImageUrl(image) {
      // Construct the full URL for the image
      return `http://192.168.1.17:8000/api/admin/products/${image}`; // Replace with your actual backend URL
    },
    async handleDelete() {
      const productId = this.$route.params.id; // Get product ID from the route

      try {
        const response = await axios.post(
          `/admin/products/${productId}/delete-product`
        );
        console.log("Delete Response:", response.data);

        // Close the dialog and navigate back to the products list
        this.dialog = false;
        alert("Product deleted successfully!");
        this.$router.push("/admin/products");
      } catch (error) {
        console.error("Error deleting product:", error.response || error);
        this.dialog = false;
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
