import React, { useRef } from 'react';
import * as Yup from 'yup';
import { ToastAndroid } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import { Container, Content, SubmitButton } from './styles';
import Background from '~/components/Background';
import TextArea from '~/components/TextArea';
import api from '~/services/api';

export default function InformProblem() {
  const formRef = useRef(null);
  const route = useRoute();
  const { deliveryId } = route.params;
  const { goBack } = useNavigation();

  async function handleSubmit({ description }) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string().required('Por favor informe o problema'),
      });

      await schema.validate(
        { description },
        {
          abortEarly: false,
        }
      );

      await api.post(`delivery/${deliveryId}/problems`, { description });

      ToastAndroid.show('O problema foi registrado!', ToastAndroid.SHORT);

      goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea
            name="description"
            placeholder="Inclua aqui o problema que ocorreu na entrega."
          />

          <SubmitButton onPress={() => formRef.current.submitForm()}>
            Enviar
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
