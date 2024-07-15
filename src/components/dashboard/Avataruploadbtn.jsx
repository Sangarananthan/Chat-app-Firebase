import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/Custom-hooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useState } from 'react';
import { auth } from '../../misc/firebase';
import AvatarEditor from 'react-avatar-editor';
const Avataruploadbtn = () => {
  const fileInputTypes = '.png, .jpg, .jpeg';
  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const [img, setImg] = useState(auth.currentUser.photoURL);
  const isValidFile = file => acceptedFileTypes.includes(file.type);

  const { isOpen, open, close } = useModalState();
  const onFileInputChange = ev => {
    const currentFiles = ev.target.files;
    if (currentFiles.length === 1) {
      const file = currentFiles[0];
      if (isValidFile(file)) {
        open();
        setImg(file);
      } else {
        Alert.warning(`Youve Selected wrong file type ${file.type}`, 4000);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label htmlFor="avatar-upload">
          Select new Avatar
          <input
            type="file"
            id="avatar-upload"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <ModalHeader>
            <ModalTitle>Adjust Upload Image</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button block appearance="ghost">
              Upload New Avatar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Avataruploadbtn;
