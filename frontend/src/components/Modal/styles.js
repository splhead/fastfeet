import styled from 'styled-components';
import Popup from 'reactjs-popup';
import colors from '~/util/colors';

export const MyPopup = styled(Popup)`
  &-content {
    border-radius: 4px;
    border: 1px solid ${colors.borderColor};
    position: center center;
  }
`;

export const Button = styled.button`
  width: 100%;
  color: #999;
  font-size: 16px;
  padding: 6px 0;
  border: 0;
  background: none;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    margin-right: 6px;
  }
`;
