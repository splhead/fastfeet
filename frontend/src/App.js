import React from 'react';
import { Router } from 'react-router-dom';

import history from './services/history';
import './config/ReactotronConfig';
import GlobalStyles from './styles/global';

import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
    </Router>
  );
}

export default App;
