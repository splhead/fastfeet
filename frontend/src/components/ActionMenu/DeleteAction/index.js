import React from 'react';

import { MdDelete } from 'react-icons/md';
import Action from '../Action';

export default function DeleteAction({ ...rest }) {
  return (
    <Action Icon={MdDelete} iconColor="#DE3B3B" label="Excluir" {...rest} />
  );
}
