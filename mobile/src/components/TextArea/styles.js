import styled from 'styled-components/native';
import colors from '~/util/colors';

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  textAlignVertical: 'top',
})`
  width: 100%;
  font-size: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
`;

export const Error = styled.Text`
  color: ${colors.red};
`;
