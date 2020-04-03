import React, { useState, useEffect, useCallback } from 'react';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import HeaderContainer from '~/components/HeaderContainer';
import Delivery from '~/pages/Deliveries/Delivery';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

const ITENS_PER_PAGE = 3;

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  async function handleSearch(product) {
    const response = await api.get('deliveries', {
      params: {
        q: product,
      },
    });

    setDeliveries(response.data);
  }

  const loadDeliveries = useCallback(async page => {
    const response = await api.get(
      `deliveries?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setDeliveries(response.data.rows);
  }, []);

  useEffect(() => {
    loadDeliveries(1);
  }, [loadDeliveries]);

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
      {totalItens > ITENS_PER_PAGE && (
        <Pagination
          loadItens={loadDeliveries}
          totalItens={totalItens}
          itensPerPage={ITENS_PER_PAGE}
        />
      )}
    </>
  );
}
