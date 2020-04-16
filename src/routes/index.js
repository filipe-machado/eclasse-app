import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Pages
import Login from '../pages/login';
import Register from '../pages/register';

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/" exact>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
