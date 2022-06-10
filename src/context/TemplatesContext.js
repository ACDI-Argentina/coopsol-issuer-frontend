import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import DidiBackend from '../services/didi/DidiBackend';
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
  const [registers, setRegisters] = useState([]);

  const loadRegisters = async () => {
    try {
      setLoading(true);
      const registers = await new DidiBackend().register().find();
      setRegisters(registers)
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templates = await new DidiBackend().templates().find();
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
    loadTemplates,
    registers,
    loadRegisters,
  }

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )

}

export default TemplatesProvider;