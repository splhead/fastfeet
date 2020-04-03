import styled from 'styled-components';
import { IconButton } from '~/components/Form/Button';
import colors from '~/util/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0 16px;
    color: ${colors.lightText};
  }
`;

export const Button = styled(IconButton)`
  background: ${colors.primary};

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
