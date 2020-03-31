import styled from 'styled-components/native';
import Button from '~/components/Button';
import colors from '~/util/colors';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: -80px;
`;

export const SubmitButton = styled(Button)`
  background: ${colors.primary};
  height: 45px;
`;
