import React from 'react';

import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import FormHeader from '~/components/FormHeader';
import Button from '~/components/Form/IconButton';

import { Container, Content } from './styles';

export default function Form() {
  const arrowLeftIcon = props => <MdKeyboardArrowLeft size={16} color="#fff" />;
  const doneIcon = props => <MdDone size={16} color="#fff" />;

  return (
    <Container>
      <FormHeader>
        <span className="title">Cadastro de encomendas</span>

        <div>
          <Button icon={arrowLeftIcon} color="#ccc" to="/delivery">
            Voltar
          </Button>
          <Button icon={doneIcon}>Salvar</Button>
        </div>
      </FormHeader>
      <Content></Content>
    </Container>
  );
}
