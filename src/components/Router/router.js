import React from 'react';
import { Switch, Router as AppRouter } from 'react-router-dom';
import PrivateRoute from './private-route';

import Login from '../pages/Login/login';
import Credentials from '../pages/Credentials/credentials';
import FileUploader from '../pages/FileUploader/file-uploader';
import Error404 from '../pages/Error404/error404';

import {
  HOME_URL,
  LOGIN_URL,
  UPLOAD_FILE_URL,
  CREDENTIALS_URL,
  ACTIVITIES_URL
} from '../../utils/constants';
import history from './history';

const routesConfig = [
  {
    path: LOGIN_URL,
    component: Login,
    requireAuthentication: false,
    exact: true
  },
  { path: HOME_URL, component: Credentials, requireAuthentication: true, exact: true },
  { path: CREDENTIALS_URL, component: Credentials, requireAuthentication: true, exact: true },
  { path: ACTIVITIES_URL, component: FileUploader, requireAuthentication: true, exact: true },
  {
    path: UPLOAD_FILE_URL,
    component: FileUploader,
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
