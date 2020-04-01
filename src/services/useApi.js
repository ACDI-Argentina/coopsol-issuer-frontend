export const useApi = () => {
  return async (apiCall, set, onError) => {
    try {
      const data = await apiCall();
      if (data.data) {
        set(data.data);
      } else set(data);
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
