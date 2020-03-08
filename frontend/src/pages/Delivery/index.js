import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import history from '~/services/history';

import { statusColors } from '~/util/colors';

import { AddButton } from '~/components/Form/Button';
import SearchInput from '~/components/Form/SearchInput';
import DeliveryStatus from '~/components/DeliveryStatus';
import ActionMenu from '~/components/ActionMenu';
import ViewAction from '~/components/ActionMenu/ViewAction';
import EditAction from '~/components/ActionMenu/EditAction';
import DeleteAction from '~/components/ActionMenu/DeleteAction';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import HeaderContainer from '~/components/HeaderContainer';

import { TableAvatarContainer } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();
  const [delivery, setDelivery] = useState();
  const [modalIsOpen, setIsOpened] = useState(false);

  async function loadDelivery() {
    const response = await api.get('deliveries');
    if (response) {
      const data = addFormattedFields(response.data);
      setDeliveries(data);
    }
  }

  useEffect(() => {
    loadDelivery();
  }, []); //eslint-disable-line

  async function handleSearch(product) {
    const response = await api.get('deliveries', {
      params: {
        q: product,
      },
    });

    if (response) {
      const data = addFormattedFields(response.data);
      setDeliveries(data);
    }
  }

  async function handleView(id) {
    const response = await api.get(`deliveries/${id}`);
    const delivery = response.data;

    if (delivery) {
      setDelivery(delivery);
      setIsOpened(true);
    }
  }

  function closeModal() {
    setIsOpened(false);
  }

  function handleEdit(id) {}

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir a encomenda?');

    if (answer) {
      await api.delete(`deliveries/${id}`);
      loadDelivery();
    }
  }

  function formatDate(date) {
    if (date) {
      return format(parseISO(date), "dd'/'MM'/'yyyy", {
        locale: ptBR,
      });
    }
  }

  function addFormattedFields(data) {
    return data.map(delivery => ({
      ...delivery,
      id: delivery.id.toString().padStart(2, '0'),
      start_date: formatDate(delivery.start_date),
      end_date: formatDate(delivery.end_date),
    }));
  }

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
                  <DeliveryStatus
                    color={statusColors[delivery.status].color}
                    background={statusColors[delivery.status].background}
                  >
                    {delivery.status}
                  </DeliveryStatus>
                </td>
                <td>
                  <ActionMenu>
                    <ViewAction action={() => handleView(delivery.id)} />
                    <EditAction action={handleEdit} />
                    <DeleteAction action={handleDelete} />
                  </ActionMenu>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {delivery && (
        <Modal isOpen={modalIsOpen} requestClose={closeModal}>
          <div>
            <span className="title">Informações da encomenda</span>
            <br />
            <span>
              {delivery.Recipient.street}, {delivery.Recipient.number}
              <br />
              {delivery.Recipient.complement}
              {delivery.Recipient.complement && <br />}
              {delivery.Recipient.city} - {delivery.Recipient.state}
              <br />
              {delivery.Recipient.zip_code}
            </span>
          </div>

          <div>
            <span className="title">Datas</span>
            <br />
            <span className="bold">Retirada:</span>
            <span>{delivery.start_date}</span>
            <br />
            <span className="bold">Entrega:</span>
            <span>{delivery.end_date}</span>
          </div>

          <div>
            <span className="title">Assinatura do destinatário</span>
          </div>
        </Modal>
      )}
    </>
  );
}
