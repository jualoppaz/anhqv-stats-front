import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Home from '../../../pages/index.vue';

describe('Home.vue', () => {
  let localVue;
  let store;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Home title',
        description: 'Home description',
        canonical_url: 'http://home.com',
        og_title: 'Home og:title',
        og_type: 'Home og:type',
        og_image: 'Home og:image',
        og_url: 'Home og:url',
        og_description: 'Home og:description',
        twitter_site: 'Home twitter:site',
        twitter_card: 'Home twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        configs: {
          namespaced: true,
          state: configsState,
          mutations: configsMutations,
        },
        'seo-configs': {
          namespaced: true,
          state: seoConfigState,
          actions: seoConfigActions,
        },
      },
    });
  });

  it('check initial data', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#welcome-image').exists()).toBe(true);
  });

  it('has correct <head> content', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
      mocks: {
        $t: () => {},
      },
    });

    const { title } = wrapper.vm.$metaInfo;
    const descriptionMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'description',
    );
    const canonicalUrlLink = wrapper.vm.$metaInfo.link.find(
      (item) => item.rel === 'canonical',
    );
    const ogTitleMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'og:title',
    );
    const ogTypeMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'og:type',
    );
    const ogImageMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'og:image',
    );
    const ogUrlMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'og:url',
    );
    const ogDescriptionMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'og:description',
    );
    const twitterSiteMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'twitter:site',
    );
    const twitterCardMeta = wrapper.vm.$metaInfo.meta.find(
      (item) => item.hid === 'twitter:card',
    );

    expect(title).toEqual('Home title');
    expect(descriptionMeta.content).toEqual('Home description');
    expect(canonicalUrlLink.href).toEqual('http://home.com');
    expect(ogTitleMeta.content).toEqual('Home og:title');
    expect(ogTypeMeta.content).toEqual('Home og:type');
    expect(ogImageMeta.content).toEqual('Home og:image');
    expect(ogUrlMeta.content).toEqual('Home og:url');
    expect(ogDescriptionMeta.content).toEqual('Home og:description');
    expect(twitterSiteMeta.content).toEqual('Home twitter:site');
    expect(twitterCardMeta.content).toEqual('Home twitter:card');
  });
});
