import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Content = styled.div`
  height: 25px;
  border-radius: 12px;
  background: ${props => props.background};

  display: flex;
  align-items: center;

  div.elipse {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${props => props.color};
    margin-left: 6px;
  }

  span {
    color: ${props => props.color};
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    margin: 0 6px;
  }
`;
