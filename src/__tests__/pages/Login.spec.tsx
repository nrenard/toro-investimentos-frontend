import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withUser, { initialState } from 'containers/user';

import Login from 'pages/Login';

const Container = withUser(Login);

describe('Login page', () => {
  it('should be render step Login', () => {
    const result = render(<Container />);
    expect(result).toMatchSnapshot();
  });

  it('should be render step Login to Register', () => {
    const result = render(<Container />);

    const { container } = result;

    const buttonToggleStep: any = container.querySelector('p');

    fireEvent.click(buttonToggleStep);

    expect(result).toMatchSnapshot();
  });

  it('should be render step login to Register to Login', () => {
    const result = render(<Container />);

    const { container } = result;

    const buttonToggleStep: any = container.querySelector('p');

    fireEvent.click(buttonToggleStep);

    fireEvent.click(buttonToggleStep);

    expect(result).toMatchSnapshot();
  });

  it('should be render with error', () => {
    const ContainerWithError = withUser(Login, {
      ...initialState,
      error: 'true',
    });

    const result = render(<ContainerWithError />);

    expect(result).toMatchSnapshot();
  });

  it('should be render with loading', () => {
    const ContainerWithError = withUser(Login, {
      ...initialState,
      loading: true,
    });

    const result = render(<ContainerWithError />);

    expect(result).toMatchSnapshot();
  });

  it('should be submit form in step Login', () => {
    const result = render(<Container />);

    const { container } = result;

    const form: any = container.querySelector('form');
    const mailInput: any = container.querySelector('input[name="mail"]');
    const passInput: any = container.querySelector('input[name="password"]');

    fireEvent.change(mailInput, { target: { value: 'a@a.com' } });
    fireEvent.change(passInput, { target: { value: 'teste123456' } });

    fireEvent.submit(form);

    expect(result).toMatchSnapshot();
  });

  it('should be submit form in step Register', () => {
    const result = render(<Container />);

    const { container } = result;

    const buttonToggleStep: any = container.querySelector('p');

    fireEvent.click(buttonToggleStep);

    const form: any = container.querySelector('form');
    const nameInput: any = container.querySelector('input[name="name"]');
    const mailInput: any = container.querySelector('input[name="mail"]');
    const passInput: any = container.querySelector('input[name="password"]');

    fireEvent.change(nameInput, { target: { value: 'Teste teste' } });
    fireEvent.change(mailInput, { target: { value: 'a@a.com' } });
    fireEvent.change(passInput, { target: { value: 'teste123456' } });

    fireEvent.submit(form);

    expect(result).toMatchSnapshot();
  });
});
