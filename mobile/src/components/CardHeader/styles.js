import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.primary};
  margin-left: 10px;
`;
