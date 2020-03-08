import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  h1 {
    margin-bottom: 32px;
    color: ${colors.darkText};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
