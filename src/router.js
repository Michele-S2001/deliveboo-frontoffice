import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppMenu from './pages/AppMenu.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    // TODO: Correggere la rotta in dinamica dopo aver provato il layout
    {
      path: '/menu',
      name: 'menu',
      component: AppMenu
    }
  ]
});

export { router };