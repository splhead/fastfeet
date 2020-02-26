import React, { useState, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import DeliveryStatus from '~/components/DeliveryStatus';
import ActionMenu from '~/components/ActionMenu';
import Action from '~/components/ActionMenu/Action';

import { HeaderContainer, Table, TableAvatarContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();

  async function loadDelivery() {
    const response = await api.get('deliveries');
    if (response) {
      setDeliveries(response.data);
    }
  }

  useEffect(() => {
    loadDelivery();
  }, []);

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir a encomenda?');

    if (answer) {
      const response = await api.delete(`deliveries/${id}`);
      console.tron.log(response);
      loadDelivery();
    }
  }

  return (
    <>
      <h1>Gerenciando encomendas</h1>
      <HeaderContainer>
        <SearchInput name="search" placeholder="Buscar por encomendas" />
        <Button icon={addIcon}>CADASTRAR</Button>
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
              <tr>
                <td>#{delivery.id}</td>
                <td>{delivery.Recipient.name}</td>
                <td>
                  <TableAvatarContainer>
                    <img
                      src="https://api.adorable.io/avatars/40/abott@adorable.png"
                      alt={delivery.Deliveryman.name}
                    />
                    <span>{delivery.Deliveryman.name}</span>
                  </TableAvatarContainer>
                </td>
                <td>{delivery.Recipient.city}</td>
                <td>{delivery.Recipient.state}</td>
                <td>
                  <DeliveryStatus>{delivery.status}</DeliveryStatus>
                </td>
                <td>
                  <ActionMenu>
                    <Action type="view" />
                    <Action type="edit" />
                    <Action
                      type="delete"
                      onClick={() => handleDelete(delivery.id)}
                    />
                  </ActionMenu>
                </td>
              </tr>
            ))}

          {/* <tr>
            <td>#01</td>
            <td>Ludwing Van Bethoven</td>
            <td>Jonh Doe</td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <DeliveryStatus>PENDENTE</DeliveryStatus>
            </td>
            <td>
              <ActionMenu>
                <Action type="view" />
                <Action type="edit" />
                <Action type="delete" />
              </ActionMenu>
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwing Van Bethoven</td>
            <td>Jonh Doe</td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <DeliveryStatus>RETIRADA</DeliveryStatus>
            </td>
            <td>
              <ActionMenu>
                <Action type="view" />
                <Action type="edit" />
                <Action type="delete" />
              </ActionMenu>
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwing Van Bethoven</td>
            <td>Jonh Doe</td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <DeliveryStatus>CANCELADA</DeliveryStatus>
            </td>
            <td>
              <ActionMenu>
                <Action type="view" />
                <Action type="edit" />
                <Action type="delete" />
              </ActionMenu>
            </td>
          </tr> */}
        </tbody>
      </Table>
    </>
  );
}
