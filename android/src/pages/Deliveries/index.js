import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/util/colors';

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
} from './styles';

export default function Deliveries() {
  const [statusType, setStatusType] = useState('PENDENTES');
  const [deliveries, setDeliveries] = useState([]);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile);
  const { id } = useSelector((state) => state.auth);

  const formatDate = (date) => {
    if (date) {
      return format(parseISO(date), "dd'/'MM'/'yyyy", {
        locale: ptBR,
      });
    }
  };

  const deliveriesFormatted = useMemo(() => {
    return deliveries.map((delivery) => ({
      ...delivery,
      idFormatted: delivery.id.toString().padStart(2, '0'),
      startDateFormatted: formatDate(delivery.start_date),
      endDateFormatted: formatDate(delivery.end_date),
    }));
  }, [deliveries]);

  useEffect(() => {
    async function loadDeliveries() {
      if (!id) return;

      const response =
        statusType === 'PENDENTES'
          ? await api.get(`/deliverymen/${id}/deliveries`)
          : await api.get(`/deliverymen/${id}/deliveries/handedout`);

      console.tron.log(response.data);

      setDeliveries(response.data);
    }

    loadDeliveries();
  }, [id, statusType]);

  return (
    <Container>
      <ProfileHeader>
        <UserContainer>
          <Avatar source={{ uri: profile.avatar.url }} />

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
      <List
        data={deliveriesFormatted}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery delivery={item} />}
      />
    </Container>
  );
}
