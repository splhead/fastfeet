import styled from 'styled-components';
import ReactInputMask from 'react-input-mask';
import colors from '~/util/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  label {
    font-weight: bold;
    color: ${colors.darkText};
    text-align: left;
  }

  span {
    margin-top: 8px;
    text-align: left;
    color: ${colors.error};
  }
`;

export const Input = styled(ReactInputMask)`
  min-height: 45px;
  border: 1px solid ${colors.borderColor};
  border-radius: 4px;
  font-size: 16px;
  margin: 8px 0 0 0;
  padding: 0 10px;
  color: ${colors.darkText};

  &::placeholder {
    color: ${colors.placeholder};
  }
`;
