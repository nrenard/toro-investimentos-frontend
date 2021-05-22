import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';

import ContentFullHeight from 'components/ContentFullHeight';

import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => (
  <ContentFullHeight>
    <Switch>
      <PrivateRoute path="/" component={Home} />

      <Route path="/login" component={Login} exact />
    </Switch>
  </ContentFullHeight>
);

export default Routes;
