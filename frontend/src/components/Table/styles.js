import styled from 'styled-components';

import colors from '~/util/colors';

export const TableContainer = styled.table`
  width: 100%;
  border-spacing: 0 20px;

  thead th {
    color: ${colors.darkText};
    font-size: 16px;
    text-align: left;
    padding: 0 20px;

    &:last-child {
      text-align: right;
    }
  }

  tbody tr {
    height: 56px;
    background: #fff;
    padding: 0 24px;
  }

  tbody td {
    font-size: 16px;
    padding: 0 20px;
    color: ${colors.lightText};

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
`;
