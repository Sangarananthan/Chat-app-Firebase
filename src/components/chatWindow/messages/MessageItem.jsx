import React, { memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInformationBtnModal from './ProfileInformationBtnModal';
import PresenceDot from '../../PresenceDot';
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/currentRoomContext';
import { auth } from '../../../misc/firebase';
const MessageItem = ({ message, handleAdmin }) => {
  const { author, createdAt, text } = message;

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = author.uid === auth.currentUser.uid;

  const GrantAcces = !isAuthor && isAdmin;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className={`ml-1`}
          size="xs"
        />
        {/* <span className="ml-2">{author.name}</span> */}
        <ProfileInformationBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {GrantAcces && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove Admin Permission'
                : 'Give Admin Permission'}
            </Button>
          )}
        </ProfileInformationBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
