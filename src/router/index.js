import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [],
    }, {
      path: '/characters',
      component: () => import('@/views/Characters'),
      children: [],
    }, {
      path: '/seasons/:season_number',
      component: () => import('@/views/Season'),
      children: [],
    },
  ],
});