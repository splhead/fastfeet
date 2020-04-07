import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function NamePicture({ name }) {
  const nameSplit = name.split(' ');

  return (
    <Container number={Math.floor(Math.random() * (5 + 1))}>
      <span>
        {nameSplit?.[0]?.[0]}
        {nameSplit.length > 2
          ? nameSplit?.[2]?.[0].toUpperCase()
          : nameSplit?.[1]?.[0].toUpperCase()}
      </span>
    </Container>
  );
}

NamePicture.propTypes = {
  name: PropTypes.string.isRequired,
};
