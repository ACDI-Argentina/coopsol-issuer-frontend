import axios from "axios";
import { USER } from "utils/constants";
import { HEADERS } from "../api-calls/base";
import EventEmitter from "events";


const COOPSOL_BACKEND_URL = process.env.REACT_APP_COOPSOL_BACKEND_URL;
console.log(`Coopsol backend:`, COOPSOL_BACKEND_URL)

const axiosInstance = axios.create({
  baseURL: COOPSOL_BACKEND_URL,
  timeout: 18000000,
  responseType: 'json',
  headers: { [HEADERS.ACCEPT]: HEADERS.JSON }
});

axiosInstance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem(USER));
  if (user && user.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});




export const events = new EventEmitter();


axiosInstance.interceptors.response.use(response => response, error => {
  if (error?.response?.status == 401) {
    events.emit("Unauthorized", error?.response?.data);
  }
  return Promise.reject(error);
});



const CoopsolBackend = () => ({

  login: async (credentials) => {
    const response = await axiosInstance.post(`/auth/login`, credentials);

    //TODO: check response status
    const { user, token, tokenDidi } = response.data;

    localStorage.setItem("coopsolToken", token);
    localStorage.setItem("didiToken", tokenDidi);

    return {
      data: {
        ...user,
        username: user.email,
        password: "",
        accessToken: token,
        tokenType: "Bearer",
      }
    };
  },

  logout: async (credentials) => {
    //check function
    try {
      const response = await axiosInstance.post(`/auth/logout`, credentials);
    } catch (err) {
      console.log(err)
    }

    localStorage.removeItem('didiToken');
    localStorage.removeItem('coopsolToken');

  },

  changePassword: async (credentials) => {
      const response = await axiosInstance.post(`/auth/change-password`, credentials);
      return response.data;
  },

  users: () => ({
    create: async data => {
      const response = await axiosInstance.post(`/users`, data);
      const user = response?.data?.data;
      console.log(user)
      return user;
    },

    update: async (id, data) => {
      try {
        const response = await axiosInstance.patch(`/users/${id}`, data);
        const user = response?.data?.data;
        return user;
      } catch (err) {
        console.log(err);
      }
    },

    delete: async (id) => {
      const apiResponse = await axiosInstance.delete(`/users/${id}`);

      return apiResponse.data;
    },


    findAll: async data => {
      try {
        const response = await axiosInstance.get(`/users?sort=lastname`);
        const users = response?.data?.data;
        return {
          content: users,
          totalElements: users.length,
          size: 10 //page size
        };
      } catch (err) {
        console.log(err);
      }
    },
  }),


  producers: () => ({
    search: async searchText => {
      const response = await axiosInstance.get(`/subjects/search?term=${searchText}`);
      return response?.data?.data;
    },

    create: async data => {
      const response = await axiosInstance.post(`/subjects`, data);
      const producer = response?.data?.data;
      console.log(producer)
      return producer;
    },

    update: async (id, data) => {
      try {
        const response = await axiosInstance.patch(`/subjects/${id}`, data);
        const producer = response?.data?.data;
        return producer;
      } catch (err) {
        console.log(err);
      }
    },

    findAll: async data => {
      const response = await axiosInstance.get(`/subjects?sort=lastname`);
      const producers = response?.data?.data;
      return {
        content: producers,
        totalElements: producers.length,
        size: 10 //page size
      };
    },


    get: async id => {
      try {
        const response = await axiosInstance.get(`/subjects/${id}`);
        const producer = response?.data?.data;
        return producer;
      } catch (err) {
        console.log(err);
      }
    },

  }),



  activities: {
    find: async filter => {
      const query = new URLSearchParams(filter).toString();
      const response = await axiosInstance.get(`/activities?${query}`);
      const activities = response?.data?.data;
      console.log(activities)
      return activities;
    },
    create: async data => {
      const response = await axiosInstance.post(`/activities`, data);
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
        const response = await axiosInstance.post(`${COOPSOL_BACKEND_URL}/credentials`, {
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
        const response = await axiosInstance.get(`${COOPSOL_BACKEND_URL}/credentials`);
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
        const response = await axiosInstance.delete(`${COOPSOL_BACKEND_URL}/credentials/${id}`);
        const deleted = response?.data?.data;
        return deleted;
  
      } catch (err) {
        console.log(err);
      }
    }
   */

})


export default CoopsolBackend;