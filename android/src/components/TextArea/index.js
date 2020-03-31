import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { TextInput } from './styles';

export default function TextArea({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextInput
      multiline
      numberOfLines={10}
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}
