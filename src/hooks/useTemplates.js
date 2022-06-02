import React, { useEffect, useState } from "react";
import DidiBackend from "../services/didi/DidiBackend";

const useTemplates = (onError) => {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates ] = useState([]);

  async function loadTemplates (){
    try{
      setLoading(true);
      const templates = await new DidiBackend().templates().find();
      setTemplates(templates);
      setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);
      typeof onError === "function" && onError(err)
    }
  }

  useEffect(() => {
    loadTemplates();
  },[])


  return {
    templates,
    loading
  }
}

export default useTemplates;