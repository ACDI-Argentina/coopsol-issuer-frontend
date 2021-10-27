import helpers from './helpers';

const loginRequest = makePostRequest => data => makePostRequest('auth/login', data);

const logoutRequest = makeGetRequest => data => makeGetRequest('auth/logout', data);

const defaultClient = client => {
  const { makePostRequest, makeGetRequest } = helpers(client);
  return {
    loginRequest: loginRequest(makePostRequest),
    logoutRequest: logoutRequest(makeGetRequest)
  };
};

export default defaultClient;