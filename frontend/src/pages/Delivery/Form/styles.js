import styled from 'styled-components';

export const Container = styled.div`
  div {
    display: flex;
    align-items: center;

    a + a {
      margin-left: 16px;
    }
  }
`;

export const Content = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  margin-top: 24px;
`;
