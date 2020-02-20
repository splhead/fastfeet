import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from './services/history';
import './config/ReactotronConfig';

import { store, persistor } from '~/store';

import GlobalStyles from './styles/global';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
