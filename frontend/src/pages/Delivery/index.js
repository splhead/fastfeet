import React from 'react';

import { MdAdd } from 'react-icons/md';

import Button from '~/components/Form/IconButton';

import { HeaderContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Delivery() {
  return (
    <>
      <h1>Gerenciando encomendas</h1>
      <HeaderContainer>
        <Button icon={addIcon}>CADASTRAR</Button>
      </HeaderContainer>
    </>
  );
}
