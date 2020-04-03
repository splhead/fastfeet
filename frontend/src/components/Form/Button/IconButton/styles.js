import styled from 'styled-components';
import { darken } from 'polished';

export const MyButton = styled.button`
  height: ${props => (props.height ? props.height : '36px')};
  padding: 0 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  border: 0;
  background: ${props => props.background};
  transition: background 0.4s;
  text-transform: uppercase;

  display: flex;
  align-items: center;

  &:hover {
    background: ${props => darken(0.1, props.background)};
  }
`;
