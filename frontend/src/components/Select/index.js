import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, MySelect } from './styles';

export default function Select({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <MySelect ref={selectRef} name={name} {...rest} />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}
