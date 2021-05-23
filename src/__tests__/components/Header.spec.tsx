import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Component from 'components/Header';

import withUser, { initialState } from 'containers/user';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  NavLink: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Header component', () => {
  it('should render not user', () => {
    const Container = withUser(Component);

    const result = render(<Container />);
    expect(result).toMatchSnapshot();
  });

  it('should render with user', () => {
    const Container = withUser(Component, {
      ...initialState,
      user: { name: 'teste', mail: 'a@a.com' },
    });

    const result = render(<Container />);
    expect(result).toMatchSnapshot();
  });

  it('should render with user and make logout', () => {
    const state = {
      ...initialState,
      user: { name: 'teste', mail: 'a@a.com' },
    };

    const Container = withUser(Component, state);

    const result = render(<Container />);

    const { container } = result;

    const logout: any = container.querySelector('strong');

    fireEvent.click(logout);

    expect(result).toMatchSnapshot();
    expect(container.querySelector('strong')).toBeNull();
  });
});
