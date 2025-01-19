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
            style="max-width: 400px"
            @input="debouncedFetchProducts"
          ></v-text-field>

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
            @input="debouncedFetchProducts"
          ></v-select>

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

        <!-- Pagination Controls -->
        <v-pagination
          v-model="pagination.currentPage" 
          :length="pagination.lastPage" 
          @input="fetchProducts"
        ></v-pagination>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "../axios"; // Adjust the path to your axios instance
import _ from "lodash"; // Import Lodash for debouncing

export default {
  data() {
    return {

      products: [], 
      search: "", 

      selectedCategory: null, // Will hold the selected category's value (1 or 2)
      categories: [1, 2], 
      loading: false,

      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "In Stock", value: "in_stock" },
      ],

      pagination: {
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0,
      },
    };
  },


  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get(
          `/admin/products?category=${this.selectedCategory || ""}&search=${this.search}&page=${this.pagination.currentPage}`
        );
        console.log(`/admin/products?category=${this.selectedCategory || ""}&search=${this.search}&page=${this.pagination.currentPage}`
        )
        this.products = response.data.data;
        this.pagination = {
          currentPage: response.data.pagination.currentPage,
          lastPage: response.data.pagination.lastPage,
          perPage: response.data.pagination.perPage,
          total: response.data.pagination.total,
        };

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },

    viewProduct(id) {
      // Navigate to the product details page when clicking on the product
      this.$router.push(`/admin/products/${id}`);
    },
  },

  created() {
    // Debounced version of fetchProducts to handle real-time filtering
    this.debouncedFetchProducts = _.debounce(this.fetchProducts, 300);
    this.fetchProducts(); // Fetch products on component creation
    console.log(this.selectedCategory)
  },

  // watching the variable that change and fire the debounced fetch 
  watch: {
    search: "debouncedFetchProducts", //  search changes
    selectedCategory: "debouncedFetchProducts", // category changes
    "pagination.currentPage": "fetchProducts", // pagination changes
  },


};
</script>


<style scoped>
</style>
