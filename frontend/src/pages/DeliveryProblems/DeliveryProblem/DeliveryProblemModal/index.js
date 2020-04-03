import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Modal from '~/components/Modal';

export default function DeliveryProblemModal({ problem }) {
  return (
    <Modal contentStyle={{ width: '450px' }}>
      <Container>
        <div>
          <span className="title">VIZUALIZAR PROBLEMA</span>
          <p>{problem.description}</p>
        </div>
      </Container>
    </Modal>
  );
}

DeliveryProblemModal.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
