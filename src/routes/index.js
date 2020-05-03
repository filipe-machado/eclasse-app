import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages';
import Instituicao from '../pages/instituicoes';

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

        <Route path="" exact>
          <Home />
        </Route>

        <Route path="/instituicoes" exact>
          <Instituicao />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
