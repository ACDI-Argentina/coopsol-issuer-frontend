/* eslint-disable max-len */

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

 
});

export default identitiesMock;
