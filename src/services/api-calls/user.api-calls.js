import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credential', data);

const revokeCredentials = makePatchRequest => data =>
  makePatchRequest('credential/revoke/{id}', data);

const getCredentialTypes = makeGetRequest => () => makeGetRequest('credential/credentialTypes');

const getCredentialStates = makeGetRequest => () => makeGetRequest('credential/credentialStates');

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makePatchRequest),
    getCredentialTypes: getCredentialTypes(makeGetRequest),
    getCredentialStates: getCredentialStates(makeGetRequest)
  };
};
