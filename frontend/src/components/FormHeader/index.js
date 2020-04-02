import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormHeader({ children }) {
  return <Container>{children}</Container>;
}

FormHeader.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.element])
      .isRequired
  ),
};
