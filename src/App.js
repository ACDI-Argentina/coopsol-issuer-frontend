import React from 'react';
import { Router } from './components/Router/router';
import 'antd/dist/antd.css';
import { UserProvider } from './services/providers/user-context';
import './App.scss';
import Header from './components/molecules/header/header';

const App = () => (
  <UserProvider>
    <div className="App">
      <Header/>
      <Router />
    </div>
  </UserProvider>
);

export default App;
