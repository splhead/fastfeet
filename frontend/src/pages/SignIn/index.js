import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import logo from '~/assets/logo.svg';
import { Container, Button } from './styles';

import Input from '~/components/Form/Input';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido!')
          .required('O e-mail é necessário'),
        password: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .required('A senha é necessária'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));

      reset();
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
      <img src={logo} alt="FastFeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
        />

        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="********"
        />

        <Button type="submit">
          {loading ? 'Carregando...' : 'Entrar no Sistema'}
        </Button>
      </Form>
    </Container>
  );
}
