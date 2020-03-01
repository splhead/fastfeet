import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import DeliveryStatus from '~/components/DeliveryStatus';
import ActionMenu from '~/components/ActionMenu';
import Modal from '~/components/Modal';

import { HeaderContainer, Table, TableAvatarContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();
  const [delivery, setDelivery] = useState();
  const [modalIsOpen, setModalOpened] = useState(false);

  async function loadDelivery(data) {
    if (data) {
      const { search } = data;
      const response = await api.get(`deliveries?q=${search}`);
      if (response) {
        setDeliveries(response.data);
      }
    } else {
      const response = await api.get('deliveries');
      if (response) {
        setDeliveries(response.data);
      }
    }
  }

  useEffect(() => {
    loadDelivery();
  }, []);

  function handleAdd() {
    console.tron.log('add');
  }

  async function handleSearch(data) {
    loadDelivery(data);
  }

  async function handleView(id) {
    const response = await api.get(`deliveries/${id}`);
    const delivery = response.data;

    if (delivery) {
      setModalOpened(true);
      setDelivery(delivery);
    }
  }

  function closeModal() {
    setModalOpened(false);
  }

  function handleEdit(id) {
    console.tron.log('edit', id);
  }

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir a encomenda?');

    if (answer) {
      const response = await api.delete(`deliveries/${id}`);
      console.tron.log(response);
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

  return (
    <>
      <h1>Gerenciando encomendas</h1>
      <HeaderContainer onSubmit={handleSearch}>
        <SearchInput name="search" placeholder="Buscar por encomendas" />
        <Button icon={addIcon} onClick={handleAdd}>
          CADASTRAR
        </Button>
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
                <td>#{delivery.id.toString().padStart(2, '0')}</td>
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
                  <ActionMenu
                    actions={[
                      {
                        type: 'view',
                        onClick: () => handleView(delivery.id),
                      },
                      {
                        type: 'edit',
                        onClick: () => handleEdit(delivery.id),
                      },
                      {
                        type: 'delete',
                        onClick: () => handleDelete(delivery.id),
                      },
                    ]}
                  />
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
            <span>{formatDate(delivery.start_date)}</span>
            <br />
            <span className="bold">Entrega:</span>
            <span>{formatDate(delivery.end_date)}</span>
          </div>

          <div>
            <span className="title">Assinatura do destinatário</span>
          </div>
        </Modal>
      )}
    </>
  );
}
