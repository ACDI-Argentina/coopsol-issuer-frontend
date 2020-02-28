import axios from 'axios';
import { USER } from '../../utils/constants';
import { HEADERS } from './base';
import { config } from '../../config/config';

const configureAxios = ({ onError, onResponse }) => {
  let Authorization;
  const instance = axios.create({
    baseURL: config.endpoints.backend,
    timeout: 18000000,
    responseType: 'json',
    headers: { [HEADERS.ACCEPT]: HEADERS.JSON, Authorization }
    // withCredentials: true,
    // credentials: HEADERS.CREDENTIALS
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
