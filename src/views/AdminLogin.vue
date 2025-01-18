<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title>Admin Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
        <p v-if="error" class="red--text">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../authStore"; // Ensure the path matches where your auth store is located

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          "http://192.168.1.17:8000/api/admin/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        // Use the Pinia store to store authentication data
        const authStore = useAuthStore();
        authStore.setAuthData(
          response.data.user.token, // Token
          this.email, // Email from the form input
          "admin" // Explicitly set role to admin
        );

        // Redirect to admin dashboard
        this.$router.push("/admin/dashboard");
      } catch (err) {
        console.error(err);
        this.error = "Invalid login credentials.";
      }
    },
  },
};
</script>
