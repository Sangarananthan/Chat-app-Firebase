import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profileContext';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import Avataruploadbtn from './Avataruploadbtn';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    const userNicknameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child('name');
    try {
      await userNicknameRef.set(newData);
      Alert.success('NickName Updated!');
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <div className="flex-col-align w-full">
          <div className="flex-row-align w-full h-full">
            <Avataruploadbtn />
            <div className="flex-col-align h-full w-half ">
              <h3 className="my-20">Hey {profile.name}</h3>
              <EditableInput
                name="nickname"
                initialvalue={profile.name}
                onSave={onSave}
                label={<h6 className="mb-2">Nickname</h6>}
                className={`w-full`}
              />
              <ProviderBlock />
            </div>
          </div>
        </div>
        <Divider />
        {/* <Avataruploadbtn /> */}
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
