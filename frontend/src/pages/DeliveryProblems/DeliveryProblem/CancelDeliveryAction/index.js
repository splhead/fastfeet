import React from 'react';

import { MdDelete } from 'react-icons/md';
import Action from '~/components/ActionMenu/Action';

export default function CancelDeliveryAction({ ...rest }) {
  return (
    <Action
      Icon={MdDelete}
      iconColor="#DE3B3B"
      label="Cancelar encomenda"
      {...rest}
    />
  );
}
