import React, { useContext, useEffect, useState } from 'react';

export const CredentialsContext = React.createContext();

export function useCredentials() {
  return useContext(CredentialsContext);
}


const CredentialsProvider = ({ children }) => {

  const [selection,setSelection] = useState([]);

  const emitCredentials = event => {
    console.log(`emitCredentials `, selection)
  }

  const deleteCredentials = event => {
    console.log(`deleteCredentials `, selection)
  }


  const value = {
    selection,
    setSelection,
    emitCredentials,
    deleteCredentials
  }

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  )

}

export default CredentialsProvider;