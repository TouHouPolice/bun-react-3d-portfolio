import React, { createContext, useState, ReactNode } from 'react';

interface GlobalState {
  // Define your state properties here
  allowOrbitControl: boolean;
  setAllowOrbitControl: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: GlobalState = {
    allowOrbitControl: true,
    setAllowOrbitControl: () => {},
};

export const GlobalStateContext = createContext<GlobalState>(defaultState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [allowOrbitControl, setAllowOrbitControl] = useState(true);

  return (
    <GlobalStateContext.Provider value={{ allowOrbitControl, setAllowOrbitControl }}>
      {children}
    </GlobalStateContext.Provider>
  );
};