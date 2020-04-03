import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { TableAvatarContainer } from './styles';

import { statusColors } from '~/util/colors';
import api from '~/services/api';
import history from '~/services/history';

import DeliveryStatus from '~/pages/Deliveries/DeliveryStatus';
import DeliveryModal from '~/pages/Deliveries/DeliveryModal';
import ActionMenu from '~/components/ActionMenu';
import EditAction from '~/components/ActionMenu/EditAction';
import DeleteAction from '~/components/ActionMenu/DeleteAction';
import NamePicture from '~/components/NamePicture';

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
      idFormatted: data.id.toString().padStart(2, '0'),
      start_date: formatDate(data.start_date),
      end_date: formatDate(data.end_date),
    };
  }, [data]);

  useEffect(() => {
    setDelivery(deliveryFormatted);
  }, [deliveryFormatted]);

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir?');

    if (answer) {
      await api.delete(`deliveries/${id}`);
      loadDeliveries();
    }
  }

  if (delivery) {
    console.tron.log(delivery.Deliveryman);
    return (
      <>
        <td>#{delivery.idFormatted}</td>
        <td>{delivery.Recipient.name}</td>
        <td>
          <TableAvatarContainer>
            {delivery?.Deliveryman?.avatar ? (
              <img
                src={`http://localhost:3333/files/${delivery.Deliveryman.avatar.path}`}
                alt={delivery.Deliveryman.name}
              />
            ) : (
              <NamePicture name={delivery.Deliveryman.name} />
            )}
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
            <DeliveryModal delivery={delivery} />
            <EditAction
              onClick={() => history.push(`/delivery/form/${delivery.id}`)}
            />
            <DeleteAction onClick={() => handleDelete(delivery.id)} />
          </ActionMenu>
        </td>
      </>
    );
  }
}

Delivery.propTypes = {
  loadDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    Recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    Deliveryman: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
