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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://192.168.1.17:8000/api/admin/login', {
            email: this.email,
            password: this.password,
          });
          // setting the local storage items
          localStorage.setItem('token', response.data.user.token);
          localStorage.setItem('role', 'admin');
          this.$router.push('/admin/dashboard');
        } catch (err) {
          this.error = 'Invalid login credentials';
        }
      },
    },
  };
  </script>
  