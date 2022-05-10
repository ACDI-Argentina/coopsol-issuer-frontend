import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api-calls/all';
export const CredentialsContext = React.createContext();

export function useCredentials() {
  return useContext(CredentialsContext);
}


const CredentialsProvider = ({ children }) => {

  const [selection,setSelection] = useState([]);

  const {deleteCredential} = api();

  const emitCredential = credential => {
    console.log(`emit single Credential `, credential)
  }

  const emitCredentials = event => {
    console.log(`emitCredentials `, selection)
  }

  const deleteCredentials = async event => {
    console.log(`deleteCredentials `, selection)
    for(const credential of selection){
      const deleted = await deleteCredential(credential._id);
      setSelection(credentials => credentials.filter(c => c._id !== deleted?._id ))
    }

  }


  const value = {
    selection,
    setSelection,
    emitCredential,
    emitCredentials,
    deleteCredentials,
  }

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  )

}

export default CredentialsProvider;