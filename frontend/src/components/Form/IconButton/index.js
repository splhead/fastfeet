import React from 'react';

import { MyButton } from './styles';

export default function Button({ icon: Icon, children, ...rest }) {
  return (
    <MyButton {...rest}>
      <Icon />
      {children}
    </MyButton>
  );
}
