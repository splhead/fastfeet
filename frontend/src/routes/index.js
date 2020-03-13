import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryForm from '../pages/Deliveries/Form';
import Deliveryman from '../pages/Deliveryman';
import Recipient from '../pages/Recipient';
import DeliveryProblem from '../pages/DeliveryProblem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery/form" component={DeliveryForm} isPrivate />
      <Route path="/delivery" component={Deliveries} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/problem" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
