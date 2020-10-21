import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import signup from './pages/signup';
import PrivateRoute from './PrivateRoute';
import dashboard from './pages/dashboard';
import settings from './pages/settings';
import create from './pages/create';

class App extends Component
{ 
  render()
  {
    return (
      <BrowserRouter>    
          <Switch>
            <Route exact path="/" component={signup} />
            <PrivateRoute path="/dashboard" component={dashboard} exact={true} />
            <PrivateRoute path="/settings" component={settings} exact={true} />
            <PrivateRoute path="/create" component={create} exact={true} />
          </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
