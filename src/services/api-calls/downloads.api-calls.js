import helpers from './helpers';

const downloadFile = makeGetRequest => data => makeGetRequest('/api/file/download', data);

const file = client => {
  const { makeGetRequest } = helpers(client);
  return {
    downloadFile: downloadFile(makeGetRequest)
  };
};

export default file;