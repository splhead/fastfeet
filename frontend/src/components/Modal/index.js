import React from 'react';
import PropTypes from 'prop-types';
import { MdVisibility } from 'react-icons/md';

import { MyPopup, Button } from './styles';

export default function Modal({ children, ...rest }) {
  return (
    <MyPopup
      trigger={
        <Button>
          <MdVisibility size={20} color="#8E5BE8" />
          <span>Visualizar</span>
        </Button>
      }
      modal
      closeOnDocumentClick
      {...rest}
    >
      {children}
    </MyPopup>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
