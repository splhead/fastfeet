import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryForm from '../pages/Deliveries/DeliveryForm';
import Deliverymen from '../pages/Deliverymen';
import DeliverymanForm from '../pages/Deliverymen/DeliverymanForm';
import Recipients from '../pages/Recipients';
import RecipientForm from '../pages/Recipients/RecipientForm';
import DeliveryProblem from '../pages/DeliveryProblem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery/form/:id" component={DeliveryForm} isPrivate />
      <Route path="/delivery/form" component={DeliveryForm} isPrivate />
      <Route path="/delivery" component={Deliveries} isPrivate />

      <Route
        path="/deliveryman/form/:id"
        component={DeliverymanForm}
        isPrivate
      />
      <Route path="/deliveryman/form" component={DeliverymanForm} isPrivate />
      <Route path="/deliveryman" component={Deliverymen} isPrivate />

      <Route path="/recipient/form/:id" component={RecipientForm} isPrivate />
      <Route path="/recipient/form" component={RecipientForm} isPrivate />
      <Route path="/recipient" component={Recipients} isPrivate />

      <Route path="/problem" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
