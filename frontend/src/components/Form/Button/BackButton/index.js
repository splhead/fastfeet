import React from 'react';

import colors from '~/util/colors';

import history from '~/services/history';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import IconButton from '../IconButton';

export default function BackButton({ ...rest }) {
  return (
    <IconButton
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background={colors.backButton}
      {...rest}
    >
      VOLTAR
    </IconButton>
  );
}
