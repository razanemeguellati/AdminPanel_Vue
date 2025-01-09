<template>
    <v-container>
      <v-card class="mx-auto my-12" max-width="400">
        <v-card-title>Reset Your Password</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handlePasswordReset">
            <v-text-field
              label="New Password"
              v-model="password"
              type="password"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="confirmPassword"
              type="password"
              outlined
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" block>Reset Password</v-btn>
          </v-form>
          <p v-if="error" class="red--text mt-2">{{ error }}</p>
          <p v-if="success" class="green--text mt-2">{{ success }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        password: "",
        confirmPassword: "",
        token: "",
        email: "",
        error: "",
        success: "",
      };
    },
    created() {
      // Extract token and email from the URL
      const fullPath = window.location.pathname;
      const tokenMatch = fullPath.match(/token=(.+?)(\?|$)/); // Extract token from path
      if (tokenMatch) {
        this.token = tokenMatch[1];
      }
  
      const urlParams = new URLSearchParams(window.location.search);
      this.email = urlParams.get("email");
    },
    methods: {
      async handlePasswordReset() {
        if (this.password !== this.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }
  
        try {
          const response = await axios.post(
            "http://192.168.1.17:8000/api/client/password-reset",
            {
              token: this.token, // Include the extracted token
              email: this.email,
              password: this.password,
              password_confirmation: this.confirmPassword,
            }
          );
  
          this.success = response.data.message || "Password reset successfully!";
          this.error = "";
        } catch (err) {
          this.error =
            err.response?.data?.message || "An error occurred. Please try again.";
          this.success = "";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styles if needed */
  </style>
  