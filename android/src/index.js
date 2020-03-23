import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import Routes from './routes';
import { store, persistor } from '~/store';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
