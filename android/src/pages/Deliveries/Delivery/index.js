import React from 'react';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/util/colors';

import Status from './Status';

import {
  Container,
  Header,
  Title,
  Footer,
  InfoGroup,
  Label,
  Info,
  DetailLink,
} from './styles';

export default function Delivery({ delivery }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={16} color={colors.primary} />
        <Title>{`Encomenda ${delivery.idFormatted}`}</Title>
      </Header>

      <Status status={delivery.status} />

      <Footer>
        <InfoGroup>
          <Label>Data</Label>
          <Info>14/01/2020</Info>
        </InfoGroup>
        <InfoGroup>
          <Label>Cidade</Label>
          <Info>{delivery.Recipient.city}</Info>
        </InfoGroup>
        <DetailLink
          onPress={() => navigation.navigate('Detalhes', { delivery })}
        >
          Ver detalhes
        </DetailLink>
      </Footer>
    </Container>
  );
}
