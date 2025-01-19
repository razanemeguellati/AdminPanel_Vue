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
        <!-- Display error messages -->
        <p v-if="error" class="red--text mt-2">{{ error }}</p>
        <!-- Forgot Password Link -->
        <p class="mt-4">
          <router-link to="/client/forgot-password" class="blue--text">
            Forgot Password?
          </router-link>
        </p>
      </v-card-text>
    </v-card>

    <!-- Dialog for Error Message -->
    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="errorDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      error: "", // To display error messages
      errorDialog: false, // Dialog state for error message
      errorMessage: "", // Specific error message to display in the dialog
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

        // If login is successful, extract token and role
        if (response.data.user) {
          const { token, role } = response.data.user;

          const authStore = useAuthStore();
          authStore.setAuthData(
            token, // Token
            this.email, // Email
            "client" // Role
          );

          // Redirect to client dashboard
          this.$router.push("/client/dashboard");
        } else if (response.data.message) {
          // If blocked, show the error message in the dialog
          this.errorMessage = response.data.message;
          this.errorDialog = true;
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          // Display the specific error message from the response
          this.errorMessage = err.response.data.message;
          this.errorDialog = true; // Open the dialog
        } else {
          // Fallback generic error message
          this.errorMessage = "Invalid login credentials";
          this.errorDialog = true; // Open the dialog
        }
        console.error(err); // Log error for debugging
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
