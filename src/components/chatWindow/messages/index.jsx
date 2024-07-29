import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transFormToArrayWithID } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';
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

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);

      let alertMsg;

      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin Permission Removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin Permission Granted';
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isMessagesEmpty && <li>No Messages yet...</li>}
      {canShowMessages &&
        messages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            handleAdmin={handleAdmin}
          />
        ))}
    </ul>
  );
};

export default Messages;
