import React, { useContext } from 'react';
import { Menu, message } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import { LOGIN_URL, CREDENTIALS_URL, REQUESTS_URL, ACTIVITIES_URL } from '../../../utils/constants';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import apiCalls from '../../../services/api-calls/all';
import history from '../../Router/history';
import { ReactComponent as CredIcon } from '../../../img/cred.svg';
import { ReactComponent as RequestIcon } from '../../../img/request.svg';
import { ReactComponent as ListIcon } from '../../../img/list.svg';
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

  const renderNavItem = (path, name, img) => {
    return (
      <Menu.Item key={path}>
        {img}
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
        {renderNavItem(CREDENTIALS_URL, 'Credenciales', <CredIcon className="credentials" />)}
        {renderNavItem(REQUESTS_URL, 'Solicitudes', <RequestIcon className="request" />)}
        {renderNavItem(ACTIVITIES_URL, 'Actividades', <ListIcon className="list" />)}
        <Menu.Item className="logoutBottom" onClick={() => signOut()}>
          <img src="img/salir.svg" alt="" />
          <button>Cerrar sesión</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
