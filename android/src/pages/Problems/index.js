import React, { useMemo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Background from '~/components/Background';
import formatDate from '~/util/date';

import {
  Container,
  Title,
  Content,
  List,
  Card,
  Description,
  Date,
} from './styles';
import api from '~/services/api';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const route = useRoute();
  const { deliveryId } = route.params;

  const idFormatted = useMemo(() => deliveryId.toString().padStart(2, '0'), [
    deliveryId,
  ]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`deliveries/${deliveryId}/problems-list`);

      const data = response.data.map((problem) => ({
        ...problem,
        createdAt: formatDate(problem.createdAt),
      }));

      setProblems(data);
    }
    loadProblems();
  }, [deliveryId]);

  return (
    <Container>
      <Background />
      <Title>Encomenda {idFormatted}</Title>
      <Content>
        <List
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Card>
              <Description>{item.description}</Description>
              <Date>{item.createdAt}</Date>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
