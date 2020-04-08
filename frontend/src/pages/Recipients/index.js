import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import Table from '~/components/Table';
import Recipient from '~/pages/Recipients/Recipient';
import HeaderContainer from '~/components/HeaderContainer';
import Pagination from '~/components/Pagination';
import EmptyData from '~/components/EmptyData';

const ITENS_PER_PAGE = process.env.REACT_APP_ITENS_TO_SHOW;

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  async function handleSearch(name) {
    const response = await api.get(`recipients?itens_per_page=100`, {
      params: {
        q: name,
      },
    });
    setTotalItens(response.data.count);
    setRecipients(response.data.rows);
  }

  const loadRecipients = useCallback(async pag => {
    const page = pag ? pag : 1;
    const response = await api.get(
      `recipients?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setRecipients(response.data.rows);
  }, []);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  return (
    <>
      <HeaderContainer title="Gerenciando destinatários">
        <SearchInput
          name="search"
          placeholder="Buscar por destinatários"
          onChange={e => handleSearch(e.target.value)}
        />

        <AddButton action={() => history.push('recipient/form')} />
      </HeaderContainer>
      {recipients.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients &&
              recipients.map(recipient => (
                <tr key={recipient.id}>
                  <Recipient
                    recipient={recipient}
                    loadRecipients={loadRecipients}
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
          loadItens={loadRecipients}
          totalItens={totalItens}
          itensPerPage={ITENS_PER_PAGE}
        />
      )}
    </>
  );
}
