import React, { useState, useEffect } from "react";
import getState from "./flux"; // Importar acciones de flux

// Inicializamos el contexto con valor nulo
export const Context = React.createContext(null);

// Esta función inyecta el store global en cualquier componente
const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: { ...state.store, ...updatedStore },
            actions: { ...state.actions },
          }),
      }),
    );

    useEffect(() => {
      state.actions.getInfoContacts(); // Obtener los contactos cuando el componente se carga
    }, [state.actions]);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
