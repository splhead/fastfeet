import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  padding: 25px 25px 47px;

  span.address {
    display: block;
  }

  span.title {
    font-weight: bold;
    color: ${colors.darkText};
    margin-bottom: 4px;
    display: block;
  }

  span.bold {
    font-weight: bold;
    color: ${colors.lightText};
    margin-right: 4px;
  }

  div + div {
    margin-top: 21px;
  }

  div.signature-container {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 160px;
    }
  }
`;
