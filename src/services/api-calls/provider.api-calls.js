import helpers from './helpers';

const getProviders = makeGetRequest => data => makeGetRequest('providers/filtered', data);

const getProviderById = makePlainedGetRequest => params =>
  makePlainedGetRequest('providers/{id}', params);

const getProviderCategories = makeGetRequest => () => makeGetRequest('providerCategories', {});

const createProvider = makePostRequest => data => makePostRequest('providers', data);

const editProvider = makePatchRequest => data => makePatchRequest('providers/{id}', data);

export default client => {
  const { makeGetRequest, makePostRequest, makePatchRequest, makePlainedGetRequest } = helpers(
    client
  );
  return {
    getProviderCategories: getProviderCategories(makeGetRequest),
    getProviders: getProviders(makeGetRequest),
    getProviderById: getProviderById(makePlainedGetRequest),
    createProvider: createProvider(makePostRequest),
    editProvider: editProvider(makePatchRequest)
  };
};
