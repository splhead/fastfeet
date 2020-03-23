import React, { useRef } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Submit } from './styles';
import logo from '~/assets/logo.png';

import Input from '~/components/Input';
import colors from '~/util/colors';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const formRef = useRef(null);

  function handleSubmit({ id }, { reset }) {
    dispatch(signInRequest(id));
    reset();
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Container>
        <Image source={logo} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="id"
            placeholder="informe seu ID de cadastro"
            keyboardType="number-pad"
            autoCorrect={false}
            returnKeyType="send"
            autoCapitalize="none"
          />
          <Submit
            style={{ width: 325 }}
            loading={loading}
            onPress={() => formRef.current.submitForm()}
          >
            Entrar no sistema
          </Submit>
        </Form>
      </Container>
    </>
  );
}
