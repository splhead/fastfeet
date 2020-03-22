import React, { useMemo } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import ActionMenu from '~/components/ActionMenu';
import CancelDeliveryAction from './CancelDeliveryAction';
import DeliveryProblemModal from './DeliveryProblemModal';

export default function DeliveryProblem({ problem }) {
  const problemFormatted = useMemo(
    () => ({
      ...problem,
      idFormatted: problem.id.toString().padStart(2, '0'),
      descriptionFormatted: `${problem.description.substring(0, 88)}...`,
    }),
    [problem]
  );

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente cancelar?');

    if (answer) {
      await api.delete(`problem/${id}/cancel-delivery`);
      history.push('/delivery');
    }
  }

  return (
    <>
      <td>#{problemFormatted.idFormatted}</td>
      <td>{problemFormatted.descriptionFormatted}</td>
      <td>
        <ActionMenu>
          <DeliveryProblemModal problem={problem} />
          <CancelDeliveryAction onClick={() => handleDelete(problem.id)} />
        </ActionMenu>
      </td>
    </>
  );
}
