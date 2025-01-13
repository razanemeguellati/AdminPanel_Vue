<template>
  
  <v-container>
    <h1>Products Management</h1>
    <p>Here you can manage all the products.</p>
    <v-card>
      <v-card-title>Products</v-card-title>

      <v-card-title>
        <v-spacer></v-spacer>
        <!-- Search Field -->
        <div style="display: flex; align-items: center; gap: 16px;">
          <v-text-field
            v-model="search"
            label="Search"
            outlined
            dense
            hide-details
            style="max-width: 200px"
          ></v-text-field>
          <v-btn color="primary" @click="handleSearch">Search</v-btn>

          <!-- Category Filter -->
          <v-select
            v-model="selectedCategory"
            :items="categories"
            :item-props="true"
            label="Category"
            outlined
            dense
            hide-details
            style="max-width: 200px;"
          ></v-select>
          <v-btn color="primary" @click="handleCategoryFilter">Filter</v-btn>

          <!-- Create Product Button -->
          <router-link to="/admin/products/create" class="blue--text">
            <v-btn color="primary">
              Create New Product
            </v-btn>
          </router-link>
        </div>
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
            <v-btn text color="primary" @click="viewProduct(item.id)">
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
      search: "", // Search term
      selectedCategory: null, // Will hold the selected category's value (1 or 2)
      categories: [  1 ,  2  ], // Categories list
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
    // Function to fetch products with filters
    async fetchProducts() {
      this.loading = true; // Start loading
      try {
        const response = await axios.get(
          `/admin/products?category=${this.selectedCategory || ""}&search=${this.search}&page=1`
        );
        this.products = response.data.data; // Assign products to the data property
        console.log("Fetched Products:", this.products); // Debugging
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Handle Search Button
    handleSearch() {
      this.fetchProducts();
    },

    // Handle Category Filter Button
    handleCategoryFilter() {
      this.fetchProducts();
    },

    viewProduct(id) {
      // Navigate to the product details page with the product ID
      this.$router.push(`/admin/products/${id}`);
    },
  },

  created() {
    this.fetchProducts(); // Fetch products on component creation
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
