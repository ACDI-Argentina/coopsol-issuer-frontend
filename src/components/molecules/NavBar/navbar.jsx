import React, { useContext } from 'react';
import { Menu } from 'antd';
import './_style.scss';
import { UserContext } from '../../../services/providers/user-context';
import {
  LOGIN_URL,
  CREDENTIALS_URL,
  ACTIVITIES_URL,
  TEMPLATES_URL,
  PRODUCERS_URL,
  USERS_URL
} from '../../../utils/constants';
import { processedErrorMessage, processError } from '../../../services/api-calls/helpers';
import apiCalls from '../../../services/api-calls/all';
import history from '../../Router/history';
import { ReactComponent as CredIcon } from '../../../img/cred.svg';
import { ReactComponent as ListIcon } from '../../../img/list.svg';
import { showErrorMessage } from '../../../utils/alertMessages';
import CoopsolBackend from 'services/api-calls/CoopsolBackend';
const { logoutRequest } = apiCalls();

const NavBar = () => {
  const { setUser, user, isAdmin } = useContext(UserContext);

  const signOut = async () => {
    try {
      await logoutRequest(); //Usar CoopsolBackend.logout //Es un get nada mas, ver como esta implementado
      //CoopsolBackend().logout();
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      showErrorMessage(errorMessage, processError(error));
    }
    setUser(null);
    history.push(LOGIN_URL);
  };


  const items = [
    {
      key: CREDENTIALS_URL,
      label: 'Credenciales',
      icon: <CredIcon className="credentials" />,
      onClick: () => history.push(CREDENTIALS_URL)
    },
    {
      key: PRODUCERS_URL,
      label: 'Productores',
      icon: <ListIcon className="list" />,
      onClick: () => history.push(PRODUCERS_URL)
    },
    {
      key: TEMPLATES_URL,
      label: 'Tipos de credenciales',
      icon: <ListIcon className="list" />,
      onClick: () => history.push(TEMPLATES_URL)
    },
    {
      key: ACTIVITIES_URL,
      label: 'Actividades',
      icon: <ListIcon className="list" />,
      onClick: () => history.push(ACTIVITIES_URL)
    },
  ]

  if(isAdmin){
    items.push({
      key: USERS_URL,
      label: 'Usuarios',
      icon: <ListIcon className="list" />,
      onClick: () => history.push(USERS_URL)
    })
  }

  items.push({
    key: "logout",
    className: "logoutButton",
    label: 'Cerrar sesión',
    icon: <img src="img/salir.svg" alt="" />,
    style: { position: "absolute", bottom: 10 },
    onClick: signOut,
  });

  return (
    <div className="Sidebar">
      <Menu
        items={items}
        mode="vertical"
        className={'ulMain'}
      />
    </div>
  );
};

export default NavBar;
