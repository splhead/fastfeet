import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/util/colors';

export const MyButton = styled.button`
  height: 36px;
  padding: 0 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  border: 0;
  background: ${colors.primary};
  transition: background 0.4s;

  display: flex;
  align-items: center;

  &:hover {
    background: ${darken(0.1, colors.primary)};
  }

  svg {
    margin-right: 8px;
  }
`;
