<template>
    <v-container>
      <v-card class="mx-auto my-12" max-width="600">
        <v-card-title>Client Registration</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="form.name"
              label="Name"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password_confirmation"
              label="Confirm Password"
              type="password"
              outlined
              required
            ></v-text-field>
            <v-btn color="primary" type="submit" block>Register</v-btn>
            <p v-if="error" class="red--text mt-4">{{ error }}</p>
            <!-- Forgot Password Link -->
            <p class="mt-4">
              <router-link to="/client/login" class="blue--text">
                already have an account?
              </router-link>
            </p>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "../axios"; // Ensure this matches your Axios setup path
  
  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
        error: "",
      };
    },


    methods: {
        
      async handleRegister() {
        console.log("Password:", this.form.password);
        console.log("Confirm Password:", this.form.password_confirmation);

        if (this.form.password !== this.form.password_confirmation) {
          this.error = "Passwords do not match.";
          return;
        }

        try {
          const response = await axios.post("/client/register", {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
          });

          // Assuming the backend returns the role in the user object
          const { token, role } = response.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("clientEmail", this.form.email);
          localStorage.setItem("role", role || "client"); // Default to 'client' if role is not provided

          // Redirect to dashboard
          this.$router.push("/client/dashboard");
        } catch (err) {
          this.error =
            err.response?.data?.message || "An error occurred. Please try again.";
          console.error(err);
        }
      }

    },
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  