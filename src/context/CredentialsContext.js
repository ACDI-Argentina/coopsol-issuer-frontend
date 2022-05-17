import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
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
      console.log(`Load credentials ctx`, filter)
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
  const clearSelection = () => {
    setSelection([]);
    setSelectedRowKeys([]);
  }
  

  const [loading, setLoading] = useState({});
  const [deleting, setDeleting] = useState(false);

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

  
  const emitCredential = async (credential, onSuccess, onError) => {
    try {
      setProcessing(credential._id);
      const result = await DidiBackend().credentials.emit(credential._id);
      console.log(result)
      removeProcessing(credential._id);
      message.success(`Se ha emitido exitosamente la credencial ${credential.did}`)
      loadCredentials("PENDING");
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
        const emmited = await DidiBackend().credentials.emit(credential._id);
        setSelection(selection => selection.filter(c => c._id !== credential?._id));
        setSelectedRowKeys(selected => selected.filter(c => c !== credential?._id));
        //Actualizar tabla de pendings
        


        removeProcessing(credential._id);
      } catch (err) {
        console.log(err);
        removeProcessing(credential._id);
      }
      
    }

  }

  const deleteCredentials = async event => {
    setDeleting(true);
    for (const credential of selection) {
      try{
        message.success(`Se ha eliminado exitosamente la credencial ${credential.name} - ${credential?.firstName||''} ${credential?.lastName||''} `)
        setSelection(selection => selection.filter(c => c._id !== credential?._id));
        setSelectedRowKeys(selected => selected.filter(c => c !== credential?._id))

      } catch(err){
        message.error(`Ha ocurrido un error al intentar eliminar la credencial ${credential.name} - ${credential?.firstName||''} ${credential?.lastName||''} `)
        console.log(err);
      }

    }
    setDeleting(false);

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
    selectedRowKeys,
    setSelectedRowKeys,
    setSelection,
    clearSelection,
    emitCredential,
    emitCredentials,
    deleteCredentials,
    loading,
    deleting,
  }

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  )

}

export default CredentialsProvider;