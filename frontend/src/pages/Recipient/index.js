import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import ActionMenu from '~/components/ActionMenu';
import Form from '~/components/Form';
import Table from '~/components/Table';

// import {} from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Recipient() {
  const [recipients, setRecipients] = useState();

  async function loadDeliveryman(data) {
    if (data) {
      const { search } = data;
      const response = await api.get(`recipients?q=${search}`);
      if (response) {
        setRecipients(response.data);
      }
    } else {
      const response = await api.get('recipients');
      if (response) {
        setRecipients(response.data);
      }
    }
  }

  useEffect(() => {
    loadDeliveryman();
  }, []);

  function handleAdd() {
    console.tron.log('add');
  }

  async function handleSearch(data) {
    loadDeliveryman(data);
  }

  function handleEdit(id) {
    console.tron.log('edit', id);
  }

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir?');

    if (answer) {
      const response = await api.delete(`recipients/${id}`);
      console.tron.log(response);
      loadDeliveryman();
    }
  }

  return (
    <>
      <h1>Gerenciando destinatários</h1>
      <Form onSubmit={handleSearch}>
        <SearchInput name="search" placeholder="Buscar por destinatários" />
        <Button icon={addIcon} onClick={handleAdd}>
          CADASTRAR
        </Button>
      </Form>
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
              <tr>
                <td>#{recipient.id.toString().padStart(2, '0')}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                  {recipient.state}
                </td>
                <td>
                  <ActionMenu
                    actions={[
                      {
                        type: 'edit',
                        onClick: () => handleEdit(recipient.id),
                      },
                      {
                        type: 'delete',
                        onClick: () => handleDelete(recipient.id),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
