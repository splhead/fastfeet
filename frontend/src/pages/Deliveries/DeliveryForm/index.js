import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import FormHeader from '~/components/FormHeader';
import { SaveButton, BackButton } from '~/components/Form/Button';
import Select from '~/components/Select';
import Input from '~/components/Form/Input';

import { Container, Content, LineGroup } from './styles';
import { toast } from 'react-toastify';

export default function DeliveryForm({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  async function loadRecipients(inputValue) {
    const response = await api.get('recipients', {
      params: {
        q: inputValue,
      },
    });

    return response.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));
  }

  async function loadDeliveryman(inputValue) {
    const response = await api.get('deliverymen', {
      params: {
        q: inputValue,
      },
    });

    return response.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));
  }

  useEffect(() => {
    async function loadInitialDelivery() {
      if (id) {
        const response = await api.get(`deliveries/${id}`);

        formRef.current.setData(response.data);

        formRef.current.setFieldValue('recipient_id', {
          value: response.data.Recipient.id,
          label: response.data.Recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.Deliveryman.id,
          label: response.data.Deliveryman.name,
        });
      }
    }

    loadInitialDelivery(id);
  }, [id]);

  async function handleSave(data) {
    formRef.current.setErrors({});
    const { recipient_id, deliveryman_id, product } = data;

    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.number().required('Escolha um destinatário'),
        deliveryman_id: Yup.number().required('Escolha um entregador'),
        product: Yup.string().required('Qual o nome do produto?'),
      });

      await schema.validate(
        { recipient_id, deliveryman_id, product },
        {
          abortEarly: false,
        }
      );

      if (!id) {
        await api.post('deliveries', {
          recipient_id,
          deliveryman_id,
          product,
        });
        toast.success('Encomenda salva.');
      } else {
        await api.put(`deliveries/${id}`, {
          recipient_id,
          deliveryman_id,
          product,
        });
        toast.success('Encomenda atualizada.');
      }
      history.push('/delivery');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <FormHeader>
        <span className="title">Cadastro de encomendas</span>

        <div className="actions">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </div>
      </FormHeader>
      <Content>
        <Unform ref={formRef} onSubmit={handleSave}>
          <LineGroup>
            <Select
              className="select"
              name="recipient_id"
              label="Destinatário"
              placeholder="Destinatário"
              noOptionsMessage={() => 'Destinatário não encontrado'}
              loadOptions={loadRecipients}
            />
            <Select
              name="deliveryman_id"
              label="Entregador"
              placeholder="Entregador"
              noOptionsMessage={() => 'Entregador não encontrado'}
              loadOptions={loadDeliveryman}
            />
          </LineGroup>
          <Input name="product" label="Nome do produto" />
        </Unform>
      </Content>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
