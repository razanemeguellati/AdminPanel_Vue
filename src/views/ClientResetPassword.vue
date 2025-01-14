<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="600">
      <v-card-title>Reset Password</v-card-title>
      <v-card-text>
        <!-- Display the extracted email -->
        <p>Email: <strong>{{ email }}</strong></p>

        <!-- Form for entering the new password -->
        <v-form @submit.prevent="resetPassword">
          <v-text-field
            v-model="password"
            label="New Password"
            type="password"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="password_confirmation"
            label="Confirm New Password"
            type="password"
            outlined
            required
          ></v-text-field>
          <v-btn color="primary" type="submit" block>Reset Password</v-btn>
          <p v-if="error" class="red--text mt-4">{{ error }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "../axios"; //Adjust to match your Axios setup
export default {
  props: ["token", "email"],  //Receive token and email as props
  data() {
    return {
      password: "",
      password_confirmation: "",
      error: "", // To store errors if any
      cleanToken: "", // Clean token without prefix
    };
  },
  created() {
    // Remove 'token=' if present in the token value
    if (this.token.startsWith("token=")) {
      this.cleanToken = this.token.split("token=")[1];
    } else {
      this.cleanToken = this.token;
    }

    console.log("Cleaned Token:", this.cleanToken);
    console.log("Email:", this.email);
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.password_confirmation) {
        this.error = "Passwords do not match.";
        return;
      }

      try {
        const response = await axios.post("/client/password-reset", {
          token: this.cleanToken, // Use the cleaned token
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        alert("Password reset successfully!");
        this.$router.push("/client/login"); // Redirect to the login page
      } catch (error) {
        this.error = error.response?.data?.message || "An error occurred. Please try again.";
        console.error(error);
      }
    },
  },
};
;
</script>

<style scoped>
/* Add custom styles if needed */
</style>
