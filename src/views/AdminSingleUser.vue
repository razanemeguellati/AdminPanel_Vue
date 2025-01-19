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
        <v-btn color="error" @click="dialog = 'delete'" block>Delete User</v-btn>

        <!-- Activate User Button -->
        <v-btn
          v-if="user.status === 'blocked'"
          color="success"
          @click="dialog = 'activate'"
          block
        >
          Activate User
        </v-btn>

        <!-- Block User Button -->
        <v-btn
          v-if="user.status === 'active'"
          color="warning"
          @click="dialog = 'block'"
          block
        >
          Block User
        </v-btn>

        <!-- Dialog Component -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">
              Confirm Action
            </v-card-title>
            <v-card-text>
              <div v-if="dialog === 'delete'">
                Are you sure you want to delete the user: <strong>{{ user.name }}</strong>?
              </div>
              <div v-else-if="dialog === 'activate'">
                Are you sure you want to activate the user: <strong>{{ user.name }}</strong>?
              </div>
              <div v-else-if="dialog === 'block'">
                Are you sure you want to block the user: <strong>{{ user.name }}</strong>?
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="dialog === 'delete'"
                color="red"
                text
                @click="deleteUser"
              >
                Yes
              </v-btn>
              <v-btn
                v-else-if="dialog === 'activate'"
                color="green"
                text
                @click="activateUser"
              >
                Yes
              </v-btn>
              <v-btn
                v-else-if="dialog === 'block'"
                color="orange"
                text
                @click="blockUser"
              >
                Yes
              </v-btn>
              <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dialog: false, // Dialog state (used for delete, activate, and block actions)
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
      try {
        await axios.delete(`/admin/users/${this.user.id}`);
        this.dialog = false; // Close the dialog
        alert("User deleted successfully!");
        this.$router.push("/admin/users"); // Redirect to users list
      } catch (error) {
        console.error("Error deleting user:", error);
        this.dialog = false; // Close the dialog even on error
        alert("Failed to delete the user.");
      }
    },

    async activateUser() {
      try {
        await axios.post(`/admin/users/${this.user.id}/active`);
        this.dialog = false; // Close the dialog
        this.fetchUser(); // Refresh user data
      } catch (error) {
        console.error("Error activating user:", error);
        this.dialog = false; // Close the dialog even on error
        alert("Failed to activate the user.");
      }
    },

    async blockUser() {
      try {
        await axios.post(`/admin/users/${this.user.id}/block`);
        this.dialog = false; // Close the dialog
        this.fetchUser(); // Refresh user data
      } catch (error) {
        console.error("Error blocking user:", error);
        this.dialog = false; // Close the dialog even on error
        alert("Failed to block the user.");
      }
    },
  },
  async created() {
    this.fetchUser(); // Fetch the user data on component creation
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
