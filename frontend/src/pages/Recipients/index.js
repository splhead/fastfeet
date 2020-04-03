import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import Table from '~/components/Table';
import Recipient from '~/pages/Recipients/Recipient';
import HeaderContainer from '~/components/HeaderContainer';
import Pagination from '~/components/Pagination';

const ITENS_PER_PAGE = 3;

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  async function handleSearch(name) {
    const response = await api.get('recipients', {
      params: {
        q: name,
      },
    });

    setRecipients(response.data);
  }

  const loadRecipient = useCallback(async page => {
    const response = await api.get(
      `recipients?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setRecipients(response.data.rows);
  }, []);

  useEffect(() => {
    loadRecipient(1);
  }, [loadRecipient]);

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
                  loadRecipient={loadRecipient}
                />
              </tr>
            ))}
        </tbody>
      </Table>
      {totalItens > ITENS_PER_PAGE && (
        <Pagination
          loadItens={loadRecipient}
          totalItens={totalItens}
          itensPerPage={ITENS_PER_PAGE}
        />
      )}
    </>
  );
}
