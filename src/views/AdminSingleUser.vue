<template>
  <v-container>
    <!-- Use v-if to ensure elements are rendered only after data is loaded -->
    <v-card v-if="user">
      <v-card-title>User Details</v-card-title>
      <v-card-text>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Status:</strong> {{ user.status }}</p>
        <p><strong>Role:</strong> {{ user.role?.name || "N/A" }}</p>

        <!-- Delete User Button -->
        <v-btn color="error" @click="deleteUser" block>Delete User</v-btn>

        <!-- Block User Button -->
        <v-btn
          v-if="user.status === 'active'"
          color="warning"
          @click="blockUser"
          block
        >
          Block User
        </v-btn>

        <!-- Activate User Button -->
        <v-btn
          v-if="user.status === 'blocked'"
          color="success"
          @click="activateUser"
          block
        >
          Activate User
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Show a loading indicator while user data is being fetched -->
    <p v-else>Loading user details...</p>
  </v-container>
</template>

<script>
import axios from "../axios"; // Adjust the path to your Axios instance

export default {
  data() {
    return {
      user: null, // Initialize user as null
    };
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.id; // Get user ID from route
      try {
        const response = await axios.get(`/admin/users/${userId}/get`);
        this.user = response.data.user; // Assign the fetched user data
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Failed to fetch user details. Please try again.");
      }
    },
    async deleteUser() {
      if (confirm(`Are you sure you want to delete user ${this.user.name}?`)) {
        try {
          await axios.delete(`/admin/users/${this.user.id}`);
          alert("User deleted successfully!");
          this.$router.push("/admin/users");
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete the user.");
        }
      }
    },
    async blockUser() {
      if (confirm(`Are you sure you want to block user ${this.user.name}?`)) {
        try {
          await axios.post(`/admin/users/${this.user.id}/block`);
          alert("User blocked successfully!");
          this.fetchUser(); // Refresh user data
        } catch (error) {
          console.error("Error blocking user:", error);
          alert("Failed to block the user.");
        }
      }
    },
    async activateUser() {
      if (confirm(`Are you sure you want to activate user ${this.user.name}?`)) {
        try {
          console.log(this.user.id);
          await axios.post(`/admin/users/${this.user.id}/active`);
          alert("User has been activated successfully!");
          this.fetchUser(); // Refresh user data
        } catch (error) {
          console.error("Error activating user:", error);
          alert("Failed to activate the user.");
        }
      }
    }

  },
  async created() {
    this.fetchUser(); // Fetch the user data on component creation
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
