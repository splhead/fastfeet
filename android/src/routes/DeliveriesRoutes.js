import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import InformProblem from '~/pages/InformProblem';
import Problems from '~/pages/Problems';
//import DeliveryConfirmPhoto from '~/pages/DeliveryConfirmPhoto';
import DeliveryDetails from '~/pages/DeliveryDetails';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Deliveries"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Deliveries"
        component={Deliveries}
      />
      <Stack.Screen
        name="DeliveryDetail"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={DeliveryDetails}
      />
      {/*
      <Stack.Screen
        name="ConfirmPhoto"
        options={{
          title: 'Confirmar entrega',
        }}
        component={DeliveryConfirmPhoto}
      /> */}
      <Stack.Screen
        name="InformProblem"
        options={{
          title: 'Informar problema',
        }}
        component={InformProblem}
      />
      <Stack.Screen
        name="Problems"
        options={{
          title: 'Visualizar problemas',
        }}
        component={Problems}
      />
    </Stack.Navigator>
  );
}
