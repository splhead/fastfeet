import styled from 'styled-components/native';
import colors from '~/util/colors';
import Button from '~/components/Button';

export const Container = styled.View`
  background: ${colors.primary};
  flex: 1;
  padding: 25px;
  align-items: center;
  justify-content: center;
`;

export const Submit = styled(Button)`
  width: 100%;
  height: 45px;
  background: ${colors.green};
`;
