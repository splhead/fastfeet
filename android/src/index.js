import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import './config/ReactotronConfig';
import Routes from './routes';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
