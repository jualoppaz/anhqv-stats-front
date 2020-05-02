import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import ActorDetail from '../../../pages/actors/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('ActorDetail.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    state = {
      current: {
        name: 'John Doe',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
    };

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Actor title',
        description: 'Actor description',
        canonical_url: 'http://actor.com',
        og_title: 'Actor og:title',
        og_type: 'Actor og:type',
        og_image: 'Actor og:image',
        og_url: 'Actor og:url',
        og_description: 'Actor og:description',
        twitter_site: 'Actor twitter:site',
        twitter_card: 'Actor twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        actors: {
          namespaced: true,
          state,
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

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(wrapper.vm.avatarSize).toEqual(250);
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
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

      expect(title).toEqual('Actor title');
      expect(descriptionMeta.content).toEqual('Actor description');
      expect(canonicalUrlLink.href).toEqual('http://actor.com');
      expect(ogTitleMeta.content).toEqual('Actor og:title');
      expect(ogTypeMeta.content).toEqual('Actor og:type');
      expect(ogImageMeta.content).toEqual('Actor og:image');
      expect(ogUrlMeta.content).toEqual('Actor og:url');
      expect(ogDescriptionMeta.content).toEqual('Actor og:description');
      expect(twitterSiteMeta.content).toEqual('Actor twitter:site');
      expect(twitterCardMeta.content).toEqual('Actor twitter:card');
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(ActorDetail, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            slug: 'john-doe',
          },
        },
      },
      stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
