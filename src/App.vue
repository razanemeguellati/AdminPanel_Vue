<template>
  <v-app>
    <v-main>
      <!-- Navbar -->
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Vue Test App</v-toolbar-title>
        <v-spacer> </v-spacer>

        <v-btn v-if="isAuthenticated" color="secondary" @click="logout">
          Logout
        </v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from "./authStore"; // Adjust the path based on your folder structure
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useAuthStore, ['token']),

    isAuthenticated() {
      // Check if the user is logged in based on the Pinia store
      return !!this.token;
    },
  },

  methods: {
    ...mapActions(useAuthStore, ['clearAuthData']),

    logout() {
      // Clear user data in the Pinia store and redirect to the login page
      this.clearAuthData();
      this.$router.push('/client/login');
    },
  },
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
