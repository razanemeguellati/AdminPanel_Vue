<template>
  <v-container>
    <h1> Client Dashboard</h1>
    <p> Welcome, {{ clientEmail }}!</p>
    <v-alert v-if="notification" type="warning" class="mt-4">
      {{ notification }}
    </v-alert>
  </v-container>
</template>

<script>
import pusher from "../pusher"; // Import the initialized Pusher instance
import { useAuthStore } from "../authStore"; // Adjust path to your store

export default {
  data() {
    return {
      clientEmail: "", // Email of the logged-in client
      notification: null, // To display real-time notifications
      clientId: null, // Unique client ID for channel subscription
    };
  },
  methods: {
    listenForBlockEvent() {


  // Subscribe to a client-specific channel
  const clientChannel = pusher.subscribe('originova-channel');
  clientChannel.bind("user-logout", (data) => {
    console.log("Block event received:", data);

    // Display the notification
    this.notification = `You have been blocked by the admin. Reason: ${
      data.reason || "No reason provided."
    }`;

    // Clear auth data and redirect to login after a delay
    const authStore = useAuthStore();
    authStore.clearAuthData();

    // Wait for 5 seconds before redirecting
    setTimeout(() => {
      this.$router.push("/client/login");
    }, 3000); 

  });

  pusher.logToConsole = true;
}
  },
  created() {
    // Retrieve the email and client ID from localStorage
    // this.clientEmail = localStorage.getItem("clientEmail");
    // this.clientId = localStorage.getItem("clientId"); // Ensure clientId is stored during login
    const authStore = useAuthStore(); // Initialize Pinia store

    // Access data from the Pinia store
    this.clientEmail = authStore.email; // Assuming 'email' is the key in your store

    if (this.clientEmail) {
      this.listenForBlockEvent(); // Start listening for real-time events
    } else {
      console.error("Client ID is missing. Real-time events cannot be subscribed.");
    }
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>
