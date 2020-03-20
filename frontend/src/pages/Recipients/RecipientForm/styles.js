import styled from 'styled-components';

export const Container = styled.div`
  div.actions {
    display: flex;
    align-items: center;

    button + button {
      margin-left: 16px;
    }
  }
`;

export const Content = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  margin-top: 24px;

  div.select {
    margin-right: 24px;
  }
`;

export const LineGroup = styled.div`
  display: flex;

  div + div {
    margin-left: 16px;
  }
`;
