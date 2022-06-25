import React, { createContext, useReducer, useState } from 'react';

const initialState = {
    defaultActiveTabKey: null,
    revocationReasons: [ /* Agregar metodo para cargar desde el backend */
        { id: 1, value: "UNLINKING",label: "Desvinculación" },
        { id: 2, value: "EXPIRATION",label: "Expiración" },
        { id: 3, value: "DATA_MODIFICATION",label: "Modificación de datos" },
        { id: 4, value: "REPLACEMENT",label: "Reemplazo" },
        { id: 5, value: "OTHER",label: "Otro" },
    ]
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
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
                menuCollapsed,
                setMenuCollapsed
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
