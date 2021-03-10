import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Update from '../pages/Update';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/atualizar-valor" component={Update} />
    <Route path="/login" component={Login} />
  </Switch>
)

export default Routes;
