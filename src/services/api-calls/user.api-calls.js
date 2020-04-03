import helpers from './helpers';

const getCredentials = makeGetRequest => data => makeGetRequest('credential', data);

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest)
  };
};
