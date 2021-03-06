import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Characters from '../../../pages/characters/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Characters.vue', () => {
  let localVue;
  let store;
  let actions;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    actions = {
      getAll: jest.fn(),
      destroyAll: jest.fn(),
    };

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Characters title',
        description: 'Characters description',
        canonical_url: 'http://characters.com',
        og_title: 'Characters og:title',
        og_type: 'Characters og:type',
        og_image: 'Characters og:image',
        og_url: 'Characters og:url',
        og_description: 'Characters og:description',
        twitter_site: 'Characters twitter:site',
        twitter_card: 'Characters twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        characters: {
          namespaced: true,
          actions,
        },
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

  beforeEach(() => {
    process.browser = false;
  });

  describe('check initial data', () => {
    it('it should load default data', () => {
      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Characters, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['el-row'],
        methods,
      });
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Characters, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['el-row'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://characters.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Characters description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Characters, keywords',
            hid: 'keywords',
            name: 'keywords',
          }, {
            content: 'Characters og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Characters og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Characters og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Characters og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Characters og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Characters og:site_name',
            hid: 'og:site_name',
            property: 'og:site_name',
          }, {
            content: 'Characters twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Characters twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          }, {
            content: 'Characters twitter:image',
            hid: 'twitter:image',
            name: 'twitter:image',
          }, {
            content: 'Characters twitter:title',
            hid: 'twitter:title',
            name: 'twitter:title',
          }, {
            content: 'Characters twitter:description',
            hid: 'twitter:description',
            name: 'twitter:description',
          },
        ],
        title: 'Characters title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(Characters, {
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
      const keywordsMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'keywords',
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
      const ogSiteNameMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:site_name',
      );
      const twitterSiteMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:site',
      );
      const twitterCardMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:card',
      );
      const twitterImageMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:image',
      );
      const twitterTitleMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:title',
      );
      const twitterDescriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:description',
      );

      expect(title).toEqual('Characters title');
      expect(descriptionMeta.content).toEqual('Characters description');
      expect(keywordsMeta.content).toEqual('Characters, keywords');
      expect(canonicalUrlLink.href).toEqual('http://characters.com');
      expect(ogTitleMeta.content).toEqual('Characters og:title');
      expect(ogTypeMeta.content).toEqual('Characters og:type');
      expect(ogImageMeta.content).toEqual('Characters og:image');
      expect(ogUrlMeta.content).toEqual('Characters og:url');
      expect(ogSiteNameMeta.content).toEqual('Characters og:site_name');
      expect(ogDescriptionMeta.content).toEqual('Characters og:description');
      expect(twitterSiteMeta.content).toEqual('Characters twitter:site');
      expect(twitterCardMeta.content).toEqual('Characters twitter:card');
      expect(twitterImageMeta.content).toEqual('Characters twitter:image');
      expect(twitterTitleMeta.content).toEqual('Characters twitter:title');
      expect(twitterDescriptionMeta.content).toEqual('Characters twitter:description');
    });
  });


  describe('handleResize', () => {
    it('gutter for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(Characters, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(Characters, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(50);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Characters, {
      localVue,
      store,
      mocks: {
        $t: () => {},
      },
      stubs: ['el-row'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
