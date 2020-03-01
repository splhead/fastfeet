import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { MdSearch } from 'react-icons/md';

import colors from '~/util/colors';

import { Container, MyInput } from './styles';

export default function SearchInput({ name, ...rest }) {
  const searchInputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: searchInputRef.current,
      path: 'value',
    });
  }, [fieldName, searchInputRef, registerField]);

  return (
    <Container>
      <MdSearch size={20} color={colors.placeholder} />
      <MyInput name={name} ref={searchInputRef} {...rest} />
    </Container>
  );
}
