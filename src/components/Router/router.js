import React from 'react';
import { Switch, Router as AppRouter } from 'react-router-dom';
import PrivateRoute from './private-route';

import Login from '../pages/Login/login';
import Credentials from '../pages/Credentials/credentials';
import Error404 from '../pages/Error404/error404';

import {
  HOME_URL,
  LOGIN_URL,
  CREDENTIALS_URL,
  ACTIVITIES_URL,
  ADD_CREDENTIALS,
  CREATED_CREDENTIALS
} from '../../utils/constants';
import history from './history';
import Activities from '../pages/Activities/activities';
import AddCredentials from '../pages/AddCredentials/add-credentials';
import SimpleHeader from '../molecules/SimpleHeader/simple-header';
import CredentialCreated from '../pages/CredentialCreated/credential-created';

const routesConfig = [
  {
    path: LOGIN_URL,
    component: Login,
    requireAuthentication: false,
    exact: true
  },
  { path: HOME_URL, component: Credentials, requireAuthentication: true, exact: true },
  { path: CREDENTIALS_URL, component: Credentials, requireAuthentication: true, exact: true },
  { path: ACTIVITIES_URL, component: Activities, requireAuthentication: true, exact: true },
  {
    path: ADD_CREDENTIALS,
    component: AddCredentials,
    requireAuthentication: true,
    exact: true,
    replaceHeader: SimpleHeader
  },
  {
    path: CREATED_CREDENTIALS,
    component: CredentialCreated,
    requireAuthentication: true,
    exact: true,
    replaceHeader: SimpleHeader
  },
  { component: Error404, requireAuthentication: false }
];

export const Router = () => {
  const routes = routesConfig.map((route, index) => <PrivateRoute key={index} {...route} />);
  return (
    <div className="AppContainer">
      <div className="MainContent">
        <div>
          <AppRouter history={history}>
            <Switch>{routes}</Switch>
          </AppRouter>
        </div>
      </div>
    </div>
  );
};
