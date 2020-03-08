import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Action({ Icon, iconColor, label, action }) {
  return (
    <Container onClick={action}>
      {Icon && <Icon size={20} color={iconColor} />}
      <span>{label}</span>
    </Container>
  );
}

Action.propTypes = {
  Icon: PropTypes.func,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
