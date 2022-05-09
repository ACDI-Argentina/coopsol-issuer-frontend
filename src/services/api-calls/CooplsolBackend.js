import axios from "axios";
const COOPSOL_BACKEND_URL = process.env.REACT_APP_COOPSOL_BACKEND_URL;
console.log(`Coopsol backend:`,COOPSOL_BACKEND_URL)

const CoopsolBackend = () => ({
  getTemplates: async () => {
    const response = await axios.get(`${COOPSOL_BACKEND_URL}/templates`);
    
    const templates = response?.data?.data?.map(template => ({
      ...template
    })) ;
    

    return {
      content: templates,
      totalElements: templates.length,
      size: templates.length
    };
  },

  searchSubject: async searchText => {
    const response = await axios.get(`${COOPSOL_BACKEND_URL}/subjects/search?term=${searchText}`);
    return response?.data?.data;
  },


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

      /* console.log(credentials) */

      return {
        content: credentials,
        totalElements: credentials.length,
        size: 10 //page size
      };
    } catch (err) {
      console.log(err);
    }
  },

  getProducers: async data => {
    try {
      const response = await axios.get(`${COOPSOL_BACKEND_URL}/subjects?sort=lastname`);
      const producers = response?.data?.data;

      console.log(producers) 

      return {
        content: producers,
        totalElements: producers.length,
        size: 10 //page size
      };
    } catch (err) {
      console.log(err);
    }
  }
})



export default CoopsolBackend;