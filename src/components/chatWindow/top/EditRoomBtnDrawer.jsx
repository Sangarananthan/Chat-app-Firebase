import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/Custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/currentRoomContext';
import { memo } from 'react';
import { getUserUpdates } from '../../../misc/helper';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';

const EditRoomBtnDrawer = () => {
  const { isOpen, close, open } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width : 992px)');
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const updateData = (value, key) => {
    database
      .ref(`/rooms/${chatId}`)
      .child(`${key}`)
      .set(value)
      .then(() => {
        Alert.success('Succesfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = async newName => {
    updateData(newName, 'name');
  };

  const onDescriptionSave = async newDescription => {
    updateData(newDescription, 'description');
  };

  return (
    <div>
      <Button className="br-circle " size=" sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialvalue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name Cannot be empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            initialvalue={description}
            onSave={onDescriptionSave}
            label={<h6 className="mb-2">Description</h6>}
            emptyMsg="Description Cannot be Empty"
            className={'mt-3'}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
