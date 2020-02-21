import React from 'react';

import { MdSearch } from 'react-icons/md';

import colors from '~/util/colors';

import { Container, MyInput } from './styles';

export default function SearchInput({ name, ...rest }) {
  return (
    <Container>
      <MdSearch size={20} color={colors.placeholder} />
      <MyInput name={name} {...rest} />
    </Container>
  );
}
