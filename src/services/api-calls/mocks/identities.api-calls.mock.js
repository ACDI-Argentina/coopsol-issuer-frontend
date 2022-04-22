/* eslint-disable max-len */
import axios from "axios";
const COOPSOL_BACKEND_URL = process.env.REACT_APP_COOPSOL_BACKEND_URL;

console.log(`Backend:`,COOPSOL_BACKEND_URL)

const identitiesRequests = [
  {
    name: "Eugenio",
    lastName: "Picazo",
    dni: "21.881.604",
    phone: "",
    email: "",
    requestState: "IN_PROGRESS"
  },
  {
    name: "Eleuterio",
    lastName: "Farre",
    dni: "16.517.916",
    phone: "",
    email: "",
    requestState: "IN_PROGRESS"
  },
  {
    name: "Dominga",
    lastName: "Mateo",
    dni: "34.343.458",
    phone: "",
    email: "",
    requestState: "IN_PROGRESS"
  },
  {
    name: "Amina",
    lastName: "Barragan",
    dni: "22.075.777",
    phone: "",
    email: "",
    requestState: "IN_PROGRESS"
  },
];

const templates = [
  {
    id: 1,
    name: "Identitaria",
    category: "Identitaria",
    active: true
  },
  {
    id: 2,
    name: "Resiliencia Climática",
    category: "Resiliencia Climática",
    active: true
  },
  {
    id: 3,
    name: "Financiera",
    category: "Financiera",
    active: true
  },

]

const identitiesMock = () => ({
  getAny: (data) => {

    const { url, params } = data;
    if (url === "/identityValidationRequests") {
      console.log(`get identity validation requests`)
      const identities = identitiesRequests;
      return {
        content: identities,
        totalElements: identities.length,
        size: identities.length
      };
    }

  },

  getTemplates: (data) => {

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

      console.log(response.data)

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
      return {
        content: credentials,
        totalElements: credentials.length,
        size: 10 //page size
      };
    } catch (err) {
      console.log(err);
    }
  }
});

export default identitiesMock;
