
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

export default instance;
