import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credentials', data);

const revokeCredentials = makePatchRequest => data =>
  makePatchRequest('credential/revoke/{id}', data);

const getCredentialTypes = makeGetRequest => () => makeGetRequest('credentials/types');

const getCredentialStates = makeGetRequest => () => makeGetRequest('credentials/states');

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makePatchRequest),
    getCredentialTypes: getCredentialTypes(makeGetRequest),
    getCredentialStates: getCredentialStates(makeGetRequest)
  };
};
