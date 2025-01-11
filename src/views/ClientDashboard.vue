<template>
  <v-container>
    <h1>Client Dashboard</h1>
    <p>Welcome, {{ clientEmail }}!</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clientEmail: "", // Email of the logged-in client
    };
  },
  created() {
    // Retrieve the email from localStorage
    this.clientEmail = localStorage.getItem("clientEmail");

    // Optional: Add a fallback in case the email is missing
    // if (!this.clientEmail) {
    //   this.clientEmail = "Client"; // Default value if email is not found
    // }
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
