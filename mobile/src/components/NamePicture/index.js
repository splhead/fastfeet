import React from 'react';

import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function NamePicture({ name, height }) {
  if (!name) return <></>;
  const nameSplit = name.split(' ');
  const random = Math.floor(Math.random() * (5 + 1));

  return (
    <Container number={random} height={height}>
      <Text number={random} height={height}>
        {nameSplit?.[0]?.[0]}
        {nameSplit?.length > 2
          ? nameSplit?.[2]?.[0].toUpperCase()
          : nameSplit?.[1]?.[0].toUpperCase()}
      </Text>
    </Container>
  );
}

NamePicture.propTypes = {
  name: PropTypes.string,
  height: PropTypes.string,
};
