<template>
    <v-container>
      <v-card class="mx-auto my-12" max-width="400">
        <v-card-title>Forgot Password</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleForgotPassword">
            <v-text-field
              label="Email"
              v-model="email"
              type="email"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" block>Submit</v-btn>
          </v-form>
          <p v-if="message" class="green--text mt-2">{{ message }}</p>
          <p v-if="error" class="red--text mt-2">{{ error }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        message: '',
        error: '',
      };
    },
    methods: {
      async handleForgotPassword() {
        try {
          const response = await axios.post(
            'http://192.168.1.17:8000/api/client/forgot-password',
            {
              email: this.email,
            }
          );
          this.message = response.data.message || 'Password reset link sent!';
          this.error = '';
        } catch (err) {
          this.error =
            err.response?.data?.message || 'An error occurred. Please try again.';
          this.message = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styles if needed */
  </style>
  