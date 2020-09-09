import React, { useContext } from 'react';
import { Menu } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import {
  LOGIN_URL,
  CREDENTIALS_URL,
  ACTIVITIES_URL,
  PROVIDERS_URL,
  IDENTITIES_URL,
  REPORTS_URL
} from '../../../utils/constants';
import { processedErrorMessage, processError } from '../../../services/api-calls/helpers';
import apiCalls from '../../../services/api-calls/all';
import history from '../../Router/history';
import { ReactComponent as CredIcon } from '../../../img/cred.svg';
import { ReactComponent as RequestIcon } from '../../../img/request.svg';
import { ReactComponent as ListIcon } from '../../../img/list.svg';
import { showErrorMessage } from '../../../utils/alertMessages';
const { logoutRequest } = apiCalls();

const NavBar = () => {
  const { setUser } = useContext(UserContext);

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      showErrorMessage(errorMessage, processError(error));
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
        {renderNavItem(IDENTITIES_URL, 'Solicitudes', <RequestIcon className="request" />)}
        {renderNavItem(ACTIVITIES_URL, 'Actividades', <ListIcon className="list" />)}
        {renderNavItem(PROVIDERS_URL, 'Prestadores', <ListIcon className="list" />)}
        {renderNavItem(REPORTS_URL, 'Reporte Encuestas', <ListIcon className="list" />)}
        <Menu.Item className="logoutBottom" onClick={() => signOut()}>
          <img src="img/salir.svg" alt="" />
          <button>Cerrar sesión</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
