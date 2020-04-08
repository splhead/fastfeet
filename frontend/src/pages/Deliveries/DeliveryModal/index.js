import React from 'react';
import 'dotenv';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Modal from '~/components/Modal';

export default function DeliveryModal({ delivery }) {
  return (
    <Modal contentStyle={{ width: '450px' }}>
      <Container>
        <div>
          <span className="title">Informações da encomenda</span>

          <span className="address">
            {delivery.Recipient.street}, {delivery.Recipient.number}
          </span>

          {delivery.Recipient.complement && (
            <span className="address">{delivery.Recipient.complement}</span>
          )}
          <span className="address">
            {delivery.Recipient.city} - {delivery.Recipient.state}
          </span>
          <span className="address">{delivery.Recipient.zip_code}</span>
        </div>

        {delivery.start_date && (
          <div>
            <span className="title">Datas</span>

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
            <div className="signature-container">
              <img
                src={`${process.env.REACT_APP_API_URL}/files/${delivery.signature.path}`}
                alt="Assinatura"
              />
            </div>
          </div>
        )}
      </Container>
    </Modal>
  );
}

DeliveryModal.propTypes = {
  delivery: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    signature: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    Recipient: PropTypes.shape({
      street: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      complement: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    }),
  }),
};
