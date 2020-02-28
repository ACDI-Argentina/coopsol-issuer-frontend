import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './private-route';
import Login from '../pages/Login/login';
import Error404 from '../pages/Error404/error404';


const routesConfig = [
  { path: '/login', component: Login, requireAuthentication: false },
  { component: Error404, requireAuthentication: false }
];

export const Router = () => {
  const routes = routesConfig.map((route, index) => <PrivateRoute key={index} {...route} />);
  return (
    <div className="AppContainer">
      <div className="MainContent">
        <div>
          <BrowserRouter>
            <Switch>{routes}</Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};
