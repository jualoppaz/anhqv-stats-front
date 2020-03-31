import Vue from 'vue';
import Router from 'vue-router';

import i18n from '../i18n';
import utils from '../utils';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.HOME.TITLE'),
      },
    }, {
      path: '/personajes',
      name: 'Characters',
      component: () => import('@/views/Characters'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.CHARACTERS.TITLE'),
      },
    }, {
      path: '/personajes/:slug',
      name: 'CharacterDetail',
      component: () => import('@/views/CharacterDetail'),
      children: [],
      meta: {
        title: ({ route }) => i18n.t('VIEWS.CHARACTERS.DETAIL.TITLE', {
          character: utils.slugToText(route.params.slug),
        }),
      },
    },
    {
      path: '/temporadas/:season_number',
      name: 'SeasonDetails',
      component: () => import('@/views/Season'),
      children: [],
      meta: {
        title: ({ route }) => i18n.t('VIEWS.SEASONS.DETAIL.TITLE', { number: route.params.season_number }),
      },
    },
  ],
});
