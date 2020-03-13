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
