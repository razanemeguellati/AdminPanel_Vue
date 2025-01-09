<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer app permanent>
      <!-- Sidebar Title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Admin Panel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <!-- Sidebar Links -->
      <v-list dense>
        <v-list-item 
          v-for="item in menuItems" 
          :key="item.title" 
          :to="item.route" 
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AdminLayout",
  data() {
    return {
      menuItems: [
        { title: "Dashboard", route: "/admin/dashboard", icon: "mdi-view-dashboard" },
        { title: "Products", route: "/admin/products", icon: "mdi-cart" },
        { title: "Users", route: "/admin/users", icon: "mdi-account" },
        { title: "Orders", route: "/admin/orders", icon: "mdi-receipt" },
      ],
    };
  },
};
</script>

<style scoped>
/* Add additional styles for layout if necessary */
</style>
