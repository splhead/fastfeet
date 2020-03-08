import React from 'react';
import PropTypes from 'prop-types';

import { MdVisibility } from 'react-icons/md';
import Action from '../Action';

export default function ViewAction({ action }) {
  return (
    <Action
      Icon={MdVisibility}
      iconColor="#8E5BE8"
      label="Visualizar"
      action={action}
    />
  );
}

ViewAction.propTypes = {
  action: PropTypes.func.isRequired,
};
