import styled from 'styled-components';

import { Container } from 'components/Input/styles';

import { ButtonStyles } from 'components/Button/styles';

import { simpleFlex } from 'styles/mixins';

export const ModalLogin = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 50px;
  width: 100%;
  height: 100%;
  ${simpleFlex};
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const WrapperContent = styled.div`
  background-color: ${({ theme }) => theme?.colors?.secondary};
  width: 70%;
  height: 90%;
  border-radius: ${({ theme }) => theme?.base?.radius * 2}px;
  ${simpleFlex};
  flex-direction: column;

  img {
    margin-top: ${({ theme }) => theme?.base?.margin * 6}px;
    margin-bottom: ${({ theme }) => theme?.base?.margin * 8}px;
  }
`;

export const WrapperForm = styled.form`
  width: 70%;
  ${simpleFlex};
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
`;
