import helpers from './helpers';

const downloadFile = makeGetRequest => data => makeGetRequest('/api/file/download', data);

export default client => {
  const { makeGetRequest } = helpers(client);
  return {
    downloadFile: downloadFile(makeGetRequest)
  };
};
