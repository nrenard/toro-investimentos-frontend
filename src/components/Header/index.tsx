/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.png';

import { useUser } from 'containers/user';

import { HeaderStyles, HeaderContainer, UserWapper } from './styles';

const Header: React.FC = () => {
  const {
    data: { user },
    actions: { makeLogout },
  } = useUser();

  return (
    <HeaderStyles>
      <HeaderContainer>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        {user && (
          <UserWapper>
            <b>{user.name}</b>
            <strong onClick={makeLogout}>LOGOUT</strong>
          </UserWapper>
        )}
      </HeaderContainer>
    </HeaderStyles>
  );
};

export default Header;
