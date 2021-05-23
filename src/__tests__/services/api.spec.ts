import AxiosMockAdapter from 'axios-mock-adapter';

import api from 'services/api';

const serviceMock = new AxiosMockAdapter(api);

describe('Api service', () => {
  // eslint-disable-next-line no-proto
  global.localStorage.__proto__.getItem = () => JSON.stringify('token');

  it('should be return api instance', () => {
    expect(api instanceof Function).toBe(true);
  });

  it('should be make get in test service success', async () => {
    serviceMock.onGet('/').reply(200, { success: true });

    const request = await api.get('/');

    expect(request).toMatchObject({ success: true });
  });

  it('should be make get in test service error 500', async () => {
    serviceMock.onGet('/error').reply(500);

    try {
      await api.get('/error');
    } catch (err) {
      expect(err.status).toBe(500);
    }
  });

  it('should be make get in test service error 401', async () => {
    serviceMock.onGet('/error').reply(401);

    try {
      await api.get('/error');
    } catch (err) {
      expect(err.status).toBe(401);
    }
  });
});
