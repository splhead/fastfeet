import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  StatusContainer,
  Circle,
  Line,
  LabelContainer,
  Label,
} from './styles';

export default function Status({ status }) {
  return (
    <Container>
      <StatusContainer>
        <Circle filled={status === 'PENDENTE'} />
        <Line />
        <Circle filled={status === 'RETIRADA'} />
        <Line />
        <Circle filled={status === 'ENTREGUE'} />
      </StatusContainer>
      <LabelContainer>
        <Label>Aguardando {'\n'} Retirada</Label>
        <Label>Retirada</Label>
        <Label>Entregue</Label>
      </LabelContainer>
    </Container>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
