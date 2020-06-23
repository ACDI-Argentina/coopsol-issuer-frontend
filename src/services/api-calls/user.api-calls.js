import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credentials', data);

const revokeCredentials = makePatchRequest => data =>
  makePatchRequest('credentials/revoke/{id}/reason/{reason}', data);

const getCredentialTypes = makeGetRequest => () => makeGetRequest('credentials/types');

const getCredentialStates = makeGetRequest => () => makeGetRequest('credentials/states');

const getRevocationReasons = makeGetRequest => () =>
  makeGetRequest('credentials/revocation-reasons');

const forceSyncBondarea = makePostRequest => () =>
  makePostRequest('/bondarea/force-sync-generate', {});

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makePatchRequest),
    getCredentialTypes: getCredentialTypes(makeGetRequest),
    getCredentialStates: getCredentialStates(makeGetRequest),
    getRevocationReasons: getRevocationReasons(makeGetRequest),
    forceSyncBondarea: forceSyncBondarea(makePostRequest)
  };
};
