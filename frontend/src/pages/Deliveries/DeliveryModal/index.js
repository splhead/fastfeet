import React from 'react';
//import PropTypes from 'prop-types';
import { Container } from './styles';
import Modal from '~/components/Modal';

export default function DeliveryModal({ delivery }) {
  return (
    <Modal contentStyle={{ width: '450px' }}>
      <Container>
        <div>
          <span className="title">Informações da encomenda</span>
          <br />
          <span>
            {delivery.Recipient.street}, {delivery.Recipient.number}
            <br />
            {delivery.Recipient.complement}
            {delivery.Recipient.complement && <br />}
            {delivery.Recipient.city} - {delivery.Recipient.state}
            <br />
            {delivery.Recipient.zip_code}
          </span>
        </div>

        {delivery.start_date && (
          <div>
            <span className="title">Datas</span>
            <br />
            <span className="bold">Retirada:</span>
            <span>{delivery.start_date}</span>
            <br />
            <span className="bold">Entrega:</span>
            <span>{delivery.end_date}</span>
          </div>
        )}

        {delivery.signature && (
          <div>
            <span className="title">Assinatura do destinatário</span>
            <img
              src={`http://localhost:3333/files/${delivery.signature.path}`}
              alt="Assinatura"
            />
          </div>
        )}
      </Container>
    </Modal>
  );
}
