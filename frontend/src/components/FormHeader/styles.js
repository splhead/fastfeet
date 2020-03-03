import styled from 'styled-components';

import colors from '~/util/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  span.title {
    font-weight: bold;
    font-size: 24px;
    color: ${colors.darkText};
  }
`;
