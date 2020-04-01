import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../services/providers/user-context';
import { loginInputs } from '../../../utils/form_inputs/inputs-login';
import apiCalls from '../../../services/api-calls/all';
import AntForm from '../../molecules/ant-form';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { useRedirect } from '../../Router/redirect';
import { HOME_URL } from '../../../utils/constants';
import './_style.scss';
import '../../../css/app.scss';

const { loginRequest } = apiCalls();

const Login = () => {
  // TODO REMEMBER ME const [rememberMe, setRememberMe] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState();

  const { redirect, setUrlToRedirect } = useRedirect();

  useEffect(() => {
    if (user.accessToken) setUrlToRedirect(HOME_URL);
  }, [user, setUrlToRedirect]);

  const login = async values => {
    try {
      const response = await loginRequest(values);
      setUser(response.data);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="ContainerAppLogin">
      {redirect()}
      <div className="loginLogo">
        <img src="img/login-img.svg" alt="loginLogo" />
      </div>
      <div className="LoginFormContainer">
        <h1>Bienvenida/o a <strong>Semillas!</strong></h1>
        <p>Para ingresar completá los siguientes campos</p>
        <AntForm inputs={loginInputs} handleSubmit={login} submitText={'Login'} />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
