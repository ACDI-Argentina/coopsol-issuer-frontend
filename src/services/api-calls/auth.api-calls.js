import helpers from './helpers';

const loginRequest = makePostRequest => data => makePostRequest('auth/login', data);

export default client => {
  const { makePostRequest, makeGetRequest } = helpers(client);
  return {
    loginRequest: loginRequest(makePostRequest)
  };
};
