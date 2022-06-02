const credentialsApi = axiosInstance => ({
  async create(data) {
    const response = await axiosInstance.post(`/cert`, data);
    return response?.data;
  },
  async get(id) {
    const response = await axiosInstance.get(`/cert/${id}`);
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse?.data;
  },
  async find(filter) {
    const query = new URLSearchParams(filter).toString();

    const response = await axiosInstance.get(`/cert/find?${query}`);
    const apiResponse = response.data;
    const credentials = apiResponse?.data;

    return credentials;
  },

  async all() {
    const response = await axiosInstance.get(`/cert/all`);
    const apiResponse = response.data;
    const credentials = apiResponse?.data;

    return credentials;
  },

  async emit(id) {
    const response = await axiosInstance.post(`/cert/${id}/emmit`, {});
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    const credential = apiResponse?.data;
    return credential;
  },


  async revoke(id, reason = "OTHER") { //delete or revoke
    const response = await axiosInstance.delete(`/cert/${id}`, {
      data: {
        reason
      }
    });
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    const credentials = apiResponse?.data;

    return credentials;
  }
})

export default credentialsApi;