import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import Table from '~/components/Table';
import Deliveryman from '~/components/Deliveryman';
import HeaderContainer from '~/components/HeaderContainer';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);

  async function handleSearch(product) {
    const response = await api.get('deliverymen', {
      params: {
        q: product,
      },
    });

    setDeliverymen(response.data);
  }

  const loadDeliverymen = useCallback(async () => {
    const response = await api.get('deliverymen');
    setDeliverymen(response.data);
  }, []);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen');
      setDeliverymen(response.data);
    }
    loadDeliverymen();
  }, []);

  return (
    <>
      <HeaderContainer title="Gerenciando entregadores">
        <SearchInput
          name="search"
          placeholder="Buscar entregadores"
          onChange={e => handleSearch(e.target.value)}
        />

        <AddButton action={() => history.push('deliveryman/form')} />
      </HeaderContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen &&
            deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <Deliveryman
                  deliveryman={deliveryman}
                  loadDeliverymen={loadDeliverymen}
                />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
