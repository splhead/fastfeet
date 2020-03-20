import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import FormHeader from '~/components/FormHeader';
import { SaveButton, BackButton } from '~/components/Form/Button';
import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';

import { Container, Content, LineGroup } from './styles';
import { toast } from 'react-toastify';

export default function RecipientForm({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function loadInitialRecipient(recipientId) {
      if (recipientId) {
        const response = await api.get(`recipients/${recipientId}`);
        console.tron.log(response);

        formRef.current.setData(response.data);
      }
    }

    loadInitialRecipient(id);
  }, [id]);

  async function handleSave(data) {
    formRef.current.setErrors({});
    const { name, street, number, complement, city, state, zip_code } = data;

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é necessário.'),
        street: Yup.string().required(),
        number: Yup.number().required(),
        complement: Yup.string(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        zip_code: Yup.string().required(),
      });

      await schema.validate(
        { name, street, number, complement, city, state, zip_code },
        {
          abortEarly: false,
        }
      );

      if (!id) {
        await api.post('recipients', {
          name,
          street,
          number,
          complement,
          city,
          state,
          zip_code,
        });
        toast.success('Destinatário criado.');
      } else {
        await api.put(`recipients/${id}`, {
          name,
          street,
          number,
          complement,
          city,
          state,
          zip_code,
        });
        toast.success('Destinatário atualizado.');
      }
      history.push('/recipient');
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
        <span className="title">Cadastro de destinatário</span>

        <div className="actions">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </div>
      </FormHeader>
      <Content>
        <Unform ref={formRef} onSubmit={handleSave}>
          <Input name="name" label="Nome" />
          <LineGroup>
            <Input name="street" label="Rua" width="500px" />
            <InputMask
              id="number"
              name="number"
              label="Número"
              mask="99999"
              width="150px"
            />
            <Input name="complement" label="Complemento" width="200px" />
          </LineGroup>
          <LineGroup>
            <Input name="city" label="Cidade" />
            <Input name="state" label="Estado" />
            <InputMask
              id="zip_code"
              name="zip_code"
              label="CEP"
              mask="99999-999"
            />
          </LineGroup>
        </Unform>
      </Content>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
