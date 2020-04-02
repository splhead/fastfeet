import styled from 'styled-components/native';
import colors from '~/util/colors';
import { TouchableOpacity } from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Background = styled.View`
  height: 155px;
  background: ${colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  margin: -60px 20px 0;
`;

export const Card = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,

  elevation: 1,
})`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  background: #fff;
  padding: 14px 14px 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.Text`
  text-transform: uppercase;
  color: ${colors.labelColor};
  font-size: 14px;
  margin: 6px 0;
  font-weight: bold;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: ${colors.lightText};
  margin-bottom: 16px;
`;

export const InfoGroupLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoGroup = styled.View``;

export const ActionContainer = styled.View`
  flex-direction: row;
`;

export const Action = styled(TouchableOpacity)`
  flex: 1;
  background: #f8f9fd;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  align-items: center;
  margin-bottom: 10px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export const ActionText = styled.Text`
  font-size: 12px;
  color: ${colors.labelColor};
  text-align: center;
`;
