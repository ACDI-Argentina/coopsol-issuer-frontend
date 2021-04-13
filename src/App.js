import React from 'react';
import { AppInsightsContext, AppInsightsErrorBoundary } from "@microsoft/applicationinsights-react-js";
import { Router } from './components/Router/router';
import 'antd/dist/antd.css';
import { UserProvider } from './services/providers/user-context';
import { AppProvider } from './services/providers/app-context';
import esES from 'antd/es/locale/es_ES';
import './App.scss';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/es';

import { reactPlugin } from "./components/Router/AppInsights.js";

moment.locale('es');

const App = () => (
  <AppInsightsErrorBoundary onError={() => <h1>Error Semillas Frontend</h1>} appInsights={reactPlugin}>
    <AppInsightsContext.Provider value={reactPlugin}>
      <UserProvider>
        <ConfigProvider locale={esES}>
          <AppProvider>
            <div className="App">
              <Router />
            </div>
          </AppProvider>
        </ConfigProvider>
      </UserProvider>
    </AppInsightsContext.Provider>
  </AppInsightsErrorBoundary>
);

export default App;
