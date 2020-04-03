import React from 'react';
import PropTypes from 'prop-types';

import colors from '~/util/colors';
import { MyButton } from './styles';

export default function Button({ Icon, action, children, ...rest }) {
  return (
    <MyButton onClick={action} {...rest}>
      {Icon && <Icon size={24} color="#fff" style={{ marginRight: 6 }} />}
      {children}
    </MyButton>
  );
}

Button.propTypes = {
  Icon: PropTypes.func,
  action: PropTypes.func.isRequired,
  background: PropTypes.string,
};

Button.defaultProps = {
  background: colors.primary,
};
