
import axios from "axios";
const ISSUER_BACKEND_URL = process.env.REACT_ISSUER_BACKEND_URL || "https://api.issuer.qa.didi.org.ar"; //template/${id}

const templatesApi = config => ({

  async find() {
    const response = await axios.get(`${ISSUER_BACKEND_URL}/template/all`, config);
    const apiResponse = response.data;
    const templates = apiResponse?.data;

    return templates
      .filter(t => t.name.includes("Coopsol"))
      /* .map(t => ({ ...t, name: t.name.split("-")[1].trim() })) */
      .sort((a, b) => new Date(a.createdOn) > new Date(b.createdOn) ? 1 : -1);

  },
  async create(data) {
    const response = await axios.post(`${ISSUER_BACKEND_URL}/template`, data, config);
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse;
  },

  async get(id) {
    const response = await axios.get(`${ISSUER_BACKEND_URL}/template/${id}`, config);
    const apiResponse = response.data;
    return apiResponse?.data;
  },

  async update(id, data) {
    const response = await axios.put(`${ISSUER_BACKEND_URL}/template/${id}`, data, config);
    const apiResponse = response.data;
    console.log(apiResponse)
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse.data;
  },

  async delete(id) {
    const apiResponse = await axios.delete(`${ISSUER_BACKEND_URL}/template/${id}`, config);
    return apiResponse.data;
  }
});

export default templatesApi;