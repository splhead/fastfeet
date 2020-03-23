import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Stack = createStackNavigator();

export default function createRouter(isSigned = false) {
  return (
    <Stack.Navigator>
      {!isSigned ? (
        <Stack.Screen
          name="SignIn"
          options={{headerShown: false}}
          component={SignIn}
        />
      ) : (
        <Stack.Screen
          name="Dashboard"
          options={{headerShown: false}}
          component={Dashboard}
        />
      )}
    </Stack.Navigator>
  );
}
