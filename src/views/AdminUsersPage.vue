<template>
  <v-container>
    <h1>Users Management</h1>
    <p>Here you can manage all the users.</p>

    <!-- Vuetify Data Table -->
    <v-card>
      <v-card-title>Users List</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :loading="loading"
          loading-text="Loading users..."
          class="elevation-1"
          dense
        >
          <!-- Link to Single User Page -->
          <template v-slot:[`item.name`]="{ item }">
            <v-btn
              text
              color="primary"
              @click="viewUser(item.id)"
            >
              {{ item.name }}
            </v-btn>
          </template>
          <template v-slot:[`item.role.name`]="{ item }">
            {{ item.role.name }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "../axios"; // Adjust the path to your axios instance

export default {
  data() {
    return {
      users: [], // Array to store users
      loading: false, // Loading state for data table
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Status", value: "status" },
        { text: "Role", value: "role.name" }, // Match nested role name
      ],
    };
  },
  computed: {
    // Filter out users with the role "Admin"
    filteredUsers() {
      return this.users.filter((user) => user.role.name !== "Admin");
    },
  },
  methods: {
    // Fetch users from the backend
    async fetchUsers() {
      this.loading = true; // Start loading
      try {
        const response = await axios.get("/admin/users"); // Adjust API endpoint
        this.users = response.data.data; // Assign users data
        console.log("Fetched Users:", this.users); // Debugging
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },
    // Navigate to single user page
    viewUser(userId) {
      this.$router.push(`/admin/users/${userId}`); // Navigate to user details page
    },
  },
  created() {
    this.fetchUsers(); // Fetch users on component creation
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
