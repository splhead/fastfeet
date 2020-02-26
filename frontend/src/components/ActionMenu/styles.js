import styled from 'styled-components';

import colors from '~/util/colors';

export const Container = styled.div`
  position: relative;
  text-align: right;
`;

export const ActionList = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};

  position: absolute;
  text-align: left;
  background: #fff;
  border: 1px solid ${colors.borderColor};
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 2px #00000026;
  z-index: 1;

  /* &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${colors.borderColor};
  } */
`;

export const Button = styled.button`
  border: 0;
  background: #fff;
`;
