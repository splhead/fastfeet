import React from 'react';
import PropTypes from 'prop-types';

import { MdDelete } from 'react-icons/md';
import Action from '../Action';

export default function DeleteAction({ action }) {
  return (
    <Action
      Icon={MdDelete}
      iconColor="#DE3B3B"
      label="Excluir"
      action={action}
    />
  );
}

DeleteAction.propTypes = {
  action: PropTypes.func.isRequired,
};
