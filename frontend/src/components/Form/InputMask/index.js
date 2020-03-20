import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Input, Container } from './styles';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
    console.log(inputRef.current);
  }, [registerField, fieldName]);

  return (
    <Container>
      <label>{label}</label>
      <Input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span>{error}</span>}
    </Container>
  );
}
