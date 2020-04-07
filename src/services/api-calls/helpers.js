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

const replaceUrlParams = (url, paramsData) => {
  let currentParam = '';
  let isAdding = false;
  let params = [];

  for (let i = 0; i < url.length; i++) {
    if (url[i] === '}') {
      isAdding = false;
    }
    if (isAdding) {
      currentParam += url[i];
    } else if (currentParam) {
      params.push(currentParam);
      currentParam = '';
    }
    if (url[i] === '{') {
      isAdding = true;
    }
  }
  params.forEach(p => {
    url = url.replace('{' + p + '}', paramsData[p]);
  });

  return `${url}`;
};
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

const makeDeleteRequest = httpClient => (url, bodyParameters = {}, queryParameters) => {
  const completeUrl = addQueryString(url, queryParameters);
  return httpClient.delete(completeUrl, { ...bodyParameters });
};

const makePatchRequest = httpClient => (url, bodyParameters = {}, queryParameters) => {
  url = replaceUrlParams(url, bodyParameters);

  const completeUrl = addQueryString(url, queryParameters);
  return httpClient.patch(completeUrl, { ...bodyParameters });
};

export default client => ({
  makeGetRequest: makeGetRequest(client),
  makePostRequest: makePostRequest(client),
  makePatchRequest: makePatchRequest(client),
  makeDeleteRequest: makePatchRequest(client)
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
