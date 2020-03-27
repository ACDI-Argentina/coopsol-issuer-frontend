import helpers from "./helpers";

const uploadFile = makePostFileRequest => data =>
  makePostFileRequest("api/file/upload", data);

export default client => {
  const { makePostFileRequest } = helpers(client);
  return {
    uploadFile: uploadFile(makePostFileRequest)
  };
};
