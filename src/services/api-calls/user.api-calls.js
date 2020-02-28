import helpers from './helpers';

const uploadFile = makePostRequest => data => makePostRequest('upload', data);

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest } = helpers(client);
  return {
    uploadFile: uploadFile(makePostRequest),
  };
};
