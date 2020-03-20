import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
`;

export const Content = styled.label`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${colors.borderColor};
  border-radius: 50%;
  cursor: pointer;

  strong {
    font-size: 16px;
    color: ${colors.borderColor};
  }

  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    position: absolute;
  }

  input {
    display: none;
  }
`;
