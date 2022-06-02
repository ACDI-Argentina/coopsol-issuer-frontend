import { message, notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import DidiBackend from '../services/didi/DidiBackend';
import { logAction } from '../services/api-calls/logs';

export const CredentialsContext = React.createContext();

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
      const result = await new DidiBackend().credentials().find(apiFilter);
      
      if (filter?.status === "PENDING") {
        const pendingCredentials = result.map(credential => ({...credential, status: "PENDING"}));
        setPendingCredentials(pendingCredentials);
      } else if (filter?.status === "ACTIVE") {
        const activeCredentials = result.map(credential => ({...credential, status: "ACTIVE"}));
        setActiveCredentials(activeCredentials);
      } else if (filter?.status === "REVOKED") {
        const revokedCredentials = result.map(credential => ({...credential, status: "REVOKED"}));
        setRevokedCredentials(revokedCredentials);
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

  
  const emitSingleCredential = async (credential, onSuccess, onError) => {
    try {
      setProcessing(credential._id);
      const emmited = await new DidiBackend().credentials().emit(credential._id);
      logAction("CREDENTIAL_ISSUANCE",emmited);
      removeProcessing(credential._id);
      message.success(`Se ha emitido exitosamente la credencial \n${credential.did}`)
      loadCredentials({status: "PENDING"})
      loadCredentials({status: "ACTIVE"});
      typeof onSuccess === "function" && onSuccess(credential)

    } catch (err) {
      console.log(err)
      notification.error({
        message:`Ha ocurrido un error al intentar emitir la credencial`,
        description: err.message
      })
      removeProcessing(credential._id);
      typeof onError === "function" && onError(credential)
    }


  }

  const emitCredentials = async event => {
    console.log(`emitCredentials `, selection)

    for (const credential of selection) {
      try {
        setProcessing(credential._id);
        const emmited = await new DidiBackend().credentials().emit(credential._id);
        logAction("CREDENTIAL_ISSUANCE",emmited);
        setSelection(selection => selection.filter(c => c._id !== credential?._id));
        setSelectedRowKeys(selected => selected.filter(c => c !== credential?._id));
        removeProcessing(credential._id);
      } catch (err) {
        console.log(err);
        removeProcessing(credential._id);
      }
    }

    loadCredentials({status: "PENDING"});
    loadCredentials({status: "ACTIVE"});
  }

  const deleteCredentials = async event => {
    setDeleting(true);
    for (const credential of selection) {
      try{
        const revoked = await new DidiBackend().credentials().revoke(credential._id);  //reason?
        logAction("Revocación de credencial",revoked);
        logAction("CREDENTIAL_REVOCATION",{credential: revoked});        
        message.success(`Se ha revocado exitosamente la credencial ${credential.name} - ${credential?.firstName||''} ${credential?.lastName||''} `)
        setSelection(selection => selection.filter(c => c._id !== credential?._id));
        setSelectedRowKeys(selected => selected.filter(c => c !== credential?._id))

      } catch(err){
        message.error(`Ha ocurrido un error al intentar eliminar la credencial ${credential.name} - ${credential?.firstName||''} ${credential?.lastName||''} `)
        console.log(err);
      }

    }
    setDeleting(false);
    loadCredentials({status: "ACTIVE"});
    loadCredentials({status: "REVOKED"});


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
    emitSingleCredential,
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