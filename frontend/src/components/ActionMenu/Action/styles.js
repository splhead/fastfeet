import styled from 'styled-components';

export const Container = styled.div`
  font-size: 16px;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:last-of-type {
    border-bottom: 0;
  }

  svg {
    margin-right: 6px;
  }

  span {
    white-space: nowrap;
  }
`;
