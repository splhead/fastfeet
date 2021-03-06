import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import NamePicture from '~/components/NamePicture';

import { Container, Image, Label, TextField, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      {profile?.avatar ? (
        <Image source={{ uri: profile?.avatar.url }} />
      ) : (
        <NamePicture name={profile?.name} height="136" />
      )}

      <Label>Nome completo</Label>
      <TextField>{profile?.name}</TextField>

      <Label>Email</Label>
      <TextField>{profile?.email}</TextField>

      <Label>Data de cadastro</Label>
      <TextField>{profile?.created_at}</TextField>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
