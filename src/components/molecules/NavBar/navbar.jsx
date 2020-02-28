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
    <div>
      {redirect()}
      <Menu
        onClick={({ key }) => setCurrent(key)}
        selectedKeys={[current]}
        mode="horizontal"
        className={'ulMain'}
      >
            <Menu.Item key="logout">
              <button onClick={() => signOut()}>
                Logout
              </button>
            </Menu.Item
      </Menu>
    </div>
  );

};

export default NavBar;
