import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppMenu from './pages/AppMenu.vue';
import AppCart from './pages/AppFormCart.vue';
import App404 from './pages/App404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },

    {
      path: '/menu/:slug',
      name: 'menu',
      props: true,
      component: AppMenu
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: App404
    },
  ]
});

export { router };