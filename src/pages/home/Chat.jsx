import React from 'react';
import ChatTop from '../../components/chatWindow/top';
import Messages from '../../components/chatWindow/messages';
import ChatBottom from '../../components/chatWindow/bottom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useRooms } from '../../context/roomsContext';
import { Loader } from 'rsuite';
import CurrentRoomProvider from '../../context/currentRoomContext';
const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();
  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }
  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page"> Chat {chatId} Not Found</h6>;
  }

  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
