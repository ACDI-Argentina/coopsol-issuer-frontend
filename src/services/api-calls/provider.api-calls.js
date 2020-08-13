import helpers from './helpers';

const getProviders = makeGetRequest => data => makeGetRequest('providers/filtered', data);

const getProviderCategories = makeGetRequest => () => makeGetRequest('providerCategories', {});

const createProvider = makePostRequest => data => makePostRequest('providerCategories', data);

export default client => {
  const { makeGetRequest, makePostRequest } = helpers(client);
  return {
    getProviderCategories: getProviderCategories(makeGetRequest),
    getProviders: getProviders(makeGetRequest),
    createProvider: createProvider(makePostRequest)
  };
};
