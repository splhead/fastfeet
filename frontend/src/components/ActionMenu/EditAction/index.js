import React from 'react';
import PropTypes from 'prop-types';

import { MdModeEdit } from 'react-icons/md';
import Action from '../Action';

export default function EditAction({ action }) {
  return (
    <Action
      Icon={MdModeEdit}
      iconColor="#4D85EE"
      label="Editar"
      action={action}
    />
  );
}

EditAction.propTypes = {
  action: PropTypes.func.isRequired,
};
