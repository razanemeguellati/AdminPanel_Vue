import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../views/AdminLogin.vue';
import ClientLogin from '../views/ClientLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import ClientDashboard from '../views/ClientDashboard.vue';
import NotFound from '../views/NotFound.vue';
// Admin Pages

import AdminLayout from '../layouts/AdminLayout.vue';
import AdminProducts from '../views/AdminProducts.vue';
import AdminUsers from '../views/AdminUsersPage.vue';
import AdminOrders from '../views/AdminOrders.vue';

import ClientRegister from '../views/ClientRegister.vue';
import ClientForgotPassword from '../views/ClientRegister.vue';

const routes = [
  { path: '/', redirect: '/client/register' },
  { path: '/admin/login', component: AdminLogin },
  { path: '/client/login', component: ClientLogin },
  { path: '/client/dashboard', component: ClientDashboard, meta: { requiresAuth: true, role: 'client' } },
  { path: "/client/register", component: ClientRegister, },
  { path: '/client/forgot-password', component: ClientForgotPassword, },
  
  
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'products', component: AdminProducts },
      { path: 'users', component: AdminUsers },
      { path: 'orders', component: AdminOrders },
    ],
  },


 

  { path: '/:catchAll(.*)', component: NotFound }, // Catch-all for 404 pages
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // 'admin' or 'client'

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/client/login'); // Redirect to login if not authenticated
    } else if (to.meta.role && to.meta.role !== userRole) {
      next('/'); // Redirect if role mismatch
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
