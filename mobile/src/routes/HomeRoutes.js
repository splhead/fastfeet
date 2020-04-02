import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/util/colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveriesRoutes from './DeliveriesRoutes';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
        }}
      >
        <Tab.Screen
          name="Deliveries"
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ color, size }) => (
              <Icon name="reorder" size={size} color={color} />
            ),
          }}
          component={DeliveriesRoutes}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" size={size} color={color} />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
