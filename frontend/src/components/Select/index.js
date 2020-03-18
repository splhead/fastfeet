import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, MySelect } from './styles';

export default function Select({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

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
      {label && <label>{label}</label>}
      <MySelect
        cacheOptions
        defaultOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Select.defaultProps = {
  label: '',
};
