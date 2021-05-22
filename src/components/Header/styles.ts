import styled from 'styled-components';

import { container, simpleFlex } from 'styles/mixins';

export const HeaderStyles = styled.header`
  padding: ${({ theme }) => `${theme?.base?.padding * 2}px 0`};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: ${({ theme }) => theme?.base?.margin * 5}px;
`;

export const HeaderContainer = styled.div`
  ${container};
  ${simpleFlex};
  justify-content: space-between;
  flex-direction: column;

  a {
    color: ${({ theme }) => theme?.colors?.white};
    transition: 0.2s color;

    &.active {
      color: ${({ theme }) => theme?.colors?.secondary};
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const UserWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    margin-top: 10px;
    color: ${({ theme }) => theme?.colors?.secondary};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
`;
