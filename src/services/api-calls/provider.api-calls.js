import helpers from './helpers';

const getProviders = makeGetRequest => data => makeGetRequest('providers', data);

const getCategories = makeGetRequest => () => makeGetRequest('providerCategories', {});

export default client => {
  const { makeGetRequest } = helpers(client);
  return {
    getProviders: getProviders(makeGetRequest),
    getCategories: getCategories(makeGetRequest)
  };
};
