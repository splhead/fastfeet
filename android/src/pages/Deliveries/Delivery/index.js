import React from 'react';

import { useNavigation } from '@react-navigation/native';

import StatusIndicator from './StatusIndicator';
import CardHeader from '~/components/CardHeader';

import {
  Container,
  Content,
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
      <Content>
        <CardHeader
          iconName="local-shipping"
          title={`Encomenda ${delivery.idFormatted}`}
        />

        <StatusIndicator currentPosition={delivery.statusPosition} />
      </Content>
      <Footer>
        <InfoGroup>
          <Label>Data</Label>
          <Info>{delivery.createdAtFormatted}</Info>
        </InfoGroup>
        <InfoGroup>
          <Label>Cidade</Label>
          <Info>{delivery.Recipient.city}</Info>
        </InfoGroup>
        <DetailLink
          onPress={() => navigation.navigate('DeliveryDetail', { delivery })}
        >
          Ver detalhes
        </DetailLink>
      </Footer>
    </Container>
  );
}
