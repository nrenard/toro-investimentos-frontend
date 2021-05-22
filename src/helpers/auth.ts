import history from 'services/history';

import { setItem, getItem, removeItem } from './storage';

const token = 'token';

export const removeSession = (): void => {
  removeItem(token);
  history.push('/login');
};

export const isAuthenticated = (): string | null => {
  const tokenStorage = getItem(token);
  return tokenStorage;
};

export const setSession = (tokenValue: string): void => {
  setItem(token, tokenValue);
};
