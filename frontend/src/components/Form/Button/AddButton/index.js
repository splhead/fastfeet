import React from 'react';
import { MdAdd } from 'react-icons/md';
import IconButton from '../IconButton';

export default function AddButton({ ...rest }) {
  return (
    <IconButton Icon={MdAdd} {...rest}>
      CADASTRAR
    </IconButton>
  );
}
