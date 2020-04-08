import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import FormHeader from '~/components/FormHeader';
import { SaveButton, BackButton } from '~/components/Form/Button';
import Input from '~/components/Form/Input';
import MaskInput from '~/components/Form/MaskInput';

import { Container, Content, LineGroup } from './styles';
import { toast } from 'react-toastify';

export default function RecipientForm({ match }) {
  const [, setNumber] = useState(); // magic to inputmask
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function loadInitialRecipient() {
      if (id) {
        const response = await api.get(`recipients/${id}`);
        formRef.current.setData(response.data);
        setNumber(response?.data?.number); // magic to inputmask
      }
    }
    loadInitialRecipient();
  }, [id]);

  async function handleSave(data) {
    formRef.current.setErrors({});
    const { name, street, number, complement, city, state, zip_code } = data;

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é necessário.'),
        street: Yup.string().required('Informe a rua'),
        number: Yup.string().required('O número é necessáro'),
        complement: Yup.string(),
        city: Yup.string().required('qual a cidade?'),
        state: Yup.string().required('Seu estado por favor'),
        zip_code: Yup.string().required('Informe o CEP'),
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
      //reset();
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
          <Input id="name" name="name" label="Nome" />
          <LineGroup>
            <Input id="street" name="street" label="Rua" />
            <MaskInput
              label="Número"
              id="number"
              name="number"
              mask="99999"
              placeholder="99999"
            />
            <Input
              id="complement"
              name="complement"
              label="Complemento"
              width="300px"
            />
          </LineGroup>
          <LineGroup>
            <Input id="city" name="city" label="Cidade" />
            <Input id="state" name="state" label="Estado" />
            <MaskInput
              label="CEP"
              name="zip_code"
              id="zip_code"
              mask="99999-999"
              placeholder="99999-999"
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
