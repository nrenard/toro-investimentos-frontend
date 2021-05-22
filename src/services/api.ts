import axios, { AxiosError, AxiosResponse } from 'axios';

import { isAuthenticated, removeSession } from 'helpers/auth';

const successResponse = ({ data }: AxiosResponse) => data;

const errorResponse = ({ response }: AxiosError) => {
  if (response?.status === 401) {
    removeSession();
  }

  throw response;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(config => {
  const hasToken = isAuthenticated();

  // eslint-disable-next-line no-param-reassign
  if (hasToken) config.headers.Authorization = `Bearer ${hasToken}`;

  return config;
});

api.interceptors.response.use(successResponse, errorResponse);

export default api;
