import React, { useMemo } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import ActionMenu from '~/components/ActionMenu';
import EditAction from '~/components/ActionMenu/EditAction';
import DeleteAction from '~/components/ActionMenu/DeleteAction';

export default function Recipient({ recipient, loadRecipients }) {
  const idFormatted = useMemo(() => recipient.id.toString().padStart(2, '0'), [
    recipient,
  ]);

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente excluir?');

    if (answer) {
      await api.delete(`recipients/${id}`);
      loadRecipients();
    }
  }

  return (
    <>
      <td>#{idFormatted}</td>
      <td>{recipient.name}</td>
      <td>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
      <td>
        <ActionMenu>
          <EditAction
            onClick={() => history.push(`/recipient/form/${recipient.id}`)}
          />
          <DeleteAction onClick={() => handleDelete(recipient.id)} />
        </ActionMenu>
      </td>
    </>
  );
}
