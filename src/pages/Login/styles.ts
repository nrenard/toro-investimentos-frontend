import styled from 'styled-components';

import { Container } from 'components/Input/styles';

import { ButtonStyles } from 'components/Button/styles';

import { simpleFlex } from 'styles/mixins';

export const ModalLogin = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  ${simpleFlex};
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

export const WrapperContent = styled.div`
  background-color: ${({ theme }) => theme?.colors?.secondary};
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme?.base?.radius * 2}px;
  ${simpleFlex};
  flex-direction: column;
  padding: 0 10px;

  img {
    margin-top: ${({ theme }) => theme?.base?.margin * 6}px;
    margin-bottom: ${({ theme }) => theme?.base?.margin * 8}px;
  }

  h1 {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    width: 70%;

    h1 {
      font-size: 28px;
    }
  }
`;

export const WrapperForm = styled.form`
  ${simpleFlex};
  width: 100%;
  justify-content: center;
  flex-direction: column;

  margin-top: ${({ theme }) => theme?.base?.margin * 3}px;

  ${Container} {
    + ${Container} {
      margin-top: ${({ theme }) => theme?.base?.margin}px;
    }
  }

  ${ButtonStyles} {
    margin-top: ${({ theme }) => theme?.base?.margin * 2}px;
  }

  p {
    margin-top: ${({ theme }) => theme?.base?.margin * 2}px;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const ErrorMessage = styled.strong`
  margin-top: ${({ theme }) => theme?.base?.margin * 2}px;
  color: ${({ theme }) => theme?.colors?.error};
`;
