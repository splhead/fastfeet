import React, { useState, useEffect } from 'react';

import { Container } from './styles';

export default function DeliveryStatus({ children }) {
  const [background, setBackground] = useState();
  const [color, setColor] = useState();
  const [width, setWidth] = useState();

  useEffect(() => {
    switch (children) {
      case 'ENTREGUE': {
        setBackground('#dff0df');
        setColor('#2ca42b');
        setWidth('99px');
        break;
      }
      case 'PENDENTE': {
        setBackground('#F0F0DF');
        setColor('#C1BC35');
        setWidth('102px');
        break;
      }
      case 'RETIRADA': {
        setBackground('#BAD2FF');
        setColor('#4D85EE');
        setWidth('97px');
        break;
      }
      case 'CANCELADA': {
        setBackground('#FAB0B0');
        setColor('#DE3B3B');
        setWidth('110px');
        break;
      }
      default:
    }
  }, [children]);

  return (
    <Container background={background} color={color} width={width}>
      <div className="elipse" />
      {children}
    </Container>
  );
}
