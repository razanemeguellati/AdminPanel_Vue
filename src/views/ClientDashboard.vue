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

        var clientId = localStorage.getItem("clientId"); // Retrieve the client ID from storage
        if (!clientId) {
          console.error("Client ID is missing.");
          return;
        }
        var clientChannel = pusher.subscribe('originova-channel'); // Use a dynamic channel
        clientChannel.bind("user-logout", (data) => { console.log(data);
          this.notification = `You have been blocked by the admin. Reason: ${
            data.reason || "No reason provided."
          }`;
         
          // Optional: Clear the notification after a few seconds
          setTimeout(() => {
            this.notification = null;
          }, 10000);
        });
        pusher.logToConsole= true;
      }

  },
  
  created() {
    // Retrieve the email and client ID from localStorage
    this.clientEmail = localStorage.getItem("clientEmail");
    this.clientId = localStorage.getItem("clientId"); // Ensure clientId is stored during login

    if (this.clientId) {
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
