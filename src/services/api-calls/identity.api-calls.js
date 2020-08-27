import helpers from './helpers';
import { requestStates } from '../../utils/tables/identities-definitions';
const { failure, success, progress } = requestStates;

const rejectIdentityRequest = makePatchRequest => data =>
  makePatchRequest('identityValidationRequests/{id}', { ...data, requestState: failure });
const approveIdentityRequest = makePatchRequest => data =>
  makePatchRequest('identityValidationRequests/{id}', { ...data, requestState: success });
const regretIdentityRequest = makePatchRequest => id =>
  makePatchRequest('identityValidationRequests/{id}', { id, requestState: progress });

export default client => {
  const { makePatchRequest } = helpers(client);
  return {
    rejectIdentityRequest: rejectIdentityRequest(makePatchRequest),
    approveIdentityRequest: approveIdentityRequest(makePatchRequest),
    regretIdentityRequest: regretIdentityRequest(makePatchRequest)
  };
};
