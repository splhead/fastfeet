import React, { useState, useEffect } from 'react';

import { Container, Content } from './styles';

export default function Modal({ requestClose, isOpen, children }) {
  return (
    <Container isOpen={isOpen} onClick={requestClose}>
      <Content>{children}</Content>
    </Container>
  );
}
