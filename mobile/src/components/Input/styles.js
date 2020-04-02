import styled from 'styled-components/native';
import colors from '~/util/colors';

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 45px;
  width: 325px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 38px;
  background: #fff;
  border-radius: 4px;
`;

export const Error = styled.Text`
  color: ${colors.red};
`;
