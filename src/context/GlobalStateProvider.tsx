import React, { createContext, useState, ReactNode } from 'react';
interface GlobalState {
  // Define your state properties here
  allowOrbitControl: boolean;
  setAllowOrbitControl: React.Dispatch<React.SetStateAction<boolean>>;
  mousePos: { x: number, y: number };
  setMousePos: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>;
}

const defaultState: GlobalState = {
    allowOrbitControl: true,
    setAllowOrbitControl: () => {},
    mousePos: { x: 0, y: 0 },
    setMousePos: () => {},
};

export const GlobalStateContext = createContext<GlobalState>(defaultState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [allowOrbitControl, setAllowOrbitControl] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  return (
    <GlobalStateContext.Provider value={{ 
      allowOrbitControl, 
      setAllowOrbitControl,
      mousePos: mousePos,
      setMousePos: setMousePos,
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};