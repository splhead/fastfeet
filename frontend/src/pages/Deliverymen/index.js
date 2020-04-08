import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import Table from '~/components/Table';
import Deliveryman from '~/pages/Deliverymen/Deliveryman';
import HeaderContainer from '~/components/HeaderContainer';
import Pagination from '~/components/Pagination';
import EmptyData from '~/components/EmptyData';

const ITENS_PER_PAGE = process.env.REACT_APP_ITENS_TO_SHOW;

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  async function handleSearch(product) {
    const response = await api.get(`deliverymen?itens_per_page=100`, {
      params: {
        q: product,
      },
    });
    setTotalItens(response.data.count);
    setDeliverymen(response.data.rows);
  }

  const loadDeliverymen = useCallback(async pag => {
    const page = pag ? pag : 1;
    const response = await api.get(
      `deliverymen?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setDeliverymen(response.data.rows);
  }, []);

  useEffect(() => {
    loadDeliverymen();
  }, [loadDeliverymen]);

  return (
    <>
      <HeaderContainer title="Gerenciando entregadores">
        <SearchInput
          name="search"
          placeholder="Buscar por entregadores"
          onChange={e => handleSearch(e.target.value)}
        />

        <AddButton action={() => history.push('deliveryman/form')} />
      </HeaderContainer>
      {deliverymen.length > 0 ? (
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
      ) : (
        <EmptyData />
      )}
      {totalItens > ITENS_PER_PAGE && (
        <Pagination
          loadItens={loadDeliverymen}
          totalItens={totalItens}
          itensPerPage={ITENS_PER_PAGE}
        />
      )}
    </>
  );
}
