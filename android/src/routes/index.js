//import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function Routes() {
  //const signed = useSelector(state => state.auth.signed);
  const signed = false;

  return createRouter(signed);
}
