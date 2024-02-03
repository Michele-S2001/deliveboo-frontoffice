import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).mount('#app')
