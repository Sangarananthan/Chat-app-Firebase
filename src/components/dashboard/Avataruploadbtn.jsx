import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/Custom-hooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useRef, useState } from 'react';
import { auth, database, storage } from '../../misc/firebase';
import AvatarEditor from 'react-avatar-editor';
import { useProfile } from '../../context/profileContext';
import ProfileAvatar from './ProfileAvatar';

const Avataruploadbtn = () => {
  const fileInputTypes = '.png, .jpg, .jpeg';
  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const [img, setImg] = useState(auth.currentUser.photoURL);
  const isValidFile = file => acceptedFileTypes.includes(file.type);
  const avatarEditor = useRef();
  const { profile } = useProfile();
  const { isOpen, open, close } = useModalState();
  const [isLoading, setisLoading] = useState(false);
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

  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File Process Error'));
        }
      });
    });
  };

  const onUploadClick = async () => {
    const canvas = avatarEditor.current.getImageScaledToCanvas();
    setisLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`profiles/${profile.uid}`)
        .child('avatar');
      const uploadAvatarresult = await avatarFileRef.put(blob, {
        cacheControl: `public ,max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarresult.ref.getDownloadURL();

      const userAvatarref = database
        .ref(`profiles/${profile.uid}`)
        .child('avatar');

      userAvatarref.set(downloadUrl);

      Alert.info('Avatar has been uploaded', 4000);
      close();
      setisLoading(false);
    } catch (error) {
      Alert.error(error.message, 4000);
      setisLoading(false);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        name={profile.name}
        src={profile.avatar}
        className="width-200 height-200 img-fullsize font-huge"
      />

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
                  ref={avatarEditor}
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
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload New Avatar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Avataruploadbtn;
