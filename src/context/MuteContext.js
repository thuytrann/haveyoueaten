import React, { createContext, useContext, useState } from 'react';

const MuteContext = createContext();

export const useMute = () => useContext(MuteContext);

export const MuteProvider = ({ children }) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted(!muted);
    console.log('muted', muted);
  };

  return (
    <MuteContext.Provider value={{ muted, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
};