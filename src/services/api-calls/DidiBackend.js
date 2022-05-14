import axios from "axios";

const ISSUER_BACKEND_URL = process.env.REACT_ISSUER_BACKEND_URL || "https://api.issuer.qa.didi.org.ar"; //template/${id}
console.log(`ISSUER backend:`, ISSUER_BACKEND_URL)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4MWRjMDQ1MTAwMWIzM2Y2YjY5OWQiLCJleHAiOjE2NjU0MTY0OTUsImlhdCI6MTY1MjQ1NjQ5NX0.lmVjGtOqPe1PrJJoQeqYuKz-cYgrbwRL9j-PcXdbGHY";

const config = {
  headers: {
    "token": token
  }
}

const DidiBackend = () => ({
  templates: {

    async find(){
      const response = await axios.get(`${ISSUER_BACKEND_URL}/template/all`, config);
      const apiResponse = response.data;
      const templates = apiResponse?.data;
      
      return templates
                .filter(t => t.name.includes("Coopsol"))
                .map(t => ({...t, name: t.name.split("-")[1].trim()}))
                .sort((a,b) => new Date(a.createdOn) > new Date(b.createdOn)? 1: -1 );

    },
    async create(data){ //data: name & registerId
      const response = await axios.post(`${ISSUER_BACKEND_URL}/template`, data, config);
      const apiResponse = response.data;
      return apiResponse?.data;

    },

    async get(id) {
      const response = await axios.get(`${ISSUER_BACKEND_URL}/template/${id}`, config);
      const apiResponse = response.data;
      return apiResponse?.data;
    },

    async update(id, data) {
      const apiResponse = await axios.put(`${ISSUER_BACKEND_URL}/template/${id}`, data, config);
      return apiResponse.data;
    },
  },

  credentials:{
    async create(data) {
      const response = await axios.post(`${ISSUER_BACKEND_URL}/cert`, data, config);
      const apiResponse = response.data;
      
      console.log(apiResponse);

      return apiResponse?.data;
    },
  }



})



export default DidiBackend;