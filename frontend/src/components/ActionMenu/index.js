import React from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, ActionList, Action, Button } from './styles';

export default function ActionMenu() {
  return (
    <Container>
      <Button>
        <MdMoreHoriz size={24} color="#c6c6c6" />
      </Button>
      <ActionList>
        <Action type="view">Visualizar</Action>
        <Action type="edit">Editar</Action>
        <Action type="delete">Excluir</Action>
      </ActionList>
    </Container>
  );
}
