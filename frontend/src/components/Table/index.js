import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer } from './styles';

export default function Table({ children }) {
  return <TableContainer>{children}</TableContainer>;
}

Table.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.element])
      .isRequired
  ),
};
