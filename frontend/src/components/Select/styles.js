import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import colors from '~/util/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
    color: ${colors.darkText};
  }

  span.error {
    margin-top: 8px;
    color: ${colors.error};
  }
`;

export const MySelect = styled(AsyncSelect)`
  font-size: 16px;
`;
