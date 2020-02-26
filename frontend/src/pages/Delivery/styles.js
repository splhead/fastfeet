import styled from 'styled-components';
import { Form } from '@unform/web';

import colors from '~/util/colors';

export const Table = styled.table`
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

export const HeaderContainer = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TableAvatarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    margin-right: 4px;
  }
`;
