import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';

import { Content, MoreButton } from './styles';

export default function ActionMenu({ children, ...rest }) {
  return (
    <Popup
      trigger={
        <MoreButton type="button">
          <MdMoreHoriz color="#C6C6C6" size={24} />
        </MoreButton>
      }
      position="bottom center"
      contentStyle={{
        width: '135px',
        borderRadius: '4px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
      {...rest}
    >
      <Content>{children}</Content>
    </Popup>
  );
}

ActionMenu.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.element])
      .isRequired
  ),
};
