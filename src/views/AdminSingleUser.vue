<template>
    <v-container>
      <h1>User Details</h1>
      <v-card>
        <v-card-text>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Status:</strong> {{ user.status }}</p>
          <p><strong>Role:</strong> {{ user.role.name }}</p>
        </v-card-text>
      </v-card>
  
      <!-- Buttons for Delete and Block -->
      <v-btn color="error" @click="deleteUser" block>Delete User</v-btn>
      <v-btn
        :color="user.status === 'active' ? 'warning' : 'success'"
        @click="toggleBlockUser"
        block
      >
        {{ user.status === 'active' ? 'Block User' : 'Unblock User' }}
      </v-btn>
    </v-container>
  </template>
  
  <script>
  import axios from "../axios";
  
  export default {
    data() {
      return {
        user: {}, // Single user data
      };
    },
    methods: {
      // Fetch user details
      async fetchUser() {
        const userId = this.$route.params.id; // Get user ID from route params
        try {
          const response = await axios.get(`/admin/users/${userId}/get`);
          this.user = response.data.user; // Assign the user data
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      },
      // Delete user
      async deleteUser() {
        const confirmDelete = confirm(
          `Are you sure you want to delete user: ${this.user.name}?`
        );
        if (!confirmDelete) return;
  
        try {
          await axios.post(`/admin/users/${this.user.id}/delete`);
          alert("User deleted successfully!");
          this.$router.push("/admin/users"); // Navigate back to users list
        } catch (error) {
          console.error("Error deleting user:", error.response || error);
          alert("Failed to delete the user. Please try again.");
        }
      },
      // Block/Unblock user
      async toggleBlockUser() {
        const confirmBlock = confirm(
          `Are you sure you want to ${
            this.user.status === "active" ? "block" : "unblock"
          } user: ${this.user.name}?`
        );
        if (!confirmBlock) return;
  
        try {
          const response = await axios.post(
            `/admin/users/${this.user.id}/${
              this.user.status === "active" ? "block" : "unblock"
            }`
          );
          this.user.status = response.data.status; // Update user status
          alert(
            `User ${
              this.user.status === "active" ? "unblocked" : "blocked"
            } successfully!`
          );
        } catch (error) {
          console.error("Error toggling user block status:", error.response || error);
          alert("Failed to change the user's status. Please try again.");
        }
      },
    },
    async created() {
      this.fetchUser(); // Fetch user details on page load
    },
  };
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  