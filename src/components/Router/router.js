import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './private-route';

import Login from '../pages/Login/login';
import Home from '../pages/Home/home';
import FileUploader from '../pages/FileUploader/file-uploader';
import Error404 from '../pages/Error404/error404';

import { HOME_URL, LOGIN_URL, UPLOAD_FILE_URL } from '../../utils/constants';

const routesConfig = [
  {
    path: LOGIN_URL,
    component: Login,
    requireAuthentication: false,
    exact: true
  },
  { path: HOME_URL, component: Home, requireAuthentication: true, exact: true },
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
          <BrowserRouter>
            <Switch>{routes}</Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};
