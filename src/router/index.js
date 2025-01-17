import { createRouter, createWebHistory } from 'vue-router';

// Admin Pages
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import AdminProducts from '../views/AdminProducts.vue';
import AdminUsers from '../views/AdminUsersPage.vue';
import AdminOrders from '../views/AdminOrders.vue';
import AdminSingleProduct from '../views/AdminSingleProduct.vue';
import AdminCreateProduct from '../views/AdminCreateProduct.vue';
import AdminSingleUser from '../views/AdminSingleUser.vue';
import AdminSingleOrder from '../views/AdminSingleOrder.vue';
// Client Pages
import ClientLogin from '../views/ClientLogin.vue';
import ClientDashboard from '../views/ClientDashboard.vue';
import ClientRegister from '../views/ClientRegister.vue';
import ClientForgotPassword from '../views/ClientForgotPassword.vue';
import ClientResetPassword from '../views/ClientResetPassword.vue';

// Not Found Page
import NotFound from '../views/NotFound.vue';

import { useAuthStore } from "../authStore";

const routes = [
  { path: '/', redirect: '/client/register' },
  { path: '/admin/login', component: AdminLogin },
  { path: '/client/login', component: ClientLogin },
  { path: '/client/dashboard', component: ClientDashboard, meta: { requiresAuth: true, role: 'client' } },
  { path: "/client/register", component: ClientRegister },
  { path: '/client/forgot-password', component: ClientForgotPassword },

  {
      path: '/password-reset/:token',
      component: ClientResetPassword,
      props: (route) => ({
        token: route.params.token, 
        email: route.query.email, 
      }),
  },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      
      { path: 'dashboard', component: AdminDashboard },

      { 
        path: 'products', 
        component: AdminProducts,
        props: (route) => ({
          category: route.query.category || null,
          search: route.query.search || '',
          page: parseInt(route.query.page) || 2,
        }),
      },

      { path: 'products/create', component: AdminCreateProduct },
      { path: 'users', component: AdminUsers },
      { path: 'orders', component: AdminOrders },
    ],
  },


  { path: '/admin/orders/:id', component: AdminSingleOrder },

  {
    path: "/admin/products/:id",
    name: "ProductDetails",
    component: AdminSingleProduct,
  },

  {
    path: "/admin/users/:id",
    name: "AdminSingleUser",
    component: AdminSingleUser
  },

  { path: '/:catchAll(.*)', component: NotFound }, // Catch-all for 404 pages
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role'); // 'admin' or 'client'

//   if (to.meta.requiresAuth) {
//     if (!isAuthenticated) {
//       next('/client/login'); // Redirect to login if not authenticated
//     } else if (to.meta.role && to.meta.role !== userRole) {
//       next('/'); // Redirect if role mismatch
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const role = authStore.role;

  console.log(`Attempting to navigate to: ${to.path}`);
  console.log("Current Token:", token);
  console.log("Current Role:", role);

  if (to.meta.requiresAuth) {
    if (token && role === to.meta.role) {
      console.log("Access granted.");
      next();
    } else {
      console.warn("Access denied. Redirecting to /client/login.");
      next("/client/login");
    }
  } else {
    next();
  }
});


export default router;
