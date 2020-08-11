import helpers from './helpers';

const uploadFile = makePostFileRequest => data => makePostFileRequest('api/file/upload', data);

const validateSancorFile = makePostFileRequest => data =>
  makePostFileRequest('api/file/sancorsalud/validate', data);

const uploadSancorFile = makePostFileRequest => data =>
  makePostFileRequest('api/file/sancorsalud/upload', data);

export default client => {
  const { makePostFileRequest } = helpers(client);
  return {
    uploadFile: uploadFile(makePostFileRequest),
    validateSancorFile: validateSancorFile(makePostFileRequest),
    uploadSancorFile: uploadSancorFile(makePostFileRequest)
  };
};
