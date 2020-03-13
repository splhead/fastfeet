import React from 'react';
import PropTypes from 'prop-types';

import { MyPopup } from './styles';

export default function Modal({ trigger, children }) {
  return (
    <MyPopup trigger={trigger} modal closeOnDocumentClick>
      {children}
    </MyPopup>
  );
}

Modal.propTypes = {
  trigger: PropTypes.object.isRequired,
};
