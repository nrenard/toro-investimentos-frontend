import api from 'services/api';

import { IDataChangeState } from 'helpers/changeState';

import { setSession, removeSession } from 'helpers/auth';
import history from 'services/history';

import {
  IActions,
  IState,
  ILoginUser,
  IRegisterUser,
  IUserResponse,
} from './dtos';

interface IData {
  data: IState;
  changeState(data: IDataChangeState): void;
}

const INTERNAL_ERROR = 'Erro interno!';

export default ({ changeState, data: { error } }: IData): IActions => ({
  makeLogin: async (user: ILoginUser): Promise<void> => {
    changeState({ label: 'loading', value: true });

    try {
      const { token, ...response }: IUserResponse = await api.post(
        '/session',
        user,
      );

      changeState({
        label: 'user',
        value: response,
      });

      setSession(token);

      if (error) changeState({ label: 'error', value: null });

      history.push('/');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MAP_ERRORS: any = {
        400: 'E-mail ou senha incorretos!',
      };

      changeState({
        label: 'error',
        value: MAP_ERRORS[err?.status] || INTERNAL_ERROR,
      });
    }

    changeState({ label: 'loading', value: false });
  },
  makeRegister: async (user: IRegisterUser) => {
    changeState({ label: 'loading', value: true });

    try {
      const { token, ...response }: IUserResponse = await api.post(
        '/users',
        user,
      );

      changeState({
        label: 'user',
        value: response,
      });

      setSession(token);

      if (error) changeState({ label: 'error', value: null });

      history.push('/');
    } catch (err) {
      changeState({
        label: 'error',
        value: INTERNAL_ERROR,
      });
    }

    changeState({ label: 'loading', value: false });
  },

  makeLogout: () => {
    removeSession();
    changeState({
      label: 'user',
      value: null,
    });
  },

  getUser: async () => {
    changeState({ label: 'loading', value: true });

    try {
      const response: IUserResponse = await api.get('/users/detail');

      changeState({
        label: 'user',
        value: response,
      });

      if (error) changeState({ label: 'error', value: null });

      history.push('/');
    } catch (err) {
      changeState({
        label: 'error',
        value: INTERNAL_ERROR,
      });
    }

    changeState({ label: 'loading', value: false });
  },

  resetError: () => {
    changeState({ label: 'error', value: null });
  },
});
