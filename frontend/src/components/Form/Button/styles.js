import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/util/colors';

export const MyButton = styled.button`
  height: 48px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  border: 0;
  background: ${colors.primary};
  margin-top: 16px;
  transition: background 0.4s;

  &:hover {
    background: ${darken(0.1, colors.primary)};
  }
`;
