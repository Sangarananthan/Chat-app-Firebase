import { createContext, useContextSelector } from 'use-context-selector';

const currentRoomContext = createContext();

export const useCurrentRoom = selector =>
  useContextSelector(currentRoomContext, selector);

const CurrentRoomProvider = ({ children, data }) => {
  return (
    <currentRoomContext.Provider value={data}>
      {children}
    </currentRoomContext.Provider>
  );
};

export default CurrentRoomProvider;
