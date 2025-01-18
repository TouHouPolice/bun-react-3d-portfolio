import React, { createContext, useState, ReactNode } from 'react';

interface GlobalState {
  // Define your state properties here
  allowOrbitControl: boolean;
  setAllowOrbitControl: React.Dispatch<React.SetStateAction<boolean>>;
  pointerCanvasPos: { x: number, y: number };
  setPointerCanvasPos: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>;
}

const defaultState: GlobalState = {
    allowOrbitControl: true,
    setAllowOrbitControl: () => {},
    pointerCanvasPos: { x: 0, y: 0 },
    setPointerCanvasPos: () => {},
};

export const GlobalStateContext = createContext<GlobalState>(defaultState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [allowOrbitControl, setAllowOrbitControl] = useState(true);
  const [mouseCanvasPos, setMouseCanvasPos] = useState({ x: 0, y: 0 });
  return (
    <GlobalStateContext.Provider value={{ 
      allowOrbitControl, 
      setAllowOrbitControl,
      pointerCanvasPos: mouseCanvasPos,
      setPointerCanvasPos: setMouseCanvasPos
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};