<template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title>Create New Product</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleCreateProduct">
            <!-- Name -->
            <v-text-field
              v-model="form.name"
              label="Product Name"
              outlined
              required
            ></v-text-field>
  
            <!-- Description -->
            <v-textarea
              v-model="form.description"
              label="Product Description"
              outlined
              required
            ></v-textarea>
  
            <!-- Price -->
            <v-text-field
              v-model="form.price"
              label="Price"
              type="number"
              outlined
              required
            ></v-text-field>
  
            <!-- Quantity -->
            <v-text-field
              v-model="form.quantity"
              label="Quantity"
              type="number"
              outlined
              required
            ></v-text-field>
  
            <!-- Category -->
            <v-select
              v-model="form.category_id"
              :items="categories"
              item-text="text"
              item-value="value"
              label="Category"
              outlined
              required
            ></v-select>
  
            <!-- In Stock -->
            <v-switch
              v-model="form.in_stock"
              label="In Stock"
              inset
            ></v-switch>
  
            <!-- In Order -->
            <v-switch
              v-model="form.in_order"
              label="In Order"
              inset
            ></v-switch>
  
            <!-- File Upload -->
            <v-file-input
              v-model="form.file"
              label="Upload File"
              accept="image/*"
              outlined
            ></v-file-input>
  
            <!-- Submit Button -->
            <v-btn type="submit" color="primary" block>Create Product</v-btn>
          </v-form>
          <p v-if="error" class="red--text mt-4">{{ error }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "../axios"; // Adjust the path to your axios instance
  
  export default {
    data() {
      return {
        form: {
          name: "",
          description: "",
          price: "",
          quantity: "",
          category_id: null,
          in_stock: true,
          in_order: false,
          file: null,
        },
        categories: [
          { text: "Category 1", value: 1 },
          { text: "Category 2", value: 2 },
          { text: "Category 3", value: 3 },
        ], // Adjust based on your categories
        error: "", // To display errors
      };
    },
    methods: {
      async handleCreateProduct() {
        const formData = new FormData();
        Object.keys(this.form).forEach((key) => {
          if (key === "file" && this.form[key]) {
            formData.append(key, this.form[key]);
          } else {
            formData.append(key, this.form[key]);
          }
        });
  
        try {
          const response = await axios.post("/admin/products/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Product Created:", response.data);
  
          // Navigate back to the products list or display success message
          alert("Product created successfully!");
          this.$router.push("/admin/products");
        } catch (err) {
          console.error("Error creating product:", err.response || err);
          this.error =
            err.response?.data?.message || "Failed to create the product. Please try again.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  