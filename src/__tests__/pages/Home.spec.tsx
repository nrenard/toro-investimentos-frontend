import React from 'react';
import { render } from '@testing-library/react';

import Home from 'pages/Home';

describe('Home page', () => {
  it('should be render', () => {
    const result = render(<Home />);
    expect(result).toMatchSnapshot();
  });
});
