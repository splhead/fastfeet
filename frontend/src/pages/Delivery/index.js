import React from 'react';

import { MdAdd } from 'react-icons/md';

import Button from '~/components/Form/IconButton';
import SearchInput from '~/components/Form/SearchInput';

import { HeaderContainer, Table, TableAvatarContainer } from './styles';

const addIcon = props => <MdAdd size={24} color="#fff" />;

export default function Delivery() {
  return (
    <>
      <h1>Gerenciando encomendas</h1>
      <HeaderContainer>
        <SearchInput name="search" placeholder="Buscar por encomendas" />
        <Button icon={addIcon}>CADASTRAR</Button>
      </HeaderContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwing Van Bethoven</td>
            <td>
              <TableAvatarContainer>
                <img
                  src="https://api.adorable.io/avatars/40/abott@adorable.png"
                  alt="Jonh Doe"
                />
                <span>Jonh Doe</span>
              </TableAvatarContainer>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>Entregue</td>
            <td />
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwing Van Bethoven</td>
            <td>Jonh Doe</td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>Entregue</td>
            <td />
          </tr>
        </tbody>
      </Table>
    </>
  );
}
