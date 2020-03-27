import React, { createContext, useReducer, useEffect } from 'react';
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
  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem(USER, JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
