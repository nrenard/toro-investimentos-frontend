/* eslint-disable no-proto */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';

import api from 'services/api';

import { userMock } from '__mocks__/requests/userRequest';

import withContainer, { initialState } from 'containers/user';
import actions from 'containers/user/actions';

const serviceMock = new AxiosMockAdapter(api);

describe('user container', () => {
  it('should be render with Component.', () => {
    const MockComponent = () => <p>mock</p>;

    const MakeContainerWrapper = withContainer(MockComponent);
    const { getByText } = render(<MakeContainerWrapper />);

    expect(getByText('mock')).toBeTruthy();
  });

  describe('#actions', () => {
    const { token, ...user } = userMock;

    describe('makeLogin', () => {
      it('should be make login with success', async () => {
        const changeStateMock = jest.fn();
        const setItemMock = jest.fn();
        global.localStorage.__proto__.setItem = setItemMock;

        serviceMock.onPost(`/session`).reply(201, userMock);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.makeLogin({ mail: 'a@a.com', password: 'teste' });

        expect(setItemMock).toHaveBeenLastCalledWith(
          'token',
          JSON.stringify(userMock.token),
        );

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be make login with success and error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onPost(`/session`).reply(201, userMock);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: { ...initialState, error: 'true' },
        });

        await actionsMock.makeLogin({ mail: 'a@a.com', password: 'teste' });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: null,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be make login with error bad request', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onPost(`/session`).reply(400);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.makeLogin({ mail: 'a@a.com', password: 'teste' });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: 'E-mail ou senha incorretos!',
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be make login with error internal error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onPost(`/session`).reply(500);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.makeLogin({ mail: 'a@a.com', password: 'teste' });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: 'Erro interno!',
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });
    });

    describe('makeRegister', () => {
      const createData = {
        name: 'Teste Teste',
        mail: 'a@a.com',
        password: 'teste',
      };

      it('should be make register with success', async () => {
        const changeStateMock = jest.fn();
        const setItemMock = jest.fn();
        global.localStorage.__proto__.setItem = setItemMock;

        serviceMock.onPost(`/users`).reply(201, userMock);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.makeRegister(createData);

        expect(setItemMock).toHaveBeenLastCalledWith(
          'token',
          JSON.stringify(userMock.token),
        );

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be make register with success and error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onPost(`/users`).reply(201, userMock);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: { ...initialState, error: 'true' },
        });

        await actionsMock.makeRegister(createData);

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: null,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be make register with internal error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onPost(`/users`).reply(500);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.makeRegister(createData);

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: 'Erro interno!',
        });
        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });
    });

    describe('makeLogout', () => {
      it('should be make logout', () => {
        const changeStateMock = jest.fn();
        const removeItemMock = jest.fn();
        global.localStorage.__proto__.removeItem = removeItemMock;

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        actionsMock.makeLogout();

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: null,
        });

        expect(removeItemMock).toHaveBeenLastCalledWith('token');
      });
    });

    describe('getUser', () => {
      it('should be get user with success', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onGet(`/users/detail`).reply(200, user);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.getUser();

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be get user with success and error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onGet(`/users/detail`).reply(200, user);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: { ...initialState, error: 'true' },
        });

        await actionsMock.getUser();

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: null,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'user',
          value: user,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });

      it('should be get user with internal error', async () => {
        const changeStateMock = jest.fn();

        serviceMock.onGet(`/users/detail`).reply(500);

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        await actionsMock.getUser();

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: true,
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: 'Erro interno!',
        });

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'loading',
          value: false,
        });
      });
    });

    describe('resetError', () => {
      it('should be reset error', () => {
        const changeStateMock = jest.fn();

        const actionsMock = actions({
          changeState: changeStateMock,
          data: initialState,
        });

        actionsMock.resetError();

        expect(changeStateMock).toHaveBeenCalledWith({
          label: 'error',
          value: null,
        });
      });
    });
  });
});
