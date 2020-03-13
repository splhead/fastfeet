import React from 'react';

import { MdModeEdit } from 'react-icons/md';
import Action from '../Action';

export default function EditAction({ ...rest }) {
  return (
    <Action Icon={MdModeEdit} iconColor="#4D85EE" label="Editar" {...rest} />
  );
}
