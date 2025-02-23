import { createPinia } from 'pinia';
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
