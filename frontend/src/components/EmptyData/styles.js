import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  strong {
    color: ${colors.darkText};
  }
`;
