import helpers from "./helpers";

export default client => {
  const { makePostRequest, makeGetRequest, makePatchRequest } = helpers(client);
  return {};
};
