import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';
import DeliveryStatus from '~/components/DeliveryStatus';
import ActionMenu from '~/components/ActionMenu';
import Modal from '~/components/Modal';
import Form from '~/components/Form';
import Table from '~/components/Table';

import { TableAvatarContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();
  const [delivery, setDelivery] = useState();
  const [modalIsOpen, setIsOpened] = useState(false);

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

  async function handleSearch(data) {
    loadDelivery(data);
  }

  async function handleView(id) {
    const response = await api.get(`deliveries/${id}`);
    const delivery = response.data;

    if (delivery) {
      setIsOpened(true);
      setDelivery(delivery);
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

  return (
    <>
      <h1>Gerenciando encomendas</h1>
      <Form onSubmit={handleSearch}>
        <SearchInput name="search" placeholder="Buscar por encomendas" />

        <Button icon={addIcon} to="/delivery/add">
          CADASTRAR
        </Button>
      </Form>
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
              <tr key={delivery.id.toString()}>
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
