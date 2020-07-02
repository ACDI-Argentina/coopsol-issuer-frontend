import { message } from 'antd';
import { STATUS_401 } from '../services/api-calls/messages.constants.json';

export const showErrorMessage = (msg, statusCode) => {
  if (statusCode === STATUS_401) return;
  return message.error(msg);
};
