import axios from 'axios';
import { useAuthStore } from './authStore'; 

const instance = axios.create({
  baseURL: 'http://192.168.1.17:8000/api', //  API base URL
});

// Attach token to all requests if it exists
instance.interceptors.request.use((config) => {
  const authStore = useAuthStore(); //  Pinia auth store
  const token = authStore.token; 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
