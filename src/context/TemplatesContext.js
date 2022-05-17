import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import DidiBackend from '../services/api-calls/DidiBackend';
export const TemplatesContext = React.createContext();

const sleep = (ms = 3000) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms))
}

export function useTemplates() {
  return useContext(TemplatesContext);
}


const TemplatesProvider = ({ children }) => {
  const [loading, setLoading]= useState(false);
  const [templates, setTemplates] = useState([]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templates = await DidiBackend().templates.find();
      setTemplates(templates)
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const value = {
    templates,
    loading,
    loadTemplates
  }

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )

}

export default TemplatesProvider;