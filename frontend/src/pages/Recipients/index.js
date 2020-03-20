import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import Table from '~/components/Table';
import Recipient from '~/components/Recipient';
import HeaderContainer from '~/components/HeaderContainer';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  async function handleSearch(name) {
    const response = await api.get('recipients', {
      params: {
        q: name,
      },
    });

    setRecipients(response.data);
  }

  const loadRecipient = useCallback(async () => {
    const response = await api.get('recipients');
    setRecipients(response.data);
  }, []);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients');
      console.tron.log(response);
      setRecipients(response.data);
    }
    loadRecipient();
  }, []);

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
    </>
  );
}
