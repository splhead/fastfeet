import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';
import formatDate from '~/util/date';

import colors from '~/util/colors';

import {
  Container,
  Background,
  Content,
  Card,
  Label,
  Info,
  InfoGroupLine,
  InfoGroup,
  ActionContainer,
  Action,
  ActionText,
} from './styles';
import CardHeader from '~/components/CardHeader';

export default function DeliveryDetails() {
  const { id } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();
  const [delivery, setDelivery] = useState(route.params.delivery);

  async function handleWithdrawDelivery() {
    async function withdraw() {
      try {
        const response = await api.put(
          `deliverymen/${id}/deliveries/${delivery.id}`
        );

        setDelivery({
          ...delivery,
          startDateFormatted: formatDate(response.data.start_date),
        });

        navigation.navigate('Deliveries');
      } catch (error) {
        console.tron.log(error);
      }
    }

    Alert.alert(
      'Confirme',
      'Deseja fazer a retirada da encomenda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: withdraw },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Background />
      <Content>
        <Card>
          <CardHeader
            iconName="local-shipping"
            title="Informações da entrega"
          />
          <Label>Destinatário</Label>
          <Info>{delivery?.Recipient.name}</Info>

          <Label>Endereço de entrega</Label>
          <Info>{`${delivery.Recipient.street}, ${delivery.Recipient.number}, ${delivery.Recipient.city} - ${delivery.Recipient.state}, ${delivery.Recipient.zip_code}`}</Info>

          <Label>Produto</Label>
          <Info>{delivery.product}</Info>
        </Card>

        <Card>
          <CardHeader iconName="event" title="Situação da entrega" />

          <Label>Status</Label>
          <Info style={{ textTransform: 'capitalize' }}>
            {delivery?.status}
          </Info>

          <InfoGroupLine>
            <InfoGroup>
              <Label>Data de retirada</Label>
              <Info>{delivery.startDateFormatted}</Info>
            </InfoGroup>

            <InfoGroup>
              <Label>Data de entrega</Label>
              <Info>{delivery.endDateFormatted}</Info>
            </InfoGroup>
          </InfoGroupLine>
        </Card>

        <ActionContainer>
          <Action
            style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
            onPress={() =>
              navigation.navigate('InformProblem', { deliveryId: delivery.id })
            }
          >
            <Icon name="close-circle-outline" size={20} color={colors.red} />
            <ActionText>Informar</ActionText>
            <ActionText>Problema</ActionText>
          </Action>

          <Action
            onPress={() =>
              navigation.navigate('Problems', { deliveryId: delivery.id })
            }
          >
            <Icon name="alert-circle-outline" size={20} color={colors.orange} />
            <ActionText>Visualizar</ActionText>
            <ActionText>Problemas</ActionText>
          </Action>

          {delivery.status === 'PENDENTE' ? (
            <Action
              style={{ borderBottomRightRadius: 4, borderTopRightRadius: 4 }}
              onPress={handleWithdrawDelivery}
            >
              <Icon name="truck-delivery" size={20} color={colors.primary} />
              <ActionText>Retirar</ActionText>
              <ActionText>Encomenda</ActionText>
            </Action>
          ) : (
            <Action
              style={{ borderBottomRightRadius: 4, borderTopRightRadius: 4 }}
            >
              <Icon
                name="check-circle-outline"
                size={20}
                color={colors.primary}
              />
              <ActionText>Confirmar</ActionText>
              <ActionText>Entrega</ActionText>
            </Action>
          )}
        </ActionContainer>
      </Content>
    </Container>
  );
}
