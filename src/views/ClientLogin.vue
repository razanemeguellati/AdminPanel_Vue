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
        const response = await axios.post(
          'http://192.168.1.17:8000/api/client/login',
          {
            email: this.email,
            password: this.password,
          }
        );
        const { token } = response.data.user;
        localStorage.setItem('token', token );
        localStorage.setItem("clientEmail", this.email);
        this.$router.push('/client/dashboard');
      } catch (err) {
        this.error = 'Invalid login credentials';
      }
    },
  },
};
</script>
