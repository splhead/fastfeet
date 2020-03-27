import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View`
  margin-top: 18px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 46px;
`;

export const Circle = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  border: 1px solid ${colors.primary};
  background: ${(props) => (props.filled ? colors.primary : '#fff')};
`;

export const Line = styled.View`
  height: 1px;
  background: ${colors.primary};
  flex: 1;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 35px 10px 28px;
`;

export const Label = styled.Text`
  font-size: 8px;
  color: #999;
  text-align: center;
`;
