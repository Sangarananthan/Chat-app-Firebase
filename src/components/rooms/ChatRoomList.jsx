import React from 'react';
import { Loader, Nav } from 'rsuite';
import RoomItems from './RoomItems';
import { useRooms } from '../../context/roomsContext';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const ChatRoomList = ({ aboveEleHeight }) => {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${aboveEleHeight}px)` }}
      activeKey={location.pathname}
    >
      {!rooms ? (
        <Loader center vertical content="Loading " speed="slow" size="md" />
      ) : rooms.length > 0 ? (
        rooms.map(room => (
          <Nav.Item
            key={room.id}
            componentClass={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItems room={room} />
          </Nav.Item>
        ))
      ) : (
        <Nav.Item>
          <div className="text-center mt-2">No rooms available</div>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default ChatRoomList;
