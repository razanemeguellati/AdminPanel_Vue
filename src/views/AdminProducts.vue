<template>
  <v-container>
    <v-card>
      <v-card-title>Products</v-card-title>

      <v-card-title>
        Products
        <v-spacer></v-spacer>
        <!-- Search Field -->
        <v-text-field
          v-model="search"
          label="Search"
          outlined
          dense
          hide-details
          @input="fetchProducts"
          style="max-width: 200px"
        ></v-text-field>

        <!-- Category Filter -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Category"
          outlined
          dense
          hide-details
          style="max-width: 200px; margin-left: 16px;"
          @change="fetchProducts"
        ></v-select>

        <!-- Create Product Button -->
        <p class="mt-4">
        <router-link to="/admin/products/create" class="blue--text">
          <v-btn color="primary" class="ml-4">
            Create New Product
            </v-btn>
          </router-link>
        </p>

      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="products"
          :loading="loading"
          loading-text="Loading products..."
          class="elevation-1"
          item-value="id"
          dense
        >
          <template v-slot:[`item.name`]="{ item }">
            <v-btn
              text
              color="primary"
              @click="viewProduct(item.id)"
            >
              {{ item.name }}
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "../axios"; // Adjust the path to your axios instance

export default {
  data() {
    return {
      products: [], // Array to store the product list
      loading: false, // Indicates loading state
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "In Stock", value: "in_stock" },
      ],
    };
  },
  
  methods: {
    // function to fetch all products 
    async fetchProducts() {
      this.loading = true; // Start loading
      try {
        const response = await axios.get(
          "/admin/products?category=&search=&page=1"
        );
        this.products = response.data.data; // Assign products to the data property
        console.log("Fetched Products:", this.products); // Debugging
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    viewProduct(id) {
      // Navigate to the product details page with the product ID
      this.$router.push(`/admin/products/${id}`);
    },
  },

  created() {
    this.fetchProducts(); // Fetch products on component creation (useEffect)
  },

  
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
