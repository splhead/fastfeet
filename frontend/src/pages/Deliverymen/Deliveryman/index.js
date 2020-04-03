import React, { useMemo } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import { TableAvatarContainer } from './styles';

import ActionMenu from '~/components/ActionMenu';
import EditAction from '~/components/ActionMenu/EditAction';
import DeleteAction from '~/components/ActionMenu/DeleteAction';
import NamePicture from '~/components/NamePicture';

export default function Deliveryman({ deliveryman, loadDeliverymen }) {
  const idFormatted = useMemo(
    () => deliveryman.id.toString().padStart(2, '0'),
    [deliveryman]
  );

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir?');

    if (answer) {
      await api.delete(`deliverymen/${id}`);
      loadDeliverymen();
    }
  }

  return (
    <>
      <td>#{idFormatted}</td>
      <td>
        <TableAvatarContainer>
          {deliveryman.avatar?.url ? (
            <img src={deliveryman.avatar.url} alt={deliveryman.name} />
          ) : (
            <NamePicture name={deliveryman.name} />
          )}
        </TableAvatarContainer>
      </td>
      <td>{deliveryman.name}</td>
      <td>{deliveryman.email}</td>
      <td>
        <ActionMenu>
          <EditAction
            onClick={() => history.push(`/deliveryman/form/${deliveryman.id}`)}
          />
          <DeleteAction onClick={() => handleDelete(deliveryman.id)} />
        </ActionMenu>
      </td>
    </>
  );
}
