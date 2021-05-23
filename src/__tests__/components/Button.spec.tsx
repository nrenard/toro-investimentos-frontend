import React from 'react';
import { render } from '@testing-library/react';

import Component from 'components/Button';

describe('Button component', () => {
  it('should render', () => {
    const result = render(<Component>Button</Component>);
    expect(result).toMatchSnapshot();
  });
});
