import React, { useContext } from 'react';
import { Menu, message } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import { LOGIN_URL, CREDENTIALS_URL, REQUESTS_URL, ACTIVITIES_URL } from '../../../utils/constants';
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

  const renderNavItem = (path, name) => {
    return (
      <Menu.Item key={path}>
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
    <div>
      <Menu selectedKeys={[history.location.pathname]} mode="horizontal" className={'ulMain'}>
        {renderNavItem(CREDENTIALS_URL, 'Credenciales')}
        {renderNavItem(REQUESTS_URL, 'Solicitudes')}
        {renderNavItem(ACTIVITIES_URL, 'Actividades')}
        <Menu.Item onClick={() => signOut()}>
          <button>Cerrar sesión</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
