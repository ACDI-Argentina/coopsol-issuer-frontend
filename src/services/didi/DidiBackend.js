import credentialsApi from "services/didi/credentials";
import templatesApi from "services/didi/templates";

class DidiBackend {
  constructor() {
    
  }

  static config = {
    headers: {
      "token": localStorage.getItem("didiToken")
    }
  };

  static setToken(didiToken){
    console.log(`Update config! ${didiToken}`)
    DidiBackend.config = {
      headers: {
        "token": didiToken
      }
    }
    localStorage.setItem("didiToken", didiToken)
  }


  templates() {
    return templatesApi(DidiBackend.config);
  }

  credentials(){
    return credentialsApi(DidiBackend.config);
  }


};


export default DidiBackend;