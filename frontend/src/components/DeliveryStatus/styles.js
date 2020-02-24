import styled from 'styled-components';

export const Container = styled.div`
  height: 25px;
  width: ${props => props.width};
  border-radius: 12px;
  background: ${props => props.background};
  color: ${props => props.color};
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;

  div.elipse {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${props => props.color};
    margin-right: 6px;
  }
`;
