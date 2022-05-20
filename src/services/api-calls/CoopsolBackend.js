import axios from "axios";
const COOPSOL_BACKEND_URL = process.env.REACT_APP_COOPSOL_BACKEND_URL;
console.log(`Coopsol backend:`, COOPSOL_BACKEND_URL)

const CoopsolBackend = () => ({
  searchSubject: async searchText => {
    const response = await axios.get(`${COOPSOL_BACKEND_URL}/subjects/search?term=${searchText}`);
    return response?.data?.data;
  },

  createProducer: async data => {
    const response = await axios.post(`${COOPSOL_BACKEND_URL}/subjects`, data);
    const producer = response?.data?.data;
    console.log(producer)
    return producer;
  },

  updateProducer: async (id, data) => {
    try {
      const response = await axios.patch(`${COOPSOL_BACKEND_URL}/subjects/${id}`, data);
      const producer = response?.data?.data;
      return producer;
    } catch (err) {
      console.log(err);
    }
  },

  getProducers: async data => {
    try {
      const response = await axios.get(`${COOPSOL_BACKEND_URL}/subjects?sort=lastname`);
      const producers = response?.data?.data;
      return {
        content: producers,
        totalElements: producers.length,
        size: 10 //page size
      };
    } catch (err) {
      console.log(err);
    }
  },


  getProducer: async id => {
    try {
      const response = await axios.get(`${COOPSOL_BACKEND_URL}/subjects/${id}`);
      const producer = response?.data?.data;
      return producer;
    } catch (err) {
      console.log(err);
    }
  },


  activities: {
    find: async filter => {
      const query = new URLSearchParams(filter).toString();
      const response = await axios.get(`${COOPSOL_BACKEND_URL}/activities?${query}`);
      const activities = response?.data?.data;
      console.log(activities)
      return activities;
    },
    create: async data => {
      const response = await axios.post(`${COOPSOL_BACKEND_URL}/activities`, data);
      const activity = response?.data?.data;
      console.log(activity)
      return activity;
    },
  }
  



/* A los siguientes metodos podriamos usarlos en caso de querer guardar pre credenciales
Podemos usarlo para precredenciales
  saveCredential: async (data) => {
    const { subject, template, ...templateData } = data;
    try {
      const response = await axios.post(`${COOPSOL_BACKEND_URL}/credentials`, {
        subject,
        template,
        data: templateData
      });
      return response?.data?.data;
    } catch (err) {
      console.log(err);
    }
  },

  getCredentials: async data => {
    console.log(`[CoopsolBackend]Get credentials`)
    try {
      const response = await axios.get(`${COOPSOL_BACKEND_URL}/credentials`);
      const credentials = response?.data?.data.map(credential => {
        return ({
          ...credential,
          key: credential._id,
          credentialType: credential?.template?.name,
          name: `${credential?.subject?.lastname},${" "}${credential?.subject?.firstname}`,
          dniBeneficiary: credential?.subject?.dni,
          idDidiCredential: credential.did
        })
      });

      return {
        content: credentials,
        totalElements: credentials.length,
        size: 10 //page size
      };
    } catch (err) {
      console.log(err);
    }
  },


  deleteCredential: async id => {
    try {
      const response = await axios.delete(`${COOPSOL_BACKEND_URL}/credentials/${id}`);
      const deleted = response?.data?.data;
      return deleted;

    } catch (err) {
      console.log(err);
    }
  }
 */
  
})



export default CoopsolBackend;