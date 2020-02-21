import styled from 'styled-components';

import colors from '~/util/colors';

export const Container = styled.div`
  background: #fff;
  border: 1px solid ${colors.borderColor};

  img {
    height: 24px;
  }
`;

export const Content = styled.div`
  height: 64px;
  padding: 0 32px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #999;
    }

    a.selected {
      color: ${colors.darkText};
    }

    a + a {
      margin-left: 20px;
    }
  }
`;

export const LogoMenuContainer = styled.div`
  display: flex;
`;

export const Bar = styled.div`
  height: 24px;
  width: 1px;
  background: #ddd;
  margin: 0 24px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;

  span {
    display: block;
    font-weight: bold;
    color: #666;
  }

  a {
    margin-top: 5px;
    color: #de3b3b;
  }
`;
