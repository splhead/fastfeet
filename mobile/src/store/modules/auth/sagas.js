import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { parseISO, format } from 'date-fns';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    const user = {
      name: response?.data?.name,
      email: response?.data?.email,
      created_at: format(parseISO(response?.data?.createdAt), 'dd/MM/yyyy'),
      avatar: response?.data?.avatar,
    };
    //api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(id, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados');
    yield put(signFailure());
  }
}

/* export function signOut() {
  history.push('/');
} */

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  /* takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken), */
]);
