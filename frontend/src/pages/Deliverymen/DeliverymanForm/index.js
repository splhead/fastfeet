import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import FormHeader from '~/components/FormHeader';
import { SaveButton, BackButton } from '~/components/Form/Button';
import PhotoInput from '~/components/Form/PhotoInput';
import Input from '~/components/Form/Input';

import { Container, Content } from './styles';
import { toast } from 'react-toastify';

export default function DeliverymanForm({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    async function loadInitialDeliveryman(deliverymanId) {
      if (deliverymanId) {
        const response = await api.get(`deliverymen/${deliverymanId}`);

        formRef.current.setData(response.data);

        formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
      }
    }

    loadInitialDeliveryman(id);
  }, [id]);

  async function handleSave(data) {
    formRef.current.setErrors({});
    const { name, email } = data;

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é necessário.'),
        email: Yup.string()
          .email('Um e-mail válido por favor...')
          .required('O e-mail é necessário'),
      });

      await schema.validate(
        { name, email },
        {
          abortEarly: false,
        }
      );

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      if (!id) {
        await api.post('deliverymen', {
          name,
          email,
          avatar_id: responseFile?.data?.id,
        });
        toast.success('Entregador criado.');
      } else {
        await api.put(`deliverymen/${id}`, {
          name,
          email,
          avatar_id: responseFile?.data?.id,
        });
        toast.success('Entregador atualizado.');
      }
      history.push('/deliveryman');
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
        <span className="title">Cadastro de entregadores</span>

        <div className="actions">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </div>
      </FormHeader>
      <Content>
        <Unform ref={formRef} onSubmit={handleSave}>
          <PhotoInput name="avatar" />
          <Input name="name" label="Nome" />
          <Input type="email" name="email" label="email" />
        </Unform>
      </Content>
    </Container>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
