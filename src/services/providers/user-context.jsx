import React, { createContext, useReducer, useEffect, useState } from 'react';
import { USER } from '../../utils/constants';

const initialState = {};

const reducer = (user, newUser) => {
  if (!newUser) {
    localStorage.removeItem(USER);
    return initialState;
  }
  return { ...user, ...newUser };
};

const localState = JSON.parse(localStorage.getItem(USER));

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useReducer(reducer, localState || initialState);

  //Ver como podemos hacer aca para darle los roles


  useEffect(() => {
    localStorage.setItem(USER, JSON.stringify(user));
    const isAdmin = user.roles?.includes("ADMIN");
    setIsAdmin(isAdmin);
  }, [user]);


  const ctx = {
    user,
    setUser,
    isAdmin
  }

  return (
    <UserContext.Provider value={ctx}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
