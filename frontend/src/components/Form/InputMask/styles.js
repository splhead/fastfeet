import InputMask from 'react-input-mask';
import styled from 'styled-components';
import colors from '~/util/colors';

export const Container = styled.div`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: ${colors.darkText};
    text-align: left;
    margin-top: 16px;
  }
`;

export const MaskInput = styled(InputMask)`
  height: 45px;

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
