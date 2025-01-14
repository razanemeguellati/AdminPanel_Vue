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
export default {
  computed: {
    isAuthenticated() {
      // Check if the user is logged in
      return !!localStorage.getItem('token');
    },
  },

  methods: {
    logout() {
      // Clear user data and redirect to the login page
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('clientEmail');
      localStorage.removeItem('clientId');
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
