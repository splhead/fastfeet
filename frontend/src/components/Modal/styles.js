import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 450px;
  background: #fff;
  padding: 24px;
  border-radius: 4px;

  div:not(:first-child) {
    margin-top: 20px;
  }

  div span.title {
    font-weight: bold;
    color: ${colors.darkText};
  }

  span {
    margin-top: 4px;
    font-size: 16px;
    line-height: 26px;
    color: ${colors.lightText};
  }

  span.bold {
    font-weight: bold;
    margin-right: 4px;
  }
`;
