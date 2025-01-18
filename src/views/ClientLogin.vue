<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title>Client Login</v-card-title>
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
        <p v-if="error" class="red--text mt-2">{{ error }}</p>
        <!-- Forgot Password Link -->
        <p class="mt-4">
          <router-link to="/client/forgot-password" class="blue--text">
            Forgot Password?
          </router-link>
        </p>
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
          "http://192.168.1.17:8000/api/client/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        // Extract token and role
        const { token, role } = response.data.user;
        console.log( response.data.user)
        // Save token, email, role, and client ID in localStorage
        // localStorage.setItem("token", token);
        // localStorage.setItem("clientEmail", this.email); // Corrected from `this.form.email`
        // localStorage.setItem("role", role || "client"); // Default role is 'client'
        // localStorage.setItem("clientId", response.data.user.id); // Save client ID

        const authStore = useAuthStore();
          authStore.setAuthData(
          token, // Token
          this.email, // Email 
          "client" // role 
        );

        // Redirect to client dashboard
        this.$router.push("/client/dashboard");
      } catch (err) {
        this.error = "Invalid login credentials"; // Display error message
        console.error(err); // Log error for debugging
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
