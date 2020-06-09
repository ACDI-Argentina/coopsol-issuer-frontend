import { processError } from '../services/api-calls/helpers';

export const useApi = () => {
  return async (apiCall, data, onSuccess, onError, setUser) => {
    try {
      const res = await apiCall(data);
      if (res.data) {
        onSuccess(res.data);
      } else onSuccess(res);
    } catch (error) {
      console.log(error);
      processError(error, setUser);
      if (onError) {
        onError(error);
      }
    }
  };
};

export const useApiPost = () => {
  return async (apiCall, data, callback, error) => {
    try {
      await apiCall(data);
      callback();
    } catch (er) {
      error();
      console.log(error);
    }
  };
};
