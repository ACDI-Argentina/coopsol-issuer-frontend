import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CoopsolBackend } from 'services/di';
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
      const activities = await CoopsolBackend().activities.find();
      setActivities(activities)
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