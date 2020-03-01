import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import ActionMenu from '~/components/ActionMenu';
import Form from '~/components/Form';
import Table from '~/components/Table';

import { TableAvatarContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState();

  async function loadDeliveryman(data) {
    if (data) {
      const { search } = data;
      const response = await api.get(`deliverymen?q=${search}`);
      if (response) {
        setDeliverymen(response.data);
      }
    } else {
      const response = await api.get('deliverymen');
      if (response) {
        setDeliverymen(response.data);
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
      const response = await api.delete(`deliverymen/${id}`);
      console.tron.log(response);
      loadDeliveryman();
    }
  }

  return (
    <>
      <h1>Gerenciando entregadores</h1>
      <Form onSubmit={handleSearch}>
        <SearchInput name="search" placeholder="Buscar por entregadores" />
        <Button icon={addIcon} onClick={handleAdd}>
          CADASTRAR
        </Button>
      </Form>
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
              <tr>
                <td>#{deliveryman.id.toString().padStart(2, '0')}</td>
                <td>
                  <TableAvatarContainer>
                    <img
                      src="https://api.adorable.io/avatars/40/abott@adorable.png"
                      alt={deliveryman.name}
                    />
                  </TableAvatarContainer>
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <ActionMenu
                    actions={[
                      {
                        type: 'edit',
                        onClick: () => handleEdit(deliveryman.id),
                      },
                      {
                        type: 'delete',
                        onClick: () => handleDelete(deliveryman.id),
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
