import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  padding: 25px 25px 47px;

  span.title {
    font-weight: bold;
    color: ${colors.darkText};
    margin-bottom: 4px;
  }

  div + div {
    margin-top: 21px;
  }
`;
