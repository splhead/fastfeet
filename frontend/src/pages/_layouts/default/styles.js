import styled from 'styled-components';

import colors from '~/util/colors';

export const Wrapper = styled.div`
  background: #f5f5f5;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 32px auto;

  h1 {
    margin-bottom: 32px;
    color: ${colors.darkText};
  }
`;
