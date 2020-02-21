import styled from 'styled-components';

import colors from '~/util/colors';

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.borderColor};
  padding: 0 16px;
  background: #fff;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export const MyInput = styled.input`
  height: 36px;
  border: 0;

  &::placeholder {
    color: ${colors.placeholder};
  }
`;
