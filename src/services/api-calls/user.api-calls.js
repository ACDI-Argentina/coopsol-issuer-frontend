import helpers from './helpers';

const getCredentials = makeGetRequest => () => makeGetRequest('credential');

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest } = helpers(client);
  return {
    getCredentials: getCredentials(makeGetRequest)
  };
};
