import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api-calls/all';
import DidiBackend from '../services/api-calls/DidiBackend';
export const CredentialsContext = React.createContext();

const sleep = (ms = 3000) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms))
}

export function useCredentials() {
  return useContext(CredentialsContext);
}


const CredentialsProvider = ({ children }) => {
  
  const [pendingCredentials, setPendingCredentials] = useState([]);
  const [activeCredentials, setActiveCredentials] = useState([]);
  const [revokedCredentials, setRevokedCredentials] = useState([]);

  const [loadingCredentials, setLoadingCredentials] = useState(false);


  const loadCredentials = async (filter) => {    
    try {
      console.log(`Fetch credntials ctx`, filter)
      const apiFilter = {};
      
      if (filter?.status === "PENDING") {
        apiFilter.emmited = false;
      } else if (filter?.status === "ACTIVE") {
        apiFilter.emmited = true;
      } else if (filter?.status === "REVOKED") {
        apiFilter.revoked = true;
      }
      
      setLoadingCredentials(true);
      const result = await DidiBackend().credentials.find(apiFilter);
      if (filter?.status === "PENDING") {
        setPendingCredentials(result);
      } else if (filter?.status === "ACTIVE") {
        setActiveCredentials(result)
      } else if (filter?.status === "REVOKED") {
        setRevokedCredentials(result);
      }
      setLoadingCredentials(false);
      return result;
      
    } catch (err) {
      console.log(err);
      setLoadingCredentials(false);
      
    }
  };


  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState({});

  const setProcessing = (id) => {
    setLoading(prev => ({ ...prev, [id]: true }));
  }
  const removeProcessing = (id) => {
    setLoading(prev => {
      const { [id]: x, ...rest } = prev;
      console.log(rest)
      return rest;
    });
  }

  const { deleteCredential } = api();

  const emitCredential = async (credential, onSuccess, onError) => {
    try {
      setProcessing(credential._id);
      const result = await DidiBackend().credentials.emit(credential._id);
      console.log(result)

      removeProcessing(credential._id);
      message.success(`Se ha emitido exitosamente la credencial ${credential.did}`)
      //Remover la credencial del listado de pendientes
      typeof onSuccess === "function" && onSuccess(credential)

    } catch (err) {
      console.log(err)
      message.error(`Ha ocurrido un error al intentar emitir la credencial ${err.message}`)
      removeProcessing(credential._id);
      typeof onError === "function" && onError(credential)
    }


  }

  const emitCredentials = async event => {
    console.log(`emitCredentials `, selection)

    for (const credential of selection) {
      try {
        setProcessing(credential._id);
        const deleted = await DidiBackend().credentials.emit(credential._id);
        setSelection(selection => selection.filter(c => c._id !== deleted?._id))
        removeProcessing(credential._id);
      } catch (err) {
        console.log(err);
        removeProcessing(credential._id);
      }
      /* Actualizar tabla */
    }

  }

  const deleteCredentials = async event => {
    console.log(`deleteCredentials `, selection)
    for (const credential of selection) {
      const deleted = await deleteCredential(credential._id);
      setSelection(selection => selection.filter(c => c._id !== deleted?._id))
      /* Actualizar tabla */
    }

  }


  const credentials = {
    ACTIVE: activeCredentials, 
    PENDING: pendingCredentials, 
    REVOKED: revokedCredentials
  }

  const value = {
    credentials,
    activeCredentials,
    pendingCredentials,
    revokedCredentials,
    loadingCredentials,
    loadCredentials,
    selection,
    setSelection,
    emitCredential,
    emitCredentials,
    deleteCredentials,
    loading
  }

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  )

}

export default CredentialsProvider;