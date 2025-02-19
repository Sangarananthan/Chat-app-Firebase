import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transFormToArrayWithID } from '../misc/helper';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomsListRef = database.ref('rooms');

    roomsListRef.on('value', snap => {
      const data = transFormToArrayWithID(snap.val());
      setRooms(data);
    });
    return () => {
      roomsListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);

export default RoomsContext;
