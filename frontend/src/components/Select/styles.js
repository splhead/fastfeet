import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
  }
`;

export const MySelect = styled(AsyncSelect)``;
