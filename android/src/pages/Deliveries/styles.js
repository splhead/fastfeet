import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const UserInfo = styled.View`
  margin-left: 12px;
`;

export const WelcomeText = styled.Text`
  font-size: 12px;
  color: ${colors.lightText};
`;

export const NameText = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.darkText};
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
`;
