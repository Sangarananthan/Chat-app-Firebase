import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transFormToArrayWithID } from '../../../misc/helper';
import MessageItem from './MessageItem';
const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isMessagesEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transFormToArrayWithID(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isMessagesEmpty && <li>No Messages yet...</li>}
      {canShowMessages &&
        messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
    </ul>
  );
};

export default Messages;
