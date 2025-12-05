import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'cover',
    component: () => import('./components/cover.vue'),
  },
  {
    path: '/body-avatar',
    name: 'body-avatar',
    component: () => import('./components/human/body_avatar.vue'),
  },
  {
    path: '/NVS',
    name: 'NVS',
    component: () => import('./components/scene/body_avatar.vue'),
  },
  {
    path: '/reality',
    name: 'reality',
    component: () => import('./components/reality/body_avatar.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
