<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Create New Product</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleCreateProduct">
          <!-- Name with Validation -->
          <v-text-field
            v-model="form.name"
            label="Product Name"
            outlined
            :error-messages="errors.name"
            required
          ></v-text-field>

          <!-- Description -->
          <v-textarea
            v-model="form.description"
            label="Product Description"
            outlined
            required
          ></v-textarea>

          <!-- Price with Validation -->
          <v-text-field
            v-model="form.price"
            label="Price"
            type="number"
            outlined
            :error-messages="errors.price"
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
            :class="{ 'switch-on': form.in_stock, 'switch-off': !form.in_stock }"
          ></v-switch>

          <!-- File Upload -->
          <v-file-input
            v-model="form.files"
            label="Upload Files"
            accept="image/*"
            multiple
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
        files: [], // Updated to accept multiple files as an array
      },
      errors: {
        name: [],
        price: [],
      }, // To display validation errors
      categories: [
        { title: "first category", value: 1 },
        { title: "second category", value: 2 },
      ], // Categories list
      error: "", // To display errors
    };
  },
  methods: {
    validateName(value) {
      if (!value) return "The product name is required.";
      if (value.length < 3)
        return "The product name must be at least 3 characters long.";
      return "";
    },
    validatePrice(value) {
      if (value === "" || value === null) return "The price is required.";
      if (value < 0) return "The price cannot be negative.";
      return "";
    },
    async handleCreateProduct() {
      // Check for errors before submission
      if (this.errors.name.length > 0 || this.errors.price.length > 0) {
        this.error = "Please fix the validation errors before submitting.";
        return;
      }

      const formData = new FormData();
      Object.keys(this.form).forEach((key) => {
        if (key === "files" && this.form.files.length > 0) {
          this.form.files.forEach((file) => {
            formData.append("file[]", file); // Append multiple files as an array
          });
        } else {
          formData.append(key, this.form[key]);
        }
      });

      try {
        const response = await axios.post("/admin/create-product", formData, {
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
          err.response?.data?.message ||
          "Failed to create the product. Please try again.";
      }
    },
  },
  watch: {
    "form.name"(newValue) {
      this.errors.name = this.validateName(newValue) ? [this.validateName(newValue)] : [];
    },
    "form.price"(newValue) {
      this.errors.price = this.validatePrice(newValue) ? [this.validatePrice(newValue)] : [];
    },
  },
};
</script>

<style scoped>
/* Add styles for the switches */
.switch-on .v-input__control {
  background-color: green !important;
}

.switch-off .v-input__control {
  color: red !important;
}
</style>
