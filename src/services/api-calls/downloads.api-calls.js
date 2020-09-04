import helpers from './helpers';

const getZipFile = makeGetRequest => data => makeGetRequest('/api/file/download', data);

export default client => {
  const { makeGetRequest } = helpers(client);
  return {
    getZipFile: getZipFile(makeGetRequest)
  };
};
