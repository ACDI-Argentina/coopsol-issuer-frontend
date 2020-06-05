import React, { createContext, useReducer } from 'react';

const initialState = {
    defaultActiveTabKey: null,
    revocationReasons: []
};

const reducer = (appState, newAppState) => {
    if (!newAppState) {
        return initialState;
    }
    return { ...appState, ...newAppState };
};

const AppContext = createContext({});

const AppProvider = ({ children }) => {
    const [appState, setAppState] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider 
            value={{ 
                appState, 
                setAppState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
