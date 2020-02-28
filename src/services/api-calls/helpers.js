import { get } from 'lodash';
import {
  UNEXPECTED_ERROR,
  API_ERROR_401,
  API_ERROR_403,
  API_ERROR_500,
  STATUS_401,
  STATUS_403,
  STATUS_500
} from './messages.constants.json';

export const createQueryString = query =>
  Object.keys(query)
    .map(key => `${key}=${query[key] || ''}`)
    .join('&');

const addQueryString = (url, query) => {
  const queryStringParameters = createQueryString(query || {});
  return query ? `${url}?${queryStringParameters}` : url;
};

const makeGetRequest = httpClient => (url, parameters, queryParameters) => {
  const completeUrl = addQueryString(url, queryParameters);
  return httpClient
    .get(completeUrl, {
      params: parameters
    })
    .then(response => response.data);
};

const makePostRequest = httpClient => (url, bodyParameters = {}, queryParameters) => {
  const completeUrl = addQueryString(url, queryParameters);
  return httpClient.post(completeUrl, { ...bodyParameters });
};

const makePatchRequest = httpClient => (url, bodyParameters = {}, queryParameters) => {
  const completeUrl = addQueryString(url, queryParameters);
  return httpClient.patch(completeUrl, { ...bodyParameters });
};

export default client => ({
  makeGetRequest: makeGetRequest(client),
  makePostRequest: makePostRequest(client),
  makePatchRequest: makePatchRequest(client)
});

export const processedErrorMessage = (error, messageText) => {
  const status = get(error, 'response.status');
  if (!status) return UNEXPECTED_ERROR;
  switch (status) {
    case STATUS_401:
      return API_ERROR_401;
    case STATUS_403:
      return API_ERROR_403;
    case STATUS_500:
      return API_ERROR_500;
    default:
      return messageText || UNEXPECTED_ERROR;
  }
};
