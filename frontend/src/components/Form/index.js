import React from 'react';

import { HeaderContainer } from './styles';

export default function Form({ children, ...rest }) {
  return <HeaderContainer {...rest}>{children}</HeaderContainer>;
}
