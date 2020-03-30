import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../services/providers/user-context';
import { loginInputs } from '../../../utils/form_inputs/inputs-login';
import apiCalls from '../../../services/api-calls/all';
import AntForm from '../../molecules/ant-form';
import { processedErrorMessage } from '../../../services/api-calls/helpers';
import { CREDENTIALS_URL } from '../../../utils/constants';
import './_style.scss';
import '../../../css/app.scss';

const { loginRequest } = apiCalls();

const Login = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (user.accessToken) {
      history.push(CREDENTIALS_URL);
    }
  }, [user.accessToken, history]);

  const login = values => {
    try {
      const response = loginRequest(values);
      setUser(response.data);
    } catch (error) {
      const errorMessage = processedErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="ContainerAppLogin">
      <div className="loginLogo">
        <div>
          <img src="img/loginImg.png" alt="loginLogo" />
        </div>
      </div>
      <div className="LoginFormContainer">
        <div className="formImg">
          <img src="img/logo.png" alt="formImg" />
        </div>
        <AntForm inputs={loginInputs} handleSubmit={login} submitText={'Login'} />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
