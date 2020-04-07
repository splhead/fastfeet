import styled from 'styled-components/native';

const colors = [
  {
    color: '#A28FD0',
    background: '#F4EFFC',
  },
  {
    color: '#CB946C',
    background: '#FCF4EE',
  },
  {
    color: '#83CEC9',
    background: '#EBFBFA',
  },
  {
    color: '#CC7584',
    background: '#FFEEF1',
  },
  {
    color: '#A8D080',
    background: '#F4F9EF',
  },
  {
    color: '#CCCC8B',
    background: '#FCFCEF',
  },
];

export const Container = styled.View`
  background: ${(props) => colors[props.number].background};
  margin-right: 4px;
  height: ${(props) => (props.height ? `${props.height}px` : '68px')};
  width: ${(props) => (props.height ? `${props.height}px` : '68px')};
  border-radius: ${(props) =>
    props.height ? `${props.height / 2}px` : '34px'};
  align-self: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${(props) => (props.height ? '60px' : '31px')};
  color: ${(props) => colors[props.number].color};
`;
