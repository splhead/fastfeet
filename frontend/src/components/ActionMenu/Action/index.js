import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function Action({ Icon, iconColor, label, ...rest }) {
  return (
    <Button {...rest}>
      {Icon && <Icon size={20} color={iconColor} />}
      {label && <span>{label}</span>}
    </Button>
  );
}

Action.propTypes = {
  Icon: PropTypes.func,
  iconColor: PropTypes.string,
  label: PropTypes.string,
};
