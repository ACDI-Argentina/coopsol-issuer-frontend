export const useApi = () => {
  return async (apiCall, data, onSuccess, onError) => {
    try {
      const res = await apiCall(data);
      if (res.data) {
        onSuccess(res.data);
      } else onSuccess(res);
    } catch (error) {
      console.log(error);
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
