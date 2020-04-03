import React, { useState, useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/util/colors';

import formatDate from '~/util/date';

import Delivery from './Delivery';

import api from '~/services/api';

import {
  Container,
  Avatar,
  Header,
  ProfileHeader,
  StatusContainer,
  UserContainer,
  UserInfo,
  WelcomeText,
  TitleText,
  Status,
  List,
  Text,
} from './styles';

export default function Deliveries() {
  const [statusType, setStatusType] = useState('PENDENTES');
  const [deliveries, setDeliveries] = useState([]);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile);
  const { id } = useSelector((state) => state.auth);

  const statusStepPosition = (status) => {
    switch (status) {
      case 'PENDENTE':
        return 0;
      case 'RETIRADA':
        return 1;
      case 'ENTREGUE':
        return 2;
    }
  };

  const deliveriesFormatted = useMemo(() => {
    return deliveries.map((delivery) => ({
      ...delivery,
      idFormatted: delivery.id.toString().padStart(2, '0'),
      startDateFormatted: formatDate(delivery.start_date),
      endDateFormatted: formatDate(delivery.end_date),
      createdAtFormatted: formatDate(delivery.createdAt),
      statusPosition: statusStepPosition(delivery.status),
    }));
  }, [deliveries]);

  useFocusEffect(
    useCallback(() => {
      async function loadDeliveries() {
        if (!id) return;
        const response =
          statusType === 'PENDENTES'
            ? await api.get(`/deliverymen/${id}/deliveries`)
            : await api.get(`/deliverymen/${id}/deliveries/delivered`);

        setDeliveries(response.data);
      }
      loadDeliveries();
    }, [statusType])
  );

  return (
    <Container>
      <ProfileHeader>
        <UserContainer>
          <Avatar source={{ uri: profile?.avatar.url }} />

          <UserInfo>
            <WelcomeText>Bem vindo de volta,</WelcomeText>
            <TitleText>{profile?.name}</TitleText>
          </UserInfo>
        </UserContainer>
        <Icon
          name="exit-to-app"
          size={18}
          color={colors.red}
          onPress={() => dispatch(signOut())}
        />
      </ProfileHeader>
      <Header>
        <TitleText>Entregas</TitleText>
        <StatusContainer>
          <Status
            selected={statusType === 'PENDENTES'}
            onPress={() => setStatusType('PENDENTES')}
          >
            Pendentes
          </Status>
          <Status
            selected={statusType === 'ENTREGUES'}
            onPress={() => setStatusType('ENTREGUES')}
          >
            Entregues
          </Status>
        </StatusContainer>
      </Header>

      {deliveriesFormatted.length > 0 ? (
        <List
          data={deliveriesFormatted}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Delivery delivery={item} />}
        />
      ) : (
        <Text>Sem entregas.</Text>
      )}
    </Container>
  );
}
