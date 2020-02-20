import React from 'react';

import { MyButton } from './styles';

export default function Button({ children, ...rest }) {
  return <MyButton {...rest}>{children}</MyButton>;
}
