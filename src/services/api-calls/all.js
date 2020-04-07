import client from './http-client';
import multiClient from './http-client-multipart';
import user from './user.api-calls';
import auth from './auth.api-calls';
import authMock from './mocks/auth.api-calls.mock';
import userMock from './mocks/user.api-calls.mock';
import file from './file.api-calls';

const defaultClient = client({});
const multipartClient = multiClient({});

export default () =>
  process.env.REACT_APP_CUSTOM_ENV === 'mocked'
    ? { ...authMock(defaultClient), ...userMock(defaultClient) }
    : {
        ...auth(defaultClient),
        ...user(defaultClient),
        ...file(multipartClient)
      };
