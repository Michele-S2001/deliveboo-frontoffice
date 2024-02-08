import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';

import AppCart from './pages/AppCart.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {

      //rotta per la pagina dei pagamenti
      path: '/cart',
      name: 'cart',
      component: AppCart
    },

    {
      path: '/menu/:slug',
      name: 'menu',
      props: true,
      component: AppMenu
},
  ]
});

export { router };