import client from './http-client';
import multiClient from './http-client-multipart';
import user from './user.api-calls';
import auth from './auth.api-calls';
import providers from './provider.api-calls';
import identities from './identity.api-calls';
import authMock from './mocks/auth.api-calls.mock';
import userMock from './mocks/user.api-calls.mock';
import file from './file.api-calls';
import downloads from './downloads.api-calls';
import identitiesMock from './mocks/identities.api-calls.mock';

const defaultClient = client({});
const multipartClient = multiClient({});
const blobClient = multiClient({ responseType: 'blob' });

let all = () => 
  process.env.REACT_APP_CUSTOM_ENV === 'mocked'
  ? { 
    ...authMock(defaultClient), 
    ...userMock(defaultClient),
    ...identitiesMock(defaultClient)
  }
  : {
      ...auth(defaultClient),
      ...user(defaultClient),
      ...file(multipartClient),
      ...downloads(blobClient),
      ...providers(defaultClient),
      ...identities(defaultClient)
    };

export default all;