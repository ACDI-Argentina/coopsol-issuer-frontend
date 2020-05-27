import React from 'react';
import { Router } from './components/Router/router';
import 'antd/dist/antd.css';
import { UserProvider } from './services/providers/user-context';
import { AppProvider } from './services/providers/app-context';
import esES from 'antd/es/locale/es_ES';
import './App.scss';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const App = () => (
  <UserProvider>
    <ConfigProvider locale={esES}>
      <AppProvider>
        <div className="App">
          <Router />
        </div>
      </AppProvider>
    </ConfigProvider>
  </UserProvider>
);

export default App;
