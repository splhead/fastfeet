import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import HomeRoutes from './HomeRoutes';

const Stack = createStackNavigator();

export default function createRouter(isSigned = false) {
  return (
    <Stack.Navigator>
      {!isSigned ? (
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={SignIn}
        />
      ) : (
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeRoutes}
        />
      )}
    </Stack.Navigator>
  );
}
