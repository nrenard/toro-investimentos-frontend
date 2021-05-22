import React from 'react';
import { Router } from 'react-router-dom';

import history from 'services/history';

import Theme from 'components/Theme';
import Header from 'components/Header';
import Bottom from 'components/Bottom';

import withContainers from 'containers';

import GlobalStyle from 'styles/global';

import Routes from 'routes';

const App: React.FC = () => (
  <Theme>
    <Router history={history}>
      <GlobalStyle />
      <Header />

      <Routes />

      <Bottom />
    </Router>
  </Theme>
);

export default withContainers(App);
