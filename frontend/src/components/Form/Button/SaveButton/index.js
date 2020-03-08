import React from 'react';
import IconButton from '../IconButton';

import { MdDone } from 'react-icons/md';

export default function SaveButton({ ...rest }) {
  return (
    <IconButton Icon={MdDone} {...rest}>
      SALVAR
    </IconButton>
  );
}
