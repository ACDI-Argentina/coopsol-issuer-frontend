import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credential', data);

const revokeCredentials = makeGetRequest => data => makeGetRequest('credential', data);

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest, makeDeleteRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest),
    revokeCredentials: revokeCredentials(makeDeleteRequest)
  };
};
