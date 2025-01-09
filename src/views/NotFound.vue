<template>
    <v-container class="text-center">
      <v-row justify="center" align="center" style="height: 100vh;">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline text-center">
              Oops! Page Not Found
            </v-card-title>
            <v-card-text>
              <p>The page you are looking for doesn't exist or has been moved.</p>
              <p>Use the button below to navigate back to safety.</p>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="goHome">Go to Home</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/'); // Redirect to the home page
      },
    },
  };
  </script>
  
  <style scoped>
  v-container {
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  v-card {
    padding: 20px;
  }
  </style>
  