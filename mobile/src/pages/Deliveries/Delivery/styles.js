import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 2.0,

  elevation: 1,
})`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 28.5px;
  background: #fff;
`;

export const Content = styled.View`
  margin: 14px;
`;

export const Footer = styled.View`
  padding: 20px;
  background: #f8f9fd;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const InfoGroup = styled.View``;

export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const Info = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.darkText};
`;

export const DetailLink = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.primary};
`;
