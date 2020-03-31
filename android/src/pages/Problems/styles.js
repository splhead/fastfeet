import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-top: -90px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 20px 20px;
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
  margin-top: 16px;
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
