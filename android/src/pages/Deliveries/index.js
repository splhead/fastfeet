import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/util/colors';

import {
  Container,
  Avatar,
  Header,
  UserContainer,
  UserInfo,
  WelcomeText,
  NameText,
} from './styles';

export default function Deliveries() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile);

  return (
    <Container>
      <Header>
        <UserContainer>
          <Avatar source={{ uri: profile.avatar.url }} />

          <UserInfo>
            <WelcomeText>Bem vindo de volta,</WelcomeText>
            <NameText>{profile?.name}</NameText>
          </UserInfo>
        </UserContainer>
        <Icon
          name="exit-to-app"
          size={18}
          color={colors.red}
          onPress={() => dispatch(signOut())}
        />
      </Header>
    </Container>
  );
}
