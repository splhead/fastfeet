import styled from 'styled-components';
import colors from '~/util/colors';

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span.error {
    margin-top: 8px;
    text-align: left;
    color: ${colors.error};
  }
`;

export const MyInput = styled.input`
  min-height: 36px;
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

export const Label = styled.label`
  font-weight: bold;
  color: ${colors.darkText};
  text-align: left;
  margin-top: 16px;
`;
