// stores/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
    role: null,
  }),
  actions: {
    setAuthData(token, email, role) {
      this.token = token;
      this.email = email;
      this.role = role;
    },
    clearAuthData() {
      this.token = null;
      this.email = null;
      this.role = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  persist: true, // Enable persistence
  
});
