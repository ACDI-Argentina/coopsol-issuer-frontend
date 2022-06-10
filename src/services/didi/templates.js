
const templatesApi = axiosInstance => ({

  async find() {
    const response = await axiosInstance.get(`/template/all`);
    const apiResponse = response.data;
    const templates = apiResponse?.data;

    if(apiResponse.status === "error"){
      console.log(apiResponse.data);
      const { code, message } = apiResponse.data;
      throw new Error(`${code} - ${message}`)
    }

    return templates
      .sort((a, b) => new Date(a.createdOn) > new Date(b.createdOn) ? 1 : -1);

  },
  async create(data) {
    const response = await axiosInstance.post(`/template`, data);
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse;
  },

  async get(id) {
    const response = await axiosInstance.get(`/template/${id}`);
    const apiResponse = response.data;
    return apiResponse?.data;
  },

  async update(id, data) {
    const response = await axiosInstance.put(`/template/${id}`, data);
    const apiResponse = response.data;
    console.log(apiResponse)
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse.data;
  },

  async delete(id) {
    const apiResponse = await axiosInstance.delete(`/template/${id}`);
    return apiResponse.data;
  }
});

export default templatesApi;