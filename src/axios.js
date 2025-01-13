
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.17:8000/api', // Update this to your API base URL
  
});

// Attach token to all requests if it exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role"); // Retrieve role from localStorage

//   if (to.meta.requiresAuth) {
//     if (!isAuthenticated) {
//       next("/client/login"); // Redirect to login if not authenticated
//     } else if (to.meta.role && to.meta.role !== userRole) {
//       next("/"); // Redirect if role mismatch
//     } else {
//       next(); // Proceed if authentication and role match
//     }
//   } else {
//     next();
//   }
// });
//
export default instance;
