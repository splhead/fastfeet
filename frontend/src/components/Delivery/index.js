import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { TableAvatarContainer } from './styles';

import { statusColors } from '~/util/colors';
import api from '~/services/api';

import DeliveryStatus from '~/components/DeliveryStatus';
import ActionMenu from '~/components/ActionMenu';
import ViewAction from '~/components/ActionMenu/ViewAction';
import EditAction from '~/components/ActionMenu/EditAction';
import DeleteAction from '~/components/ActionMenu/DeleteAction';
import DeliveryModal from '~/pages/Deliveries/DeliveryModal';

export default function Delivery({ data, loadDeliveries }) {
  const [delivery, setDelivery] = useState(data);

  const formatDate = date => {
    if (date) {
      return format(parseISO(date), "dd'/'MM'/'yyyy", {
        locale: ptBR,
      });
    }
  };

  const deliveryFormatted = useMemo(() => {
    return {
      ...data,
      id: data.id.toString().padStart(2, '0'),
      start_date: formatDate(data.start_date),
      end_date: formatDate(data.end_date),
    };
  }, [data]);

  useEffect(() => {
    setDelivery(deliveryFormatted);
  }, [deliveryFormatted]);

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir a encomenda?');

    if (answer) {
      await api.delete(`deliveries/${id}`);
      loadDeliveries();
    }
  }

  if (delivery) {
    console.tron.log(delivery);
    return (
      <>
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
            <DeliveryModal trigger={<ViewAction />} delivery={delivery} />
            <EditAction />
            <DeleteAction onClick={() => handleDelete(delivery.id)} />
          </ActionMenu>
        </td>
      </>
    );
  }
}
