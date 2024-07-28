import React from 'react';
import { useModalState } from '../../../misc/Custom-hooks';
import { Button, Modal } from 'rsuite';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInformationBtnModal = ({ profile, ...btnProps }) => {
  const { isOpen, open, close } = useModalState();
  const { name, avatar, createdAt } = profile;
  const shortname = profile.name.split(' ')[0];
  const memberSince = new Date(createdAt).toLocaleDateString();
  return (
    <div>
      <Button {...btnProps} onClick={open}>
        {shortname}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortname} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            name={name}
            src={avatar}
            className={`width-200 height-200 img-fullsize`}
          />
          <h4 className="mt-2"> {name}</h4>
          <p>{`Member Scine ${memberSince}`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInformationBtnModal;
