import React from 'react';
import { Router } from './components/Router/router';
import 'antd/dist/antd.css';
import { UserProvider } from './services/providers/user-context';
import esES from 'antd/es/locale/es_ES';
import './App.scss';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const App = () => (
  <UserProvider>
    <ConfigProvider locale={esES}>
      <div className="App">
        <Router />
      </div>
    </ConfigProvider>
  </UserProvider>
);

export default App;
