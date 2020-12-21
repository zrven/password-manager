import React, {createContext, useReducer} from 'react';
import Reducer from './reducer';

const initialState = {
  username: null,
  vaultToken: null,
  deviceToken: null,
  message: null,
  error: null,
};
const GlobalStore = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);

export default GlobalStore;
