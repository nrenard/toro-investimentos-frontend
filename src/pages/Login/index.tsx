import React, { FormEvent, useEffect, useState } from 'react';

import Input from 'components/Input';
import Button from 'components/Button';
import Loader from 'components/Loader';

import logo from 'assets/images/logo.png';

import { useUser } from 'containers/user';

import {
  ModalLogin,
  WrapperContent,
  WrapperForm,
  ErrorMessage,
} from './styles';

const Login: React.FC = () => {
  const {
    actions: { makeLogin, makeRegister, resetError },
    data: { loading, error },
  } = useUser();

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      makeLogin({ mail, password });
    } else {
      makeRegister({ name, mail, password });
    }
  };

  useEffect(() => {
    setName('');
    setMail('');
    setPassword('');
    resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <ModalLogin>
      <WrapperContent>
        <img src={logo} alt="logo" />

        <h1>{isLogin ? 'Acesse sua conta Toro:' : 'Cadastre-se'}</h1>

        {loading ? (
          <Loader />
        ) : (
          <WrapperForm onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                value={name}
                type="string"
                onChange={setName}
                placeholder="Nome"
                required
                name="name"
              />
            )}

            <Input
              value={mail}
              type="email"
              onChange={setMail}
              placeholder="E-mail"
              required
              name="mail"
            />

            <Input
              value={password}
              onChange={setPassword}
              placeholder="Senha"
              type="password"
              required
              minLength={6}
              maxLength={20}
              name="password"
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {isLogin ? (
              <p onClick={() => setIsLogin(false)}>
                Não é cadastrado? Faça seu cadastro <strong>aqui.</strong>
              </p>
            ) : (
              <p onClick={() => setIsLogin(true)}>
                Já é cadastrado? Faça seu login <strong>aqui.</strong>
              </p>
            )}

            <Button type="submit" width="300px">
              {isLogin ? 'Entrar' : 'Continue'}
            </Button>
          </WrapperForm>
        )}
      </WrapperContent>
    </ModalLogin>
  );
};

export default Login;
