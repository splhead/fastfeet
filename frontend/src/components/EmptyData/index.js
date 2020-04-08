import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function EmptyData({ text }) {
  return (
    <Container>
      {text ? <strong>{text}</strong> : <strong>Nenhum encontrado(a).</strong>}
    </Container>
  );
}

EmptyData.propTypes = {
  text: PropTypes.string,
};

EmptyData.defaultProps = {
  text: '',
};
