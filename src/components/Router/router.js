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
  CREATED_CREDENTIALS,
  PROVIDERS_URL,
  IDENTITIES_URL,
  REPORTS_URL,
  TEMPLATES_URL,
  CREATE_TEMPLATE_URL,
  ADD_CREDENTIALS_BULK,
  PRODUCERS_URL
} from '../../utils/constants';

import history from './history';
import Activities from '../pages/Activities/activities';
import AddCredentials from '../pages/AddCredentials/add-credentials';
import AddCredentialsBulk from '../pages/AddCredentialsBulk/add-credentials-bulk';
import SimpleHeader from '../molecules/SimpleHeader/simple-header';
import CredentialCreated from '../pages/CredentialCreated/credential-created';
import Providers from '../pages/Providers/providers';
import Identities from '../pages/Identities/identities';
import Reports from '../pages/Reports/reports';
import Templates from '../pages/Templates/templates';
import CreateTemplate from '../pages/CreateTemplate/create-template';
import Producers from '../pages/Producers/producers';

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
    path: ADD_CREDENTIALS_BULK,
    component: AddCredentialsBulk,
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
  { path: PRODUCERS_URL, component: Producers, requireAuthentication: true, exact: true },

  { path: IDENTITIES_URL, component: Identities, requireAuthentication: true, exact: true },
  { path: PROVIDERS_URL, component: Providers, requireAuthentication: true, exact: true },
  { path: TEMPLATES_URL, component: Templates, requireAuthentication: true, exact: true },
  { path: REPORTS_URL, component: Reports, requireAuthentication: true, exact: true },
  {
    path: CREATE_TEMPLATE_URL,
    component: CreateTemplate,
    requireAuthentication: true,
    exact: true
  },
  {
    path: `${TEMPLATES_URL}/:id`,
    component: CreateTemplate,
    requireAuthentication: true,
    exact: true
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
