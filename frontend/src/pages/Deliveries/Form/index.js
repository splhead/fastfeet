import React, { useState, useRef } from 'react';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';

import FormHeader from '~/components/FormHeader';
import { SaveButton, BackButton } from '~/components/Form/Button';
import Select from '~/components/Select';
import Input from '~/components/Form/Input';

import { Container, Content, LineGroup } from './styles';

export default function Form() {
  const formRef = useRef(null);
  const [recipient, setRecipient] = useState();
  const [deliveryman, setDeliveryman] = useState();

  async function loadRecipients() {
    const response = await api.get('recipients');
    const options = response.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));

    return options;
  }

  async function loadDeliveryman() {
    const response = await api.get('deliverymen');
    const options = response.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    return options;
  }

  async function handleSave({ recipient_id, deliveryman_id, product }) {
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
          <SaveButton action={handleSave} />
        </div>
      </FormHeader>
      <Content>
        <Unform ref={formRef}>
          <LineGroup>
            <Select
              className="select"
              name="recipient_id"
              label="Destinatário"
              cacheOptions
              defaultOptions
              loadOptions={loadRecipients}
              value={recipient}
              onChange={newValue => setRecipient(newValue)}
            />
            <Select
              name="deliveryman_id"
              label="Entregador"
              cacheOptions
              defaultOptions
              loadOptions={loadDeliveryman}
              value={deliveryman}
              onChange={newValue => setDeliveryman(newValue)}
            />
          </LineGroup>
          <Input name="product" label="Nome do produto" />
        </Unform>
      </Content>
    </Container>
  );
}
