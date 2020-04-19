import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import CharacterDetail from '../../../pages/characters/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('CharacterDetail.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;
  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    state = {
      current: {
        name: 'John Doe',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        characters: {
          namespaced: true,
          state,
          actions,
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

      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
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
      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(CharacterDetail, {
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
      stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});