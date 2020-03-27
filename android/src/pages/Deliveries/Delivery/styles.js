import styled from 'styled-components/native';
import colors from '~/util/colors';

export const Container = styled.View`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 28.5px;
  background: #fff;
`;

export const Header = styled.View`
  padding-top: 13px;
  padding-left: 14.5px;
  flex-direction: row;
  align-items: baseline;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.primary};
  margin-left: 10px;
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
