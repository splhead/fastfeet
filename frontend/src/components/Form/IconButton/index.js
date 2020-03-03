import React from 'react';
import history from '~/services/history';

import { MyButton } from './styles';

export default function Button({ icon: Icon, onClick, to, children, ...rest }) {
  return (
    <MyButton
      {...rest}
      onClick={event => {
        onClick && onClick(event);
        history.push(to);
      }}
    >
      <Icon />
      {children}
    </MyButton>
  );
}
