import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../services/providers/user-context';
import { loginInputs } from '../../../utils/form_inputs/inputs-login';
import apiCalls from '../../../services/api-calls/all';
import AntForm from '../../molecules/ant-form';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { CREDENTIALS_URL } from '../../../utils/constants';
import './_style.scss';
import '../../../css/app.scss';
import Loader from '../../atoms/Loader/loader';

const { loginRequest } = apiCalls();

const Login = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (user.accessToken) {
      history.push(CREDENTIALS_URL);
    }
  }, [user.accessToken, history]);

  const login = async values => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await loginRequest(values);
      setUser(response.data);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="ContainerAppLogin">
      <div className="loginLogo">
        <img src="img/login-img.svg" alt="loginLogo" />
      </div>
      <div className="LoginFormContainer">
        <h1>
          Bienvenida/o a <strong>Semillas!</strong>
        </h1>
        <p>Para ingresar completá los siguientes campos</p>
        <AntForm
          inputs={loginInputs}
          handleSubmit={login}
          submitText={'Login'}
          disabled={loading}
        />
        <Loader loading={loading} />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
