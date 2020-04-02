import styled from 'styled-components/native';
import Button from '~/components/Button';
import colors from '~/util/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 36px;
`;

export const Image = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
  margin-bottom: 32px;
`;

export const Label = styled.Text`
  font-size: 12px;
  align-self: flex-start;
  color: #666;
  margin-top: 16px;
`;

export const TextField = styled.Text`
  font-size: 22px;
  align-self: flex-start;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${colors.red};
`;
