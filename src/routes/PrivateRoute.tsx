/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from 'helpers/auth';

interface IProps {
  component: any;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  exact,
  path,
}: IProps) => {
  const render = (prop: any) =>
    isAuthenticated() ? (
      <Component {...prop} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: prop.location } }} />
    );

  return <Route exact={exact} render={render} path={path} />;
};

PrivateRoute.defaultProps = { exact: true };

export default PrivateRoute;
