import { useState } from 'react';
import { auth } from '../../misc/firebase';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';

const ProviderBlock = ({ ...providerBlockProps }) => {
  const [isConnected, setisConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setisConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  // LINK FUNTIONALITY
  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.success(`Linked Succesfully to ${provider.providerId}`, 4000);
      setisConnected(provider.providerId, true);
    } catch (error) {
      Alert.error('Couldnt Link', 4000);
    }
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  //   UNLINK FUCTIONALITY
  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cant unlink from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.success(`Disconnected From ${providerId}`, 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const unlinkGoogle = () => {
    unlink('google.com');
  };
  const unlinkFacebook = () => {
    unlink('facebook.com');
  };

  return (
    <div {...providerBlockProps}>
      {isConnected['google.com'] && (
        <Tag color={'green'} closable className="mt-2" onClose={unlinkGoogle}>
          <Icon icon={'google'} />
          Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color={'blue'} closable className="mt-2" onClose={unlinkFacebook}>
          <Icon icon={'facebook'} />
          Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon={'google'} /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon={'facebook'} /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
