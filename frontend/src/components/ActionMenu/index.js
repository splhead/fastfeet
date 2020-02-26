import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Action from './Action';

import { Container, ActionList, Button } from './styles';

export default function ActionMenu({ children }) {
  const [visible, setVisible] = useState(false);
  function handleOnClick() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Button onClick={handleOnClick}>
        <MdMoreHoriz size={24} color="#c6c6c6" />
      </Button>
      <ActionList visible={visible}>{children}</ActionList>
    </Container>
  );
}
