import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import { Container, MaskInput } from './styles';

export default function InputMask({ width, name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.value = value;
      },
      clearValue(ref) {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      <label htmlFor={fieldName}>{label}</label>
      <MaskInput
        ref={inputRef}
        maskChar=""
        alwaysShowMask
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  width: PropTypes.string,
};

InputMask.defaultProps = {
  width: '100%',
};

// 9: 0-9
// a: A-Z, a-z
// *: A-Z, a-z, 0-9

// {
//   mask: '99/99/9999',
//   maskChar: '_',
//   alwaysShowMask: false,
//   formatChars: {
//     '9': '[0-9]',
//     'a': '[A-Za-z]',
//     '*': '[A-Za-z0-9]'
//   },
//   permanents: [2, 5] // permanents is an array of indexes of the non-editable characters in the mask
// }

// {
/* <InputMask
    name="cep"
    mask="99999-999"
    value={customer.cep}
    onChange={e => setPlan({ ...plan, cep: e.target.value })}
  />
  <InputMask
    name="placa"
    mask="aaa-9999"
    value={customer.placa}
    onChange={e => setPlan({ ...plan, placa: e.target.value })}
  /> */
// }
