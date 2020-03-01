import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import Action from './Action';

import { Container, ActionList, Button } from './styles';

export default function ActionMenu({ actions }) {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(!visible);
  }

  function handleOnClick(action) {
    action();
    setVisible(!visible);
  }

  return (
    <Container>
      <Button onClick={handleVisibility}>
        <MdMoreHoriz size={24} color="#c6c6c6" />
      </Button>
      <ActionList visible={visible}>
        {actions.map(action => (
          <Action
            type={action.type}
            onClick={() => handleOnClick(action.onClick)}
            label={action.label}
          />
        ))}
      </ActionList>
    </Container>
  );
}
