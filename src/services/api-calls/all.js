import client from './http-client';
import user from './user.api-calls';
import auth from './auth.api-calls';
import authMock from './mocks/auth.api-calls.mock';
import userMock from './mocks/user.api-calls.mock';

const defaultClient = client({});

export default () =>
  process.env.REACT_APP_CUSTOM_ENV === 'mocked'
    ? { ...authMock(defaultClient), ...userMock(defaultClient)}
    : { ...auth(defaultClient), ...user(defaultClient) };