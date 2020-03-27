import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View`
  height: 100%;
  padding: 20px;
  background: #fff;
`;

export const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.View`
  margin-top: 30px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
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

export const TitleText = styled.Text.attrs({
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

export const Status = styled.Text`
  font-size: 12px;
  color: ${(props) => (props.selected ? colors.primary : '#999')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  margin-left: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
