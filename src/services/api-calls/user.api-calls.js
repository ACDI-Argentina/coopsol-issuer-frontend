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

const syncDidi = makeGetRequest => () => makeGetRequest('/syncdidi/emmitcredentials', {});

const getActivityLog = makeGetRequest => data => makeGetRequest('action/find', data);

const getLogTypes = makeGetRequest => () => makeGetRequest('action/types');

const getLogLevels = makeGetRequest => () => makeGetRequest('action/levels');

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makePatchRequest),
    getCredentialTypes: getCredentialTypes(makeGetRequest),
    getCredentialStates: getCredentialStates(makeGetRequest),
    getRevocationReasons: getRevocationReasons(makeGetRequest),
    forceSyncBondarea: forceSyncBondarea(makePostRequest),
    getActivityLog: getActivityLog(makeGetRequest),
    getLogTypes: getLogTypes(makeGetRequest),
    getLogLevels: getLogLevels(makeGetRequest),
    syncDidi: syncDidi(makeGetRequest)
  };
};
