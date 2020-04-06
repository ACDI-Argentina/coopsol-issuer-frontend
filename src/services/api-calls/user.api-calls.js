import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credential', data);

const revokeCredentials = makePatchRequest => data =>
  makePatchRequest('credential/revoke/{id}', data);

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makePatchRequest)
  };
};
