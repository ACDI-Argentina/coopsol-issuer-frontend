import axios from "axios";
import { HEADERS } from "services/api-calls/base";

import credentialsApi from "services/didi/credentials";
import templatesApi from "services/didi/templates";

const ISSUER_BACKEND_URL = process.env.REACT_APP_ISSUER_BACKEND_URL;


const axiosInstance = axios.create({
  baseURL: ISSUER_BACKEND_URL,
  timeout: 18000000,
  responseType: 'json',
  headers: { [HEADERS.ACCEPT]: HEADERS.JSON }
});

axiosInstance.interceptors.request.use(config => {
  const didiToken = localStorage.getItem("didiToken");
  if (didiToken) {
    config.headers.Authorization = `Bearer ${didiToken}`;
    config.headers.token = didiToken;
  }
  return config;
});

/* Agregar algo extra para que en el caso del delete pase el token en el body */
//...config,




class DidiBackend {
  constructor() {
    
  }

  templates() {
    return templatesApi(axiosInstance);
  }

  credentials(){
    return credentialsApi(axiosInstance);
  }


};


export default DidiBackend;