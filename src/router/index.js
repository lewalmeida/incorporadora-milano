import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/a-milano',
    name: 'A Milano',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('../views/Contact.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
