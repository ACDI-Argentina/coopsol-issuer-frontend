import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import DidiBackend from '../services/api-calls/DidiBackend';
export const ActivitiesContext = React.createContext();

const sleep = (ms = 3000) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms))
}

export function useActivities() {
  return useContext(ActivitiesContext);
}


const ActivitiesProvider = ({ children }) => {
  const [loading, setLoading]= useState(false);
  const [activities, setActivities] = useState([]);

  const getActivityLog = () => ({
    content: [
      {
        _id:1,
        executionDateTime: '07/07/2020 10:16:04',
        user: 'admin',
        level: 'ERROR',
        actionType: 'DIDI',
        message: 'Error de conexión con Didi'
      },
      {
        _id:2,
        executionDateTime: '07/07/2020 10:16:04',
        user: 'admin',
        level: 'INFO',
        actionType: 'DIDI',
        message: 'Sincronización DIDI OK'
      }
    ],
    totalElements: 2,
    totalPages: 1,
    number: 0,
    size: 20,
    numberOfElements: 2
  });

  const loadActivities = async () => {
    try {
      setLoading(true);
      
      setActivities(getActivityLog().content)
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const value = {
    activities,
    loading,
    loadActivities
  }

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  )

}

export default ActivitiesProvider;