import axios from 'axios';
import { USER } from '../../utils/constants';
import { HEADERS } from './base';
import { config } from '../../config/config';

const configureAxios = ({ onError, onResponse, responseType = 'json' }) => {
  let Authorization;
  console.log('Configuration axion multipart ' + JSON.stringify(HEADERS));
  const instance = axios.create({
    baseURL: config.endpoints.backend,
    timeout: 18000000,
    responseType,
    headers: {
      [HEADERS.CONTENT_TYPE]: HEADERS.MULTIPART,
      Authorization
    }
  });
  // TODO localStorage to cookies
  instance.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem(USER));
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });
  instance.interceptors.response.use(
    onResponse || (response => response),
    onError ||
      (error => {
        throw error;
      })
  );
  return instance;
};

export default configureAxios;
