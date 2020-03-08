import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { FormGroup, Label, MyInput } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormGroup>
      <Label htmlFor={fieldName}>{label}</Label>
      <MyInput ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span className="error">{error}</span>}
    </FormGroup>
  );
}
