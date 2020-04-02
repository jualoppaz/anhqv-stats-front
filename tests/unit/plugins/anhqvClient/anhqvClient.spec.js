import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const client = require('../../../../src/plugins/anhqvClient/client');

describe('anhqvClient', () => {
  let anhqvClient;
  let mockClient;
  let AnhqvClient;

  const baseURL = 'http://path/to/api';

  beforeEach(() => {
    const axiosInstance = axios.create();

    mockClient = new MockAdapter(axiosInstance);
    AnhqvClient = client({
      restClient: axiosInstance,
    });

    anhqvClient = new AnhqvClient();
    anhqvClient.setBaseURL(baseURL);
  });

  afterEach(() => {
    mockClient.resetHistory();
  });

  describe('setBaseURL', () => {
    it('it should modify baseURL', () => {
      anhqvClient.setBaseURL('/path/to/endpoint');

      expect(anhqvClient.restClient.defaults.baseURL).toBe('/path/to/endpoint');
    });
  });

  describe('characters', () => {
    describe('getCharacters', () => {
      it('check url is well formed', (done) => {
        const expectedUrl = '/characters';

        mockClient.onGet().reply(200, {});

        anhqvClient.getCharacters()
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });

    describe('getCharacterBySlug', () => {
      it('check url is well formed', (done) => {
        const slug = 'john-doe';
        const expectedUrl = `/characters/${slug}`;

        mockClient.onGet().reply(200, {});

        anhqvClient.getCharacterBySlug(slug)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });
  });
});