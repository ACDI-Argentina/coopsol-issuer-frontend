import React, { useEffect, useContext } from 'react';
import { events } from "services/api-calls/CoopsolBackend"
import { UserContext } from 'services/providers/user-context';
import { LOGIN_URL } from 'utils/constants';
import { message } from 'antd';


const RedirectWhenSessionExpired = ({ history }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(`RedirectWhenSessionExpired MOUNTED`)
    const handler = async err => {
      if (err.message === "TokenExpiredError") {
        await message.error('La sesión ha expirado. Por favor, Inicie sesión nuevamente.',6);
        setUser(null);
        history.push(LOGIN_URL);
      }
      console.log(err);
    };
    events.on('Unauthorized', handler);

    return () => {
      console.log(`RedirectWhenSessionExpired UNMOUNTED`)
      events.off('Unauthorized', handler);
    }

  }, [])
  return null;
}
export default RedirectWhenSessionExpired;