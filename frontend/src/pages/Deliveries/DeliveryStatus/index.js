import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function DeliveryStatus({ background, color, children }) {
  return (
    <Container>
      <Content background={background} color={color}>
        <div className="elipse" />
        <span>{children}</span>
      </Content>
    </Container>
  );
}

DeliveryStatus.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};
