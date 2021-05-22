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

export default ({ changeState }: IData): IActions => ({
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

      history.push('/');
    } catch (err) {
      changeState({
        label: 'error',
        value: true,
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

      history.push('/');
    } catch (err) {
      changeState({
        label: 'error',
        value: true,
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

      history.push('/');
    } catch (err) {
      changeState({
        label: 'error',
        value: true,
      });
    }

    changeState({ label: 'loading', value: false });
  },
});
