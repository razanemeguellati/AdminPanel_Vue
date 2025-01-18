import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'; 
import '@fontsource/poppins';
import Vue from 'vue';
import _ from 'lodash';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(vuetify);
app.use(pinia);
pinia.use(piniaPersistedState); // Add persisted state plugin

app.mount('#app');