import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

import colors from '~/util/colors';

export const MyButton = styled(Link)`
  height: 36px;
  padding: 0 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  border: 0;
  background: ${props => (props.color ? props.color : colors.primary)};
  transition: background 0.4s;
  text-transform: uppercase;

  display: flex;
  align-items: center;

  &:hover {
    background: ${props =>
      props.color ? darken(0.1, props.color) : darken(0.1, colors.primary)};
  }

  svg {
    margin-right: 8px;
  }
`;
