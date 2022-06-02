import axios from "axios";
const ISSUER_BACKEND_URL = process.env.REACT_ISSUER_BACKEND_URL || "https://api.issuer.qa.didi.org.ar"; //template/${id}

const credentialsApi = config => ({
  async create(data) {
    const response = await axios.post(`${ISSUER_BACKEND_URL}/cert`, data, config);
    return response?.data;
  },
  async get(id) {
    const response = await axios.get(`${ISSUER_BACKEND_URL}/cert/${id}`, config);
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    return apiResponse?.data;
  },
  async find(filter) {
    const query = new URLSearchParams(filter).toString();

    const response = await axios.get(`${ISSUER_BACKEND_URL}/cert/find?${query}`, config);
    const apiResponse = response.data;
    const credentials = apiResponse?.data;

    return credentials;
  },

  async all() {
    const response = await axios.get(`${ISSUER_BACKEND_URL}/cert/all`, config);
    const apiResponse = response.data;
    const credentials = apiResponse?.data;

    return credentials;
  },

  async emit(id) {
    const response = await axios.post(`${ISSUER_BACKEND_URL}/cert/${id}/emmit`, {}, config);
    const apiResponse = response.data;
    if (apiResponse.status === "error") {
      throw new Error(apiResponse?.data?.message);
    }
    const credential = apiResponse?.data;
    return credential;
  },


  async revoke(id, reason = "OTHER") { //delete or revoke
    const response = await axios.delete(`${ISSUER_BACKEND_URL}/cert/${id}`, {
      ...config,
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