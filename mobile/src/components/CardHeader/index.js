import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title } from './styles';
import colors from '~/util/colors';

export default function CardHeader({ iconName, title }) {
  return (
    <Container>
      {iconName && <Icon name={iconName} size={18} color={colors.primary} />}
      <Title>{title}</Title>
    </Container>
  );
}

CardHeader.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
