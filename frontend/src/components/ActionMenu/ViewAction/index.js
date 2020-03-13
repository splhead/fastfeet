import React from 'react';

import { MdVisibility } from 'react-icons/md';
import Action from '../Action';

export default function ViewAction({ ...rest }) {
  return (
    <Action
      Icon={MdVisibility}
      iconColor="#8E5BE8"
      label="Visualizar"
      {...rest}
    />
  );
}
