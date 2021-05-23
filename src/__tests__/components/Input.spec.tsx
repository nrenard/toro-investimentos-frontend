import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Component from 'components/Input';

describe('Input component', () => {
  it('should render', () => {
    const result = render(
      <Component onChange={() => {}} value="a" name="name" />,
    );
    expect(result).toMatchSnapshot();
  });

  it('should render and change value', () => {
    const onChangeMock = jest.fn();

    const result = render(
      <Component onChange={onChangeMock} value="a" name="name" />,
    );

    const { container } = result;

    const input: any = container.querySelector('input');

    fireEvent.change(input, { target: { value: '23' } });

    expect(result).toMatchSnapshot();
  });
});
