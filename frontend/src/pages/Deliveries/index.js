import React, { useState, useEffect, useCallback } from 'react';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import HeaderContainer from '~/components/HeaderContainer';
import Delivery from '~/pages/Deliveries/Delivery';
import Table from '~/components/Table';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function handleSearch(product) {
    const response = await api.get('deliveries', {
      params: {
        q: product,
      },
    });

    setDeliveries(response.data);
  }

  const loadDeliveries = useCallback(async () => {
    const response = await api.get('deliveries');
    setDeliveries(response.data);
  }, []);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');
      setDeliveries(response.data);
    }
    loadDeliveries();
  }, []);

  return (
    <>
      <HeaderContainer title="Gerenciando encomendas">
        <SearchInput
          name="search"
          placeholder="Buscar por encomendas"
          onChange={e => handleSearch(e.target.value)}
        />

        <AddButton action={() => history.push('delivery/form')} />
      </HeaderContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries &&
            deliveries.map(delivery => (
              <tr key={delivery.id}>
                <Delivery data={delivery} loadDeliveries={loadDeliveries} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
