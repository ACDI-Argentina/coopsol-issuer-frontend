import React, { useContext, Fragment } from 'react';
import { Menu, message } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import {
  LOGIN_URL,
  CREDENTIALS_URL,
  REQUESTS_URL,
  ACTIVITIES_URL,
  PROFILE_URL
} from '../../../utils/constants';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import apiCalls from '../../../services/api-calls/all';
import history from '../../Router/history';

const { logoutRequest } = apiCalls();

const NavBar = () => {
  const { setUser } = useContext(UserContext);

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      message.error(errorMessage);
    }
    setUser(null);
    history.push(LOGIN_URL);
  };

  const renderNavItem = (path, name, className) => {
    return (
      <Menu.Item key={path} className={className}>
        <img src="img/cred.svg" alt=""/>
        <button
          onClick={() => {
            history.push(path);
          }}
        >
          {name}
        </button>
      </Menu.Item>
    );
  };

  return (
    <div className="Sidebar">
      <Menu selectedKeys={[history.location.pathname]} mode="vertical" className={'ulMain'}>
        <Fragment></Fragment>
          {renderNavItem(CREDENTIALS_URL, 'Credenciales')}
          {renderNavItem(REQUESTS_URL, 'Solicitudes')}
          {renderNavItem(ACTIVITIES_URL, 'Actividades')}
          <Menu.Item className="logoutBottom" onClick={() => signOut()}>
            <img src="img/salir.svg" alt=""/>
            <button>Cerrar sesión</button>
          </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
