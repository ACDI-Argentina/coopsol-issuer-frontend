import React, { useState, useContext } from 'react';
import { Menu, Icon, message } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import { LOGIN_URL } from '../../../utils/constants';
import { useRedirect } from '../../Router/redirect';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import apiCalls from '../../../services/api-calls/all';

const { logoutRequest } = apiCalls();

const NavBar = () => {
  const [current, setCurrent] = useState('');
  const { setUser } = useContext(UserContext);
  const { redirect, setUrlToRedirect } = useRedirect();

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
    setUser(null);
    setUrlToRedirect(LOGIN_URL);
  };

  const itemClick = path => {
    if (path === LOGIN_URL) {
      signOut();
    } else if (path !== null) {
      setUrlToRedirect(path);
    }
  };

  return (
    <div className="Sidebar">
      {redirect()}
      <Menu
        onClick={({ key }) => setCurrent(key)}
        selectedKeys={[current]}
        mode="vertical"
        className={'ulMain'}
      >
        <Menu.Item key="credentials">
          <button>Credenciales</button>
        </Menu.Item>
        <Menu.Item key="request">
          <button>Solicitudes</button>
        </Menu.Item>
        <Menu.Item key="activity">
          <button>Actividades</button>
        </Menu.Item>
        <Menu.Item key="user">
          <button>Avatar</button>
        </Menu.Item>
        <Menu.Item key="logout">
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
